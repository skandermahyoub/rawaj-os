import type { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from './supabase';

export const db = { provider: 'supabase' } as const;

type LogicalTable =
  | 'quotes'
  | 'services'
  | 'templates'
  | 'packages'
  | 'portfolio'
  | 'blog'
  | 'media'
  | 'home_slides'
  | 'marquee'
  | 'features'
  | 'client_logos'
  | 'testimonials'
  | 'faq'
  | 'contact_messages'
  | 'users'
  | 'settings'
  | 'design_tasks'
  | 'departments'
  | 'categories'
  | 'subcategories'
  | 'industry_sectors';

type CollectionRef = { kind: 'collection'; table: LogicalTable };
type DocumentRef = { kind: 'document'; table: LogicalTable; id: string };

type SnapshotDocument<T = any> = {
  id: string;
  data: () => T;
};

export type CollectionSnapshot<T = any> = {
  empty: boolean;
  size: number;
  docs: SnapshotDocument<T>[];
  forEach: (callback: (doc: SnapshotDocument<T>) => void) => void;
};

const physicalTable = (table: LogicalTable) => (table === 'users' ? 'profiles' : table);

const rowToDocument = (table: LogicalTable, row: any): SnapshotDocument => {
  if (table === 'settings') {
    return { id: row.key, data: () => row.value ?? {} };
  }

  if (table === 'users') {
    return {
      id: row.id,
      data: () => ({
        id: row.id,
        name: row.name || row.email || 'مستخدم',
        email: row.email || '',
        role: row.role,
        avatar: row.avatar_url || undefined,
        phone: row.phone || undefined,
        createdAt: row.created_at,
        is_active: row.is_active !== false,
        isOwnerProtected: row.role === 'owner',
      }),
    };
  }

  if (table === 'design_tasks') {
    // Older or manually imported rows may predate these JSON arrays.
    // Normalize at the data boundary so every UI and mutation path is safe.
    return {
      id: row.id,
      data: () => ({
        ...row,
        proof_versions: Array.isArray(row.proof_versions) ? row.proof_versions : [],
        comments: Array.isArray(row.comments) ? row.comments : [],
      }),
    };
  }

  return { id: row.id, data: () => row };
};

const toSnapshot = (table: LogicalTable, rows: any[] | null | undefined): CollectionSnapshot => {
  const docs = (rows || []).map((row) => rowToDocument(table, row));
  return {
    empty: docs.length === 0,
    size: docs.length,
    docs,
    forEach(callback) {
      docs.forEach(callback);
    },
  };
};

export const collection = (_db: typeof db, table: LogicalTable): CollectionRef => ({
  kind: 'collection',
  table,
});

export const doc = (_db: typeof db, table: LogicalTable, id: string): DocumentRef => ({
  kind: 'document',
  table,
  id,
});

async function readCollection(table: LogicalTable): Promise<CollectionSnapshot> {
  const tableName = physicalTable(table);
  const { data, error } = await (supabase.from(tableName as any) as any).select('*');
  if (error) throw error;
  return toSnapshot(table, data);
}

export const getDocs = async (ref: CollectionRef): Promise<CollectionSnapshot> => {
  return readCollection(ref.table);
};

async function readSettingValue(key: string): Promise<Record<string, any>> {
  const { data, error } = await (supabase.from('settings') as any)
    .select('value')
    .eq('key', key)
    .maybeSingle();

  if (error) throw error;
  return (data?.value && typeof data.value === 'object' ? data.value : {}) as Record<string, any>;
}

export const setDoc = async (
  ref: DocumentRef,
  value: any,
  options?: { merge?: boolean }
): Promise<void> => {
  if (ref.table === 'settings') {
    const nextValue = options?.merge
      ? { ...(await readSettingValue(ref.id)), ...(value || {}) }
      : value;

    const { error } = await (supabase.from('settings') as any).upsert(
      {
        key: ref.id,
        value: nextValue ?? {},
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'key' }
    );
    if (error) throw error;
    return;
  }

  if (ref.table === 'users') {
    throw new Error('User accounts must be managed through Supabase Auth, not direct table writes.');
  }

  const tableName = physicalTable(ref.table);

  if (options?.merge) {
    const { data, error } = await (supabase.from(tableName as any) as any)
      .update(value)
      .eq('id', ref.id)
      .select('id');

    if (error) throw error;
    if (Array.isArray(data) && data.length > 0) return;

    const { error: insertError } = await (supabase.from(tableName as any) as any)
      .insert({ ...(value || {}), id: ref.id });
    if (insertError) throw insertError;
    return;
  }

  const payload = { ...(value || {}), id: ref.id };
  const { error: insertError } = await (supabase.from(tableName as any) as any).insert(payload);
  if (!insertError) return;

  // A duplicate primary key means this is a full replacement of an existing row.
  if (insertError.code === '23505') {
    const { data: updatedRows, error: updateError } = await (supabase.from(tableName as any) as any)
      .update(payload)
      .eq('id', ref.id)
      .select('id');
    if (updateError) throw updateError;
    if (!Array.isArray(updatedRows) || updatedRows.length === 0) {
      throw new Error('تعذر حفظ التعديل: لم تسمح قاعدة البيانات بتحديث السجل المطلوب.');
    }
    return;
  }

  throw insertError;
};

export const deleteDoc = async (ref: DocumentRef): Promise<void> => {
  if (ref.table === 'users') {
    throw new Error('User accounts must be deleted through the secured Auth administration flow.');
  }

  const tableName = physicalTable(ref.table);
  const keyColumn = ref.table === 'settings' ? 'key' : 'id';
  const { data: deletedRows, error } = await (supabase.from(tableName as any) as any)
    .delete()
    .eq(keyColumn, ref.id)
    .select(keyColumn);

  if (error) throw error;
  if (!Array.isArray(deletedRows) || deletedRows.length === 0) {
    throw new Error('تعذر الحذف: السجل غير موجود أو لا تملك صلاحية حذفه.');
  }
};

export const onSnapshot = (
  ref: CollectionRef,
  onNext: (snapshot: CollectionSnapshot) => void,
  onError?: (error: any) => void
): (() => void) => {
  let disposed = false;
  let refreshTimer: ReturnType<typeof setTimeout> | null = null;
  let retryTimer: ReturnType<typeof setTimeout> | null = null;
  let retryAttempt = 0;
  let channel: RealtimeChannel | null = null;

  const refresh = async () => {
    try {
      const snapshot = await readCollection(ref.table);
      retryAttempt = 0;
      if (retryTimer) {
        clearTimeout(retryTimer);
        retryTimer = null;
      }
      if (!disposed) onNext(snapshot);
    } catch (error) {
      if (!disposed) {
        onError?.(error);
        const delay = Math.min(5000, 500 * 2 ** retryAttempt);
        retryAttempt += 1;
        if (retryTimer) clearTimeout(retryTimer);
        retryTimer = setTimeout(() => void refresh(), delay);
      }
    }
  };

  void refresh();

  const tableName = physicalTable(ref.table);
  const channelName = `rawaj-${ref.table}-${Math.random().toString(36).slice(2)}`;

  channel = supabase
    .channel(channelName)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: tableName },
      () => {
        if (refreshTimer) clearTimeout(refreshTimer);
        refreshTimer = setTimeout(() => void refresh(), 60);
      }
    )
    .subscribe();

  return () => {
    disposed = true;
    if (refreshTimer) clearTimeout(refreshTimer);
    if (retryTimer) clearTimeout(retryTimer);
    if (channel) void supabase.removeChannel(channel);
  };
};

type BatchOperation = {
  ref: DocumentRef;
  value: any;
  options?: { merge?: boolean };
};

export const writeBatch = (_db: typeof db) => {
  const operations: BatchOperation[] = [];

  return {
    set(ref: DocumentRef, value: any, options?: { merge?: boolean }) {
      operations.push({ ref, value, options });
    },
    async commit() {
      for (const operation of operations) {
        await setDoc(operation.ref, operation.value, operation.options);
      }
    },
  };
};
