import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AlertCircle, ArrowDownToLine, ArrowUpFromLine, Banknote, BriefcaseBusiness, Check, ClipboardList, FileText, LoaderCircle, Package, Plus, RefreshCw, Users, Wallet } from 'lucide-react';
import { supabase } from '../../lib/supabase';

type Tab = 'overview' | 'customers' | 'projects' | 'quotes' | 'finance' | 'production' | 'inventory' | 'suppliers' | 'purchases' | 'costs';
type Row = Record<string, any>;
const money = (value: number | string | null | undefined) => new Intl.NumberFormat('ar-YE', { maximumFractionDigits: 2 }).format(Number(value || 0));
const dateLabel = (value?: string | null) => value ? new Date(value).toLocaleDateString('ar-YE') : '—';
const inputClass = 'w-full rounded-xl border border-[#E7E0D3] bg-white px-3 py-2.5 text-sm text-[#25211F] outline-none focus:border-[#B9142D] dark:border-[#393331] dark:bg-[#1D1A19] dark:text-[#F5F1EA]';
const panelClass = 'rounded-2xl border border-[#E7E0D3] bg-white p-4 shadow-sm dark:border-[#302B28] dark:bg-[#191716]';
const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'مركز العمليات', icon: BriefcaseBusiness },
  { id: 'customers', label: 'العملاء', icon: Users },
  { id: 'projects', label: 'المشاريع', icon: ClipboardList },
  { id: 'quotes', label: 'عروض الأسعار', icon: FileText },
  { id: 'finance', label: 'الفواتير والتحصيل', icon: Wallet },
  { id: 'production', label: 'الإنتاج', icon: Package },
  { id: 'inventory', label: 'المخزون', icon: Banknote },
  { id: 'suppliers', label: 'الموردون', icon: Users },
  { id: 'purchases', label: 'المشتريات', icon: FileText },
  { id: 'costs', label: 'تكاليف المشاريع', icon: Wallet },
];

export const AdminOperationsManager: React.FC = () => {
  const [tab, setTab] = useState<Tab>('overview');
  const [customers, setCustomers] = useState<Row[]>([]);
  const [incomingQuotes, setIncomingQuotes] = useState<Row[]>([]);
  const [stages, setStages] = useState<Row[]>([]);
  const [projects, setProjects] = useState<Row[]>([]);
  const [quotes, setQuotes] = useState<Row[]>([]);
  const [invoices, setInvoices] = useState<Row[]>([]);
  const [payments, setPayments] = useState<Row[]>([]);
  const [orders, setOrders] = useState<Row[]>([]);
  const [items, setItems] = useState<Row[]>([]);
  const [movements, setMovements] = useState<Row[]>([]);
  const [suppliers, setSuppliers] = useState<Row[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<Row[]>([]);
  const [costs, setCosts] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<Row>({});
  const [movementType, setMovementType] = useState<'receipt' | 'issue'>('receipt');
  const [movementItem, setMovementItem] = useState('');
  const [movementQty, setMovementQty] = useState('1');
  const [movementCost, setMovementCost] = useState('0');
  const [paymentInvoice, setPaymentInvoice] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    const specs = [
      ['customers', 'customers', setCustomers, 'created_at'],
      ['incomingQuotes', 'quotes', setIncomingQuotes, 'created_at'],
      ['stages', 'production_stages', setStages, 'created_at'],
      ['projects', 'operational_projects', setProjects, 'created_at'],
      ['quotes', 'commercial_quotes', setQuotes, 'created_at'],
      ['invoices', 'invoices', setInvoices, 'issued_at'],
      ['payments', 'payments', setPayments, 'received_at'],
      ['orders', 'production_orders', setOrders, 'created_at'],
      ['items', 'inventory_items', setItems, 'name'],
      ['movements', 'inventory_movements', setMovements, 'created_at'],
      ['suppliers', 'suppliers', setSuppliers, 'name'],
      ['purchaseOrders', 'purchase_orders', setPurchaseOrders, 'created_at'],
      ['costs', 'project_costs', setCosts, 'occurred_on'],
    ] as const;
    try {
      const results = await Promise.all(specs.map(([, table, , order]) =>
        supabase.from(table).select('*').order(order, { ascending: false }).limit(500)
      ));
      const failed = results.find((result) => result.error);
      if (failed?.error) throw failed.error;
      results.forEach((result, index) => {
        const setter = specs[index][2] as (value: Row[]) => void;
        setter((result.data || []) as Row[]);
      });
    } catch (e: any) {
      setError(e?.message || 'تعذر تحميل بيانات الأنظمة التشغيلية. تأكد من تطبيق ترحيل قاعدة البيانات على بيئة اختبار أولًا.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const paidByInvoice = useMemo(() => payments.reduce<Record<string, number>>((acc, payment) => {
    acc[payment.invoice_id] = (acc[payment.invoice_id] || 0) + Number(payment.amount || 0);
    return acc;
  }, {}), [payments]);

  const totals = useMemo(() => ({
    openProjects: projects.filter((p) => !['closed', 'cancelled', 'delivered'].includes(p.status)).length,
    outstanding: invoices.reduce((sum, invoice) => sum + Math.max(0, Number(invoice.total || 0) - (paidByInvoice[invoice.id] || 0)), 0),
    production: orders.filter((o) => !['delivered', 'cancelled'].includes(o.status)).length,
    lowStock: items.filter((item) => Number(item.quantity || 0) <= Number(item.reorder_level || 0)).length,
  }), [projects, invoices, paidByInvoice, orders, items]);

  const customerName = (id?: string) => customers.find((c) => c.id === id)?.company_name || customers.find((c) => c.id === id)?.name || 'عميل غير محدد';
  const projectName = (id?: string) => projects.find((p) => p.id === id)?.title || 'مشروع غير مرتبط';
  const openForm = (kind: Tab) => {
    setError('');
    setNotice('');
    const defaults: Record<string, Row> = {
      customers: { customer_type: 'company', source: 'direct', name: '', company_name: '', phone: '', whatsapp: '', email: '', city: 'صنعاء', address: '', notes: '' },
      projects: { customer_id: customers[0]?.id || '', title: '', description: '', status: 'open', priority: 'normal', due_date: '', estimated_total: '0', notes: '' },
      quotes: { customer_id: customers[0]?.id || '', project_id: '', status: 'draft', currency: 'YER', subtotal: '0', discount: '0', tax: '0', valid_until: '', terms: '', line_items: [] },
      finance: { customer_id: customers[0]?.id || '', project_id: '', commercial_quote_id: '', subtotal: '0', discount: '0', tax: '0', due_date: '', notes: '' },
      production: { project_id: projects[0]?.id || '', status: 'queued', priority: 'normal', due_date: '', specifications: {}, quality_notes: '' },
      inventory: { sku: '', name: '', category: '', unit: 'متر', quantity: '0', reorder_level: '0', average_unit_cost: '0', notes: '' },
      suppliers: { name: '', contact_name: '', phone: '', email: '', address: '', payment_terms: '', lead_time_days: '', notes: '', is_active: true },
      purchases: { supplier_id: suppliers[0]?.id || '', status: 'draft', expected_at: '', total: '0', notes: '' },
      costs: { project_id: projects[0]?.id || '', cost_type: 'materials', description: '', quantity: '1', unit_cost: '0', supplier_id: '', occurred_on: new Date().toISOString().slice(0,10), notes: '' },
    };
    setForm(defaults[kind] || {});
    setFormOpen(true);
  };

  const saveRecord = async () => {
    setSaving(true);
    setError('');
    setNotice('');
    try {
      let tableName = '';
      let payload: Row = { ...form };
      if (tab === 'customers') {
        tableName = 'customers';
        if (!String(payload.name || '').trim()) throw new Error('اسم العميل مطلوب.');
        payload.name = String(payload.name).trim();
      } else if (tab === 'projects') {
        tableName = 'operational_projects';
        if (!payload.customer_id || !String(payload.title || '').trim()) throw new Error('اختر العميل وأدخل اسم المشروع.');
        payload.estimated_total = Number(payload.estimated_total || 0);
      } else if (tab === 'quotes') {
        tableName = 'commercial_quotes';
        if (!payload.customer_id) throw new Error('اختر العميل.');
        payload.subtotal = Number(payload.subtotal || 0);
        payload.discount = Number(payload.discount || 0);
        payload.tax = Number(payload.tax || 0);
        payload.project_id = payload.project_id || null;
      } else if (tab === 'finance') {
        tableName = 'invoices';
        if (!payload.customer_id) throw new Error('اختر العميل.');
        payload.subtotal = Number(payload.subtotal || 0);
        payload.discount = Number(payload.discount || 0);
        payload.tax = Number(payload.tax || 0);
        payload.project_id = payload.project_id || null;
        payload.commercial_quote_id = payload.commercial_quote_id || null;
      } else if (tab === 'production') {
        tableName = 'production_orders';
        if (!payload.project_id) throw new Error('اختر المشروع المرتبط بأمر الإنتاج.');
        payload.specifications = {};
      } else if (tab === 'costs') {
        tableName = 'project_costs';
        if (!payload.project_id || !String(payload.description || '').trim()) throw new Error('اختر المشروع واكتب وصف التكلفة.');
        payload.quantity = Number(payload.quantity || 1);
        payload.unit_cost = Number(payload.unit_cost || 0);
        payload.supplier_id = payload.supplier_id || null;
      } else if (tab === 'suppliers') {
        tableName = 'suppliers';
        if (!String(payload.name || '').trim()) throw new Error('اسم المورد مطلوب.');
        payload.name = String(payload.name).trim();
        payload.lead_time_days = payload.lead_time_days ? Number(payload.lead_time_days) : null;
      } else if (tab === 'purchases') {
        tableName = 'purchase_orders';
        if (!payload.supplier_id) throw new Error('اختر المورد.');
        payload.total = Number(payload.total || 0);
        payload.expected_at = payload.expected_at || null;
      } else if (tab === 'inventory') {
        tableName = 'inventory_items';
        if (!String(payload.name || '').trim()) throw new Error('اسم المادة مطلوب.');
        payload.quantity = Number(payload.quantity || 0);
        payload.reorder_level = Number(payload.reorder_level || 0);
        payload.average_unit_cost = Number(payload.average_unit_cost || 0);
      } else {
        throw new Error('هذه الشاشة لا تدعم إنشاء سجل جديد.');
      }
      delete payload.id;
      const { data, error: insertError } = await supabase.from(tableName as any).insert(payload).select('*').single();
      if (insertError) throw insertError;

      if (tab === 'production' && data?.id) {
        const defaultStages = ['تجهيز الملفات', 'الطباعة', 'التشطيب', 'مراقبة الجودة'];
        const { error: stagesError } = await supabase.from('production_stages').insert(defaultStages.map((name, index) => ({
          production_order_id: data.id, name, sort_order: index, status: 'pending',
        })));
        if (stagesError) {
          setNotice('تم إنشاء أمر الإنتاج، لكن تعذر إنشاء مراحل العمل الافتراضية. يمكنك متابعة الأمر بعد مراجعة الصلاحيات.');
        }
      }
      setFormOpen(false);
      setNotice((current) => current || 'تم حفظ السجل في قاعدة البيانات.');
      await load();
    } catch (e: any) {
      setError(e?.message || 'تعذر حفظ السجل. لم نعرضه كأنه حُفظ.');
    } finally {
      setSaving(false);
    }
  };

  const startPricingFromRequest = async (request: Row) => {
    setSaving(true);
    setError('');
    setNotice('');
    try {
      const alreadyLinked = quotes.find((quote) => quote.source_quote_id === request.id);
      if (alreadyLinked) {
        setNotice('طلب الموقع مرتبط بالفعل بعرض سعر تجاري.');
        return;
      }
      const customer = request.customer || {};
      const phone = String(customer.mobile || customer.whatsapp || '').trim();
      let customerRow: Row | null = null;
      if (phone) {
        const existing = await supabase.from('customers').select('*').eq('phone', phone).maybeSingle();
        if (existing.error) throw existing.error;
        customerRow = existing.data as Row | null;
      }
      if (!customerRow) {
        const created = await supabase.from('customers').insert({
          customer_type: customer.company ? 'company' : 'individual',
          name: String(customer.name || 'عميل طلب تسعير').trim(),
          company_name: customer.company || null,
          phone: phone || null,
          whatsapp: customer.whatsapp || phone || null,
          email: customer.email || null,
          city: customer.city || null,
          address: customer.address || null,
          source: 'website',
          notes: request.general_notes || null,
        }).select('*').single();
        if (created.error) throw created.error;
        customerRow = created.data as Row;
      }
      const createdQuote = await supabase.from('commercial_quotes').insert({
        customer_id: customerRow.id,
        source_quote_id: request.id,
        status: 'draft',
        currency: 'YER',
        subtotal: 0,
        discount: 0,
        tax: 0,
        line_items: Array.isArray(request.items) ? request.items : [],
        terms: request.general_notes || null,
      }).select('quote_number,version').single();
      if (createdQuote.error) throw createdQuote.error;
      setNotice('تم إنشاء مسودة عرض تجاري وربطها بملف العميل وطلب الموقع.');
      await load();
    } catch (e: any) {
      setError(e?.message || 'تعذر ربط طلب الموقع بعرض سعر.');
    } finally {
      setSaving(false);
    }
  };

  const createProjectFromQuote = async (quote: Row) => {
    setSaving(true);
    setError('');
    setNotice('');
    try {
      if (quote.project_id) {
        setNotice('هذا العرض مرتبط بمشروع بالفعل.');
        return;
      }
      if (quote.status !== 'approved') throw new Error('يجب اعتماد عرض السعر قبل إنشاء مشروع تنفيذي.');
      const sourceRequest = incomingQuotes.find((request) => request.id === quote.source_quote_id);
      const created = await supabase.from('operational_projects').insert({
        customer_id: quote.customer_id,
        source_quote_id: quote.source_quote_id || null,
        title: 'تنفيذ عرض السعر Q-' + quote.quote_number + '-V' + quote.version,
        status: 'open',
        priority: 'normal',
        due_date: sourceRequest?.deadline_date || null,
        estimated_total: Number(quote.total || 0),
        notes: 'تم إنشاء المشروع من عرض السعر Q-' + quote.quote_number + '-V' + quote.version + '.',
      }).select('id').single();
      if (created.error) throw created.error;
      const linked = await supabase.from('commercial_quotes').update({ project_id: created.data.id, status: 'converted', updated_at: new Date().toISOString() }).eq('id', quote.id);
      if (linked.error) throw linked.error;
      setNotice('تم إنشاء المشروع وربطه بعرض السعر.');
      await load();
    } catch (e: any) {
      setError(e?.message || 'تعذر إنشاء المشروع من عرض السعر.');
    } finally {
      setSaving(false);
    }
  };

  const updateStageStatus = async (stage: Row, status: string) => {
    setSaving(true);
    setError('');
    setNotice('');
    try {
      const patch: Row = { status };
      const now = new Date().toISOString();
      if (status === 'in_progress' && !stage.started_at) patch.started_at = now;
      if (status === 'completed') patch.completed_at = now;
      const { error: stageError } = await supabase.from('production_stages').update(patch).eq('id', stage.id);
      if (stageError) throw stageError;
      setNotice('تم تحديث مرحلة الإنتاج.');
      await load();
    } catch (e: any) {
      setError(e?.message || 'تعذر تحديث مرحلة الإنتاج.');
    } finally {
      setSaving(false);
    }
  };

  const savePayment = async () => {
    if (!paymentInvoice || Number(paymentAmount) <= 0) {
      setError('اختر فاتورة وأدخل مبلغ دفعة أكبر من صفر.');
      return;
    }
    setSaving(true);
    setError('');
    setNotice('');
    try {
      const { error: paymentError } = await supabase.from('payments').insert({
        invoice_id: paymentInvoice,
        amount: Number(paymentAmount),
        method: paymentMethod,
      });
      if (paymentError) throw paymentError;
      setPaymentAmount('');
      setNotice('سُجلت الدفعة. ستظهر في سجل التحصيل بعد تحديث البيانات.');
      await load();
    } catch (e: any) {
      setError(e?.message || 'تعذر تسجيل الدفعة.');
    } finally {
      setSaving(false);
    }
  };

  const saveMovement = async () => {
    if (!movementItem || Number(movementQty) <= 0) {
      setError('اختر مادة وأدخل كمية أكبر من صفر.');
      return;
    }
    setSaving(true);
    setError('');
    setNotice('');
    try {
      const { error: movementError } = await supabase.from('inventory_movements').insert({
        inventory_item_id: movementItem,
        movement_type: movementType,
        quantity: Number(movementQty),
        unit_cost: Number(movementCost || 0),
      });
      if (movementError) throw movementError;
      setMovementQty('1');
      setNotice('سُجلت حركة المخزون.');
      await load();
    } catch (e: any) {
      setError(e?.message || 'تعذر تسجيل حركة المخزون.');
    } finally {
      setSaving(false);
    }
  };

  const updateStatus = async (table: string, id: string, status: string) => {
    setSaving(true);
    setError('');
    setNotice('');
    try {
      const { error: updateError } = await supabase.from(table as any).update({ status, updated_at: new Date().toISOString() }).eq('id', id);
      if (updateError) throw updateError;
      setNotice('تم تحديث الحالة.');
      await load();
    } catch (e: any) {
      setError(e?.message || 'تعذر تحديث الحالة.');
    } finally {
      setSaving(false);
    }
  };

  const card = (label: string, value: string | number, detail: string, icon: React.ElementType) => {
    const Icon = icon;
    return <div className={panelClass} key={label}><div className="flex items-start justify-between gap-3"><div><div className="text-xs text-stone-500">{label}</div><div className="mt-2 text-2xl font-black">{value}</div><div className="mt-1 text-[11px] text-stone-500">{detail}</div></div><div className="rounded-xl bg-[#B9142D]/10 p-3 text-[#B9142D]"><Icon size={20} /></div></div></div>;
  };

  const field = (label: string, key: string, type = 'text', placeholder = '') => (
    <label className="block space-y-1.5 text-xs font-bold text-stone-600 dark:text-stone-300" key={key}>
      <span>{label}</span>
      <input className={inputClass} type={type} value={form[key] ?? ''} placeholder={placeholder} onChange={(e) => setForm((old) => ({ ...old, [key]: e.target.value }))} />
    </label>
  );

  const selectField = (label: string, key: string, options: { value: string; label: string }[]) => (
    <label className="block space-y-1.5 text-xs font-bold text-stone-600 dark:text-stone-300" key={key}>
      <span>{label}</span>
      <select className={inputClass} value={form[key] ?? ''} onChange={(e) => setForm((old) => ({ ...old, [key]: e.target.value }))}>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );

  const createButton = (label: string, kind: Tab = tab) => <button type="button" onClick={() => openForm(kind)} className="inline-flex items-center gap-2 rounded-xl bg-[#B9142D] px-4 py-2.5 text-xs font-black text-white hover:bg-[#9F1026]"><Plus size={15} />{label}</button>;
  const statusLabel: Record<string, string> = { open: 'مفتوح', awaiting_approval: 'بانتظار الاعتماد', approved: 'معتمد', in_design: 'قيد التصميم', in_production: 'قيد الإنتاج', quality_check: 'فحص الجودة', ready_for_delivery: 'جاهز للتسليم', delivered: 'تم التسليم', closed: 'مغلق', cancelled: 'ملغي', draft: 'مسودة', sent: 'مرسل', rejected: 'مرفوض', expired: 'منتهي', converted: 'محوّل لمشروع', issued: 'صادرة', partially_paid: 'مدفوعة جزئيًا', paid: 'مدفوعة', overdue: 'متأخرة', void: 'ملغاة', queued: 'في قائمة الإنتاج', prepress: 'تجهيز الملفات', printing: 'طباعة', finishing: 'تشطيب', assembly: 'تجميع', ready: 'جاهز', on_hold: 'موقوف مؤقتًا' };

  return (
    <div dir="rtl" className="space-y-5 pb-12 text-right">
      <div className="flex flex-col gap-4 rounded-3xl bg-gradient-to-l from-[#5B0715] via-[#8E1025] to-[#B9142D] p-6 text-white sm:flex-row sm:items-center sm:justify-between">
        <div><div className="text-[10px] font-bold tracking-widest text-white/70">RAWAJ OPERATIONS</div><h1 className="mt-2 text-2xl font-black">الأنظمة التشغيلية والإدارية</h1><p className="mt-2 max-w-2xl text-xs leading-6 text-white/80">سجل مترابط للعملاء والمشاريع والتسعير والتحصيل والإنتاج والمخزون. جميع الأرقام مستمدة من السجلات المحفوظة، وليست مؤشرات تجريبية.</p></div>
        <button type="button" onClick={() => void load()} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-xs font-bold hover:bg-white/20"><RefreshCw size={15} />تحديث البيانات</button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => { setTab(id); setFormOpen(false); setError(''); setNotice(''); }} className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-bold transition ${tab === id ? 'border-[#B9142D] bg-[#B9142D] text-white' : 'border-[#E7E0D3] bg-white text-stone-600 dark:border-[#302B28] dark:bg-[#191716] dark:text-stone-300'}`}><Icon size={15} />{label}</button>)}
      </div>

      {error && <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-300 bg-red-50 p-3 text-xs text-red-800 dark:border-red-900 dark:bg-red-950/30 dark:text-red-200"><AlertCircle size={16} className="mt-0.5 shrink-0" /><span>{error}</span></div>}
      {notice && <div role="status" className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200"><Check size={16} className="mt-0.5 shrink-0" /><span>{notice}</span></div>}
      {loading ? <div className={`${panelClass} flex items-center justify-center gap-2 py-12 text-sm text-stone-500`}><LoaderCircle className="animate-spin" size={18} />جاري تحميل السجلات من Supabase...</div> : (
        <>
          {tab === 'overview' && <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {card('مشاريع قيد التنفيذ', totals.openProjects, 'مشاريع لم تُغلق بعد', BriefcaseBusiness)}
            {card('المبالغ غير المحصلة', money(totals.outstanding) + ' ر.ي', 'إجمالي الفواتير ناقص الدفعات المسجلة', Wallet)}
            {card('أوامر إنتاج نشطة', totals.production, 'أوامر لم تُسلّم أو تُلغَ', Package)}
            {card('مواد عند حد إعادة الطلب', totals.lowStock, 'المخزون عند الحد الأدنى أو دونه', AlertCircle)}
            <div className={`${panelClass} sm:col-span-2 xl:col-span-4`}><h2 className="font-black">آخر المشاريع</h2><div className="mt-3 divide-y divide-stone-100 dark:divide-stone-800">{projects.slice(0,6).map((p) => <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 py-3 text-xs"><div><div className="font-bold">{p.title}</div><div className="mt-1 text-stone-500">{customerName(p.customer_id)} · موعد التسليم: {dateLabel(p.due_date)}</div></div><span className="rounded-lg bg-stone-100 px-2 py-1 dark:bg-stone-800">{statusLabel[p.status] || p.status}</span></div>)}{projects.length === 0 && <p className="py-5 text-xs text-stone-500">لا توجد مشاريع مسجلة بعد.</p>}</div></div>
          </div>}

          {tab === 'customers' && <section className={panelClass}><div className="flex items-center justify-between gap-3"><div><h2 className="font-black">ملفات العملاء</h2><p className="mt-1 text-xs text-stone-500">ملف واحد لكل عميل مع بيانات التواصل ومصدر الاستقطاب.</p></div>{createButton('إضافة عميل','customers')}</div><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[650px] text-right text-xs"><thead className="bg-stone-50 text-stone-500 dark:bg-stone-900"><tr>{['العميل','النوع','الهاتف','المدينة','المصدر','تاريخ التسجيل'].map((h) => <th key={h} className="p-3">{h}</th>)}</tr></thead><tbody>{customers.map((c) => <tr key={c.id} className="border-t border-stone-100 dark:border-stone-800"><td className="p-3 font-bold">{c.company_name || c.name}<div className="mt-1 font-normal text-stone-500">{c.name}</div></td><td className="p-3">{c.customer_type === 'company' ? 'شركة' : c.customer_type === 'institution' ? 'مؤسسة' : 'فرد'}</td><td className="p-3" dir="ltr">{c.phone || '—'}</td><td className="p-3">{c.city || '—'}</td><td className="p-3">{c.source || '—'}</td><td className="p-3">{dateLabel(c.created_at)}</td></tr>)}{customers.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-stone-500">لا يوجد عملاء. أضف أول ملف عميل لبدء ربط الطلبات والمشاريع.</td></tr>}</tbody></table></div></section>}

          {tab === 'projects' && <section className={panelClass}><div className="flex items-center justify-between gap-3"><div><h2 className="font-black">المشاريع التشغيلية</h2><p className="mt-1 text-xs text-stone-500">كل مشروع مرتبط بعميل، ويمكن ربطه بعرض سعر وأمر إنتاج وفاتورة.</p></div>{createButton('إنشاء مشروع','projects')}</div><div className="mt-4 space-y-3">{projects.map((p) => <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-stone-100 p-3 dark:border-stone-800"><div><div className="font-bold">{p.title} <span className="mr-2 text-[10px] text-stone-400">#{p.project_number}</span></div><div className="mt-1 text-xs text-stone-500">{customerName(p.customer_id)} · التسليم: {dateLabel(p.due_date)} · تقديري: {money(p.estimated_total)} ر.ي</div></div><select aria-label="حالة المشروع" className={inputClass + ' max-w-48'} value={p.status} onChange={(e) => void updateStatus('operational_projects',p.id,e.target.value)}>{['open','awaiting_approval','approved','in_design','in_production','quality_check','ready_for_delivery','delivered','closed','cancelled'].map((s) => <option key={s} value={s}>{statusLabel[s] || s}</option>)}</select></div>)}{projects.length === 0 && <p className="py-8 text-center text-xs text-stone-500">لا توجد مشاريع مسجلة.</p>}</div></section>}

          {tab === 'quotes' && <div className="space-y-4">
            <section className={panelClass}>
              <div className="flex items-center justify-between gap-3"><div><h2 className="font-black">طلبات التسعير الواردة من المتجر</h2><p className="mt-1 text-xs text-stone-500">ابدأ التسعير من الطلب الأصلي؛ ينشأ ملف العميل ومسودة العرض مع حفظ مرجع الطلب.</p></div><span className="rounded-lg bg-stone-100 px-2 py-1 text-xs dark:bg-stone-800">{incomingQuotes.length} طلب</span></div>
              <div className="mt-4 space-y-3">{incomingQuotes.slice(0,30).map((request) => { const linked = quotes.find((quote) => quote.source_quote_id === request.id); return <div key={request.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-stone-100 p-3 dark:border-stone-800"><div><div className="font-bold">{request.reference_number || request.id}</div><div className="mt-1 text-xs text-stone-500">{request.customer?.company || request.customer?.name || 'عميل'} · {dateLabel(request.created_at)} · {statusLabel[request.status] || request.status}</div></div>{linked ? <span className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">مرتبط بالعرض Q-{linked.quote_number}-V{linked.version}</span> : <button type="button" disabled={saving} onClick={() => void startPricingFromRequest(request)} className="rounded-xl bg-[#B9142D] px-3 py-2 text-xs font-bold text-white disabled:opacity-50">بدء التسعير</button>}</div>; })}{incomingQuotes.length === 0 && <p className="py-6 text-center text-xs text-stone-500">لا توجد طلبات واردة.</p>}</div>
            </section>
            <section className={panelClass}>
              <div className="flex items-center justify-between gap-3"><div><h2 className="font-black">عروض الأسعار التجارية</h2><p className="mt-1 text-xs text-stone-500">عروض مرقمة وقابلة للاعتماد والتحويل إلى مشروع تنفيذي.</p></div>{createButton('إصدار عرض سعر','quotes')}</div>
              <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[700px] text-right text-xs"><thead className="bg-stone-50 dark:bg-stone-900"><tr>{['المرجع','العميل','المشروع','الإجمالي','الصلاحية','الحالة / الإجراء'].map((h) => <th key={h} className="p-3">{h}</th>)}</tr></thead><tbody>{quotes.map((q) => <tr key={q.id} className="border-t border-stone-100 dark:border-stone-800"><td className="p-3 font-bold">Q-{q.quote_number}-V{q.version}</td><td className="p-3">{customerName(q.customer_id)}</td><td className="p-3">{projectName(q.project_id)}</td><td className="p-3">{money(q.total)} ر.ي</td><td className="p-3">{dateLabel(q.valid_until)}</td><td className="p-3"><div className="flex min-w-36 flex-col gap-2"><select className={inputClass} value={q.status} onChange={(e) => void updateStatus('commercial_quotes',q.id,e.target.value)}>{['draft','sent','approved','rejected','expired','converted'].map((s) => <option key={s} value={s}>{statusLabel[s] || s}</option>)}</select>{q.status === 'approved' && !q.project_id && <button type="button" disabled={saving} onClick={() => void createProjectFromQuote(q)} className="rounded-lg bg-emerald-600 px-2 py-1.5 text-[10px] font-bold text-white disabled:opacity-50">إنشاء مشروع</button>}</div></td></tr>)}{quotes.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-stone-500">لا توجد عروض أسعار تجارية.</td></tr>}</tbody></table></div>
            </section>
          </div>}

          {tab === 'finance' && <div className="space-y-4"><section className={panelClass}><div className="flex items-center justify-between gap-3"><div><h2 className="font-black">الفواتير والمستحقات</h2><p className="mt-1 text-xs text-stone-500">حالة الفاتورة والمبلغ المتبقي يحسبان من الفواتير والدفعات المحفوظة.</p></div>{createButton('إنشاء فاتورة','finance')}</div><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[750px] text-right text-xs"><thead className="bg-stone-50 dark:bg-stone-900"><tr>{['الفاتورة','العميل','المشروع','الإجمالي','المحصّل','المتبقي','الاستحقاق','الحالة'].map((h) => <th key={h} className="p-3">{h}</th>)}</tr></thead><tbody>{invoices.map((i) => { const paid = paidByInvoice[i.id] || 0; return <tr key={i.id} className="border-t border-stone-100 dark:border-stone-800"><td className="p-3 font-bold">INV-{i.invoice_number}</td><td className="p-3">{customerName(i.customer_id)}</td><td className="p-3">{projectName(i.project_id)}</td><td className="p-3">{money(i.total)}</td><td className="p-3">{money(paid)}</td><td className="p-3 font-bold">{money(Math.max(0,Number(i.total)-paid))}</td><td className="p-3">{dateLabel(i.due_date)}</td><td className="p-3"><span className="rounded-lg bg-stone-100 px-2 py-1 dark:bg-stone-800">{statusLabel[i.status] || i.status}</span></td></tr>})}{invoices.length === 0 && <tr><td colSpan={8} className="p-8 text-center text-stone-500">لا توجد فواتير.</td></tr>}</tbody></table></div></section><section className={panelClass}><h3 className="font-black">تسجيل دفعة جديدة</h3><div className="mt-3 grid gap-3 sm:grid-cols-4"><select className={inputClass} value={paymentInvoice} onChange={(e) => setPaymentInvoice(e.target.value)}><option value="">اختر الفاتورة</option>{invoices.filter((i) => Number(i.total) > (paidByInvoice[i.id] || 0)).map((i) => <option key={i.id} value={i.id}>INV-{i.invoice_number} · {customerName(i.customer_id)} · متبقٍ {money(Number(i.total)-(paidByInvoice[i.id]||0))}</option>)}</select><input className={inputClass} type="number" min="0.01" step="0.01" placeholder="مبلغ الدفعة" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} /><select className={inputClass} value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}><option value="cash">نقدًا</option><option value="bank_transfer">تحويل بنكي</option><option value="wallet">محفظة إلكترونية</option><option value="card">بطاقة</option><option value="other">أخرى</option></select><button type="button" disabled={saving} onClick={() => void savePayment()} className="rounded-xl bg-[#B9142D] px-4 py-2 text-xs font-black text-white disabled:opacity-50">{saving ? 'جارٍ الحفظ...' : 'حفظ الدفعة'}</button></div><div className="mt-4 divide-y divide-stone-100 dark:divide-stone-800">{payments.slice(0,8).map((p) => <div key={p.id} className="flex justify-between gap-3 py-2 text-xs"><span>{customerName(invoices.find((i) => i.id === p.invoice_id)?.customer_id)} · {dateLabel(p.received_at)}</span><strong>{money(p.amount)} ر.ي</strong></div>)}</div></section></div>}

          {tab === 'production' && <section className={panelClass}><div className="flex items-center justify-between gap-3"><div><h2 className="font-black">أوامر الإنتاج ومراقبة التنفيذ</h2><p className="mt-1 text-xs text-stone-500">كل أمر مرتبط بمشروع ويُنشأ معه مسار افتراضي للتجهيز والطباعة والتشطيب والجودة.</p></div>{createButton('إنشاء أمر إنتاج','production')}</div><div className="mt-4 space-y-3">{orders.map((o) => <div key={o.id} className="rounded-xl border border-stone-100 p-3 dark:border-stone-800"><div className="flex flex-wrap items-center justify-between gap-3"><div><div className="font-bold">أمر إنتاج #{o.order_number} · {projectName(o.project_id)}</div><div className="mt-1 text-xs text-stone-500">موعد التسليم: {dateLabel(o.due_date)} · الأولوية: {o.priority}</div></div><select className={inputClass+' max-w-52'} value={o.status} onChange={(e) => void updateStatus('production_orders',o.id,e.target.value)}>{['queued','prepress','printing','finishing','assembly','quality_check','ready','delivered','on_hold','cancelled'].map((s) => <option key={s} value={s}>{statusLabel[s] || s}</option>)}</select></div><div className="mt-3 grid gap-2 sm:grid-cols-2">{stages.filter((stage) => stage.production_order_id === o.id).sort((a,b)=>a.sort_order-b.sort_order).map((stage) => <div key={stage.id} className="flex items-center justify-between gap-2 rounded-lg bg-stone-50 p-2 dark:bg-stone-900"><span className="text-xs">{stage.name}</span><select aria-label={'حالة '+stage.name} className={inputClass+' max-w-40'} value={stage.status} onChange={(e)=>void updateStageStatus(stage,e.target.value)}>{['pending','in_progress','blocked','completed','skipped'].map((s)=><option key={s} value={s}>{s==='pending'?'بانتظار':s==='in_progress'?'قيد التنفيذ':s==='blocked'?'متوقفة':s==='completed'?'مكتملة':'تجاوز'}</option>)}</select></div>)}</div></div>)}{orders.length === 0 && <p className="py-8 text-center text-xs text-stone-500">لا توجد أوامر إنتاج.</p>}</div></section>}

          {tab === 'inventory' && <div className="space-y-4"><section className={panelClass}><div className="flex items-center justify-between gap-3"><div><h2 className="font-black">المواد والمخزون</h2><p className="mt-1 text-xs text-stone-500">سجل المواد وحد إعادة الطلب. أرصدة الحركة تُسجل كسجل منفصل للتتبع.</p></div>{createButton('إضافة مادة','inventory')}</div><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[650px] text-right text-xs"><thead className="bg-stone-50 dark:bg-stone-900"><tr>{['رمز المادة','المادة','الوحدة','الرصيد','حد إعادة الطلب','متوسط التكلفة','الحالة'].map((h) => <th key={h} className="p-3">{h}</th>)}</tr></thead><tbody>{items.map((i) => <tr key={i.id} className="border-t border-stone-100 dark:border-stone-800"><td className="p-3">{i.sku || '—'}</td><td className="p-3 font-bold">{i.name}</td><td className="p-3">{i.unit}</td><td className={`p-3 font-bold ${Number(i.quantity)<=Number(i.reorder_level)?'text-red-600':''}`}>{money(i.quantity)}</td><td className="p-3">{money(i.reorder_level)}</td><td className="p-3">{money(i.average_unit_cost)} ر.ي</td><td className="p-3">{i.is_active ? 'نشط' : 'موقوف'}</td></tr>)}{items.length === 0 && <tr><td colSpan={7} className="p-8 text-center text-stone-500">لا توجد مواد مسجلة.</td></tr>}</tbody></table></div></section><section className={panelClass}><h3 className="font-black">تسجيل حركة مخزون</h3><div className="mt-3 grid gap-3 sm:grid-cols-4"><select className={inputClass} value={movementItem} onChange={(e) => setMovementItem(e.target.value)}><option value="">اختر المادة</option>{items.map((i) => <option key={i.id} value={i.id}>{i.name} · الرصيد {money(i.quantity)}</option>)}</select><select className={inputClass} value={movementType} onChange={(e) => setMovementType(e.target.value as 'receipt'|'issue')}><option value="receipt">إضافة للمخزون</option><option value="issue">صرف من المخزون</option></select><input className={inputClass} type="number" min="0.001" step="0.001" placeholder="الكمية" value={movementQty} onChange={(e) => setMovementQty(e.target.value)} /><button type="button" disabled={saving} onClick={() => void saveMovement()} className="rounded-xl bg-[#B9142D] px-4 py-2 text-xs font-black text-white disabled:opacity-50">{saving ? 'جارٍ الحفظ...' : 'حفظ الحركة'}</button></div><div className="mt-2 text-[11px] text-stone-500">لن يتغير الرصيد إلا بعد تثبيت حركة المخزون في قاعدة البيانات.</div><div className="mt-4 divide-y divide-stone-100 dark:divide-stone-800">{movements.slice(0,8).map((m) => <div key={m.id} className="flex flex-wrap justify-between gap-2 py-2 text-xs"><span>{items.find((i) => i.id === m.inventory_item_id)?.name || 'مادة'} · {m.movement_type === 'receipt' ? 'استلام' : m.movement_type === 'issue' ? 'صرف' : m.movement_type} · {dateLabel(m.created_at)}</span><strong>{money(m.quantity)} {m.movement_type === 'issue' ? <ArrowUpFromLine size={13} className="inline" /> : <ArrowDownToLine size={13} className="inline" />}</strong></div>)}</div></section></div>}
          {tab === 'suppliers' && <section className={panelClass}><div className="flex items-center justify-between gap-3"><div><h2 className="font-black">دليل الموردين</h2><p className="mt-1 text-xs text-stone-500">بيانات الاتصال وشروط الدفع ومدة التوريد.</p></div>{createButton('إضافة مورد','suppliers')}</div><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[650px] text-right text-xs"><thead className="bg-stone-50 dark:bg-stone-900"><tr>{['المورد','مسؤول التواصل','الهاتف','شروط الدفع','مدة التوريد','الحالة'].map((h)=><th key={h} className="p-3">{h}</th>)}</tr></thead><tbody>{suppliers.map((s)=><tr key={s.id} className="border-t border-stone-100 dark:border-stone-800"><td className="p-3 font-bold">{s.name}</td><td className="p-3">{s.contact_name || '—'}</td><td className="p-3" dir="ltr">{s.phone || '—'}</td><td className="p-3">{s.payment_terms || '—'}</td><td className="p-3">{s.lead_time_days ?? '—'}</td><td className="p-3">{s.is_active ? 'نشط' : 'موقوف'}</td></tr>)}{suppliers.length===0 && <tr><td colSpan={6} className="p-8 text-center text-stone-500">لا يوجد موردون مسجلون.</td></tr>}</tbody></table></div></section>}
          {tab === 'purchases' && <section className={panelClass}><div className="flex items-center justify-between gap-3"><div><h2 className="font-black">أوامر الشراء والتوريد</h2><p className="mt-1 text-xs text-stone-500">تتبع المورد والحالة والقيمة وموعد التوريد المتوقع.</p></div>{createButton('إنشاء أمر شراء','purchases')}</div><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[650px] text-right text-xs"><thead className="bg-stone-50 dark:bg-stone-900"><tr>{['المرجع','المورد','القيمة','موعد التوريد','الحالة'].map((h)=><th key={h} className="p-3">{h}</th>)}</tr></thead><tbody>{purchaseOrders.map((p)=><tr key={p.id} className="border-t border-stone-100 dark:border-stone-800"><td className="p-3 font-bold">PO-{p.purchase_number}</td><td className="p-3">{suppliers.find((s)=>s.id===p.supplier_id)?.name || 'مورد'}</td><td className="p-3">{money(p.total)} ر.ي</td><td className="p-3">{dateLabel(p.expected_at)}</td><td className="p-3"><select className={inputClass} value={p.status} onChange={(e)=>void updateStatus('purchase_orders',p.id,e.target.value)}>{['draft','ordered','partially_received','received','cancelled'].map((s)=><option key={s} value={s}>{s==='draft'?'مسودة':s==='ordered'?'تم الطلب':s==='partially_received'?'استلام جزئي':s==='received'?'مستلم':'ملغي'}</option>)}</select></td></tr>)}{purchaseOrders.length===0 && <tr><td colSpan={5} className="p-8 text-center text-stone-500">لا توجد أوامر شراء.</td></tr>}</tbody></table></div></section>}
          {tab === 'costs' && <section className={panelClass}><div className="flex items-center justify-between gap-3"><div><h2 className="font-black">تكاليف المشاريع الفعلية</h2><p className="mt-1 text-xs text-stone-500">كل قيد تكلفة مرتبط بمشروع؛ يجمع النظام التكاليف المسجلة تلقائيًا في بطاقة المشروع.</p></div>{createButton('تسجيل تكلفة','costs')}</div><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[750px] text-right text-xs"><thead className="bg-stone-50 dark:bg-stone-900"><tr>{['التاريخ','المشروع','نوع التكلفة','الوصف','الكمية','تكلفة الوحدة','الإجمالي','المورد'].map((h)=><th key={h} className="p-3">{h}</th>)}</tr></thead><tbody>{costs.map((cost)=><tr key={cost.id} className="border-t border-stone-100 dark:border-stone-800"><td className="p-3">{dateLabel(cost.occurred_on)}</td><td className="p-3">{projectName(cost.project_id)}</td><td className="p-3">{cost.cost_type}</td><td className="p-3">{cost.description}</td><td className="p-3">{money(cost.quantity)}</td><td className="p-3">{money(cost.unit_cost)}</td><td className="p-3 font-bold">{money(cost.amount)} ر.ي</td><td className="p-3">{suppliers.find((s)=>s.id===cost.supplier_id)?.name || '—'}</td></tr>)}{costs.length===0 && <tr><td colSpan={8} className="p-8 text-center text-stone-500">لا توجد تكاليف مسجلة.</td></tr>}</tbody></table></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{projects.map((p)=><div key={p.id} className="rounded-xl bg-stone-50 p-3 dark:bg-stone-900"><div className="font-bold">{p.title}</div><div className="mt-2 flex flex-wrap gap-4 text-xs"><span>قيمة تقديرية: <b>{money(p.estimated_total)} ر.ي</b></span><span>تكلفة فعلية: <b>{money(p.actual_cost)} ر.ي</b></span></div></div>)}</div></section>}
        </>
      )}

      {formOpen && <div className="fixed inset-0 z-[10000] flex items-center justify-center overflow-y-auto bg-black/50 p-4" role="dialog" aria-modal="true" aria-label="نموذج إنشاء سجل"><div className="my-8 w-full max-w-2xl rounded-2xl bg-[#FAF8F5] p-5 shadow-2xl dark:bg-[#171514]"><div className="flex items-center justify-between"><h2 className="text-lg font-black">{tab === 'customers' ? 'ملف عميل جديد' : tab === 'projects' ? 'مشروع جديد' : tab === 'quotes' ? 'عرض سعر جديد' : tab === 'finance' ? 'فاتورة جديدة' : tab === 'production' ? 'أمر إنتاج جديد' : tab === 'suppliers' ? 'مورد جديد' : tab === 'purchases' ? 'أمر شراء جديد' : tab === 'costs' ? 'تسجيل تكلفة مشروع' : 'مادة مخزون جديدة'}</h2><button type="button" onClick={() => setFormOpen(false)} className="rounded-lg px-3 py-1 text-xl">×</button></div><div className="mt-4 grid gap-3 sm:grid-cols-2">
        {tab === 'customers' && <>{field('اسم جهة الاتصال / العميل','name')}{field('اسم الشركة أو المؤسسة','company_name')}{selectField('نوع العميل','customer_type',[{value:'individual',label:'فرد'},{value:'company',label:'شركة'},{value:'institution',label:'مؤسسة'}])}{field('الهاتف','phone','tel')}{field('واتساب','whatsapp','tel')}{field('البريد الإلكتروني','email','email')}{field('المدينة','city')}{field('العنوان','address')}{selectField('مصدر العميل','source',[{value:'website',label:'الموقع'},{value:'whatsapp',label:'واتساب'},{value:'referral',label:'ترشيح'},{value:'direct',label:'زيارة مباشرة'},{value:'social',label:'شبكات اجتماعية'},{value:'other',label:'أخرى'}])}{field('ملاحظات','notes')}</>}
        {tab === 'projects' && <>{selectField('العميل','customer_id',customers.map((c)=>({value:c.id,label:c.company_name||c.name})))}{field('اسم المشروع','title')}{field('وصف مختصر','description')}{selectField('الأولوية','priority',[{value:'low',label:'منخفضة'},{value:'normal',label:'عادية'},{value:'high',label:'عالية'},{value:'urgent',label:'عاجلة'}])}{field('موعد التسليم','due_date','date')}{field('القيمة التقديرية بالريال اليمني','estimated_total','number')}{field('ملاحظات داخلية','notes')}</>}
        {tab === 'quotes' && <>{selectField('العميل','customer_id',customers.map((c)=>({value:c.id,label:c.company_name||c.name})))}{selectField('المشروع (اختياري)','project_id',[{value:'',label:'بدون مشروع'} ,...projects.map((p)=>({value:p.id,label:p.title}))])}{field('القيمة قبل الخصم','subtotal','number')}{field('الخصم','discount','number')}{field('الضريبة / الرسوم','tax','number')}{field('صالح حتى','valid_until','date')}{field('الشروط','terms')}</>}
        {tab === 'finance' && <>{selectField('العميل','customer_id',customers.map((c)=>({value:c.id,label:c.company_name||c.name})))}{selectField('المشروع (اختياري)','project_id',[{value:'',label:'بدون مشروع'},...projects.map((p)=>({value:p.id,label:p.title}))])}{selectField('عرض السعر (اختياري)','commercial_quote_id',[{value:'',label:'بدون ربط'},...quotes.map((q)=>({value:q.id,label:`Q-${q.quote_number}-V${q.version} · ${customerName(q.customer_id)}`}))])}{field('القيمة قبل الخصم','subtotal','number')}{field('الخصم','discount','number')}{field('الضريبة / الرسوم','tax','number')}{field('تاريخ الاستحقاق','due_date','date')}{field('ملاحظات','notes')}</>}
        {tab === 'production' && <>{selectField('المشروع','project_id',projects.map((p)=>({value:p.id,label:p.title})))}{selectField('الأولوية','priority',[{value:'low',label:'منخفضة'},{value:'normal',label:'عادية'},{value:'high',label:'عالية'},{value:'urgent',label:'عاجلة'}])}{field('موعد التسليم','due_date','date')}{selectField('حالة البداية','status',[{value:'queued',label:'في قائمة الإنتاج'},{value:'prepress',label:'تجهيز الملفات'}])}{field('ملاحظات الجودة','quality_notes')}</>}
        {tab === 'inventory' && <>{field('اسم المادة','name')}{field('رمز المادة / SKU','sku')}{field('التصنيف','category')}{field('وحدة القياس','unit')}{field('الرصيد الافتتاحي','quantity','number')}{field('حد إعادة الطلب','reorder_level','number')}{field('متوسط تكلفة الوحدة','average_unit_cost','number')}{field('ملاحظات','notes')}</>}
        {tab === 'suppliers' && <>{field('اسم المورد','name')}{field('اسم مسؤول التواصل','contact_name')}{field('الهاتف','phone','tel')}{field('البريد الإلكتروني','email','email')}{field('العنوان','address')}{field('شروط الدفع','payment_terms')}{field('مدة التوريد بالأيام','lead_time_days','number')}{field('ملاحظات','notes')}</>}
        {tab === 'purchases' && <>{selectField('المورد','supplier_id',suppliers.map((s)=>({value:s.id,label:s.name})))}{selectField('الحالة','status',[{value:'draft',label:'مسودة'},{value:'ordered',label:'تم الطلب'},{value:'partially_received',label:'استلام جزئي'},{value:'received',label:'مستلم'},{value:'cancelled',label:'ملغي'}])}{field('القيمة الإجمالية','total','number')}{field('موعد التوريد المتوقع','expected_at','date')}{field('ملاحظات','notes')}</>}
        {tab === 'costs' && <>{selectField('المشروع','project_id',projects.map((p)=>({value:p.id,label:p.title})))}{selectField('نوع التكلفة','cost_type',[{value:'materials',label:'مواد خام'},{value:'labor',label:'عمالة'},{value:'printing',label:'طباعة'},{value:'finishing',label:'تشطيب'},{value:'installation',label:'تركيب'},{value:'transport',label:'نقل'},{value:'outsourcing',label:'توريد خارجي'},{value:'other',label:'أخرى'}])}{field('وصف التكلفة','description')}{field('الكمية','quantity','number')}{field('تكلفة الوحدة','unit_cost','number')}{selectField('المورد (اختياري)','supplier_id',[{value:'',label:'بدون مورد'},...suppliers.map((s)=>({value:s.id,label:s.name}))])}{field('تاريخ التكلفة','occurred_on','date')}{field('ملاحظات','notes')}</>}
      </div><div className="mt-5 flex justify-end gap-2"><button type="button" onClick={() => setFormOpen(false)} className="rounded-xl border border-stone-300 px-4 py-2.5 text-xs font-bold dark:border-stone-700">إلغاء</button><button type="button" disabled={saving || loading} onClick={() => void saveRecord()} className="inline-flex items-center gap-2 rounded-xl bg-[#B9142D] px-5 py-2.5 text-xs font-black text-white disabled:opacity-50">{saving && <LoaderCircle size={14} className="animate-spin" />}حفظ في قاعدة البيانات</button></div></div></div>}
    </div>
  );
};
