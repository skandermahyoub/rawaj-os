import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { CheckCircle2, Clock3, FileText, LogIn, LogOut, RefreshCw, ShieldCheck, Wallet, BriefcaseBusiness, MessageSquareText } from 'lucide-react';

type Row = Record<string, any>;
const money = (value: number | string | null | undefined) =>
  new Intl.NumberFormat('ar-YE', { maximumFractionDigits: 2 }).format(Number(value || 0));
const dateLabel = (value?: string | null) => value ? new Date(value).toLocaleDateString('ar-YE') : '—';
const panel = 'rounded-2xl border border-[#E7E0D3] bg-white p-4 shadow-sm dark:border-[#302B28] dark:bg-[#191716]';
const input = 'w-full rounded-xl border border-[#E7E0D3] bg-white px-3 py-3 text-sm outline-none focus:border-[#B9142D] dark:border-[#393331] dark:bg-[#1D1A19] dark:text-[#F5F1EA]';

const statusLabels: Record<string, string> = {
  open: 'مفتوح', awaiting_approval: 'بانتظار الاعتماد', approved: 'معتمد', in_design: 'قيد التصميم',
  in_production: 'قيد الإنتاج', in_progress: 'قيد التنفيذ', pending: 'بانتظار البدء', skipped: 'تم تجاوزها', quality_check: 'فحص الجودة', ready_for_delivery: 'جاهز للتسليم',
  delivered: 'تم التسليم', closed: 'مغلق', cancelled: 'ملغي', draft: 'مسودة', sent: 'مرسل',
  rejected: 'مرفوض', expired: 'منتهي', converted: 'محوّل إلى مشروع', issued: 'صادرة',
  partially_paid: 'مدفوعة جزئيًا', paid: 'مدفوعة', overdue: 'متأخرة', void: 'ملغاة',
  queued: 'في قائمة الإنتاج', prepress: 'تجهيز الملفات', printing: 'طباعة', finishing: 'تشطيب',
  assembly: 'تجميع', ready: 'جاهز', on_hold: 'موقوف مؤقتًا', proof_submitted: 'بانتظار اعتماد البروفة',
  feedback_requested: 'مطلوب تعديل', completed: 'مكتمل', new: 'جديد', reviewing: 'قيد المراجعة',
};

export const CustomerPortalView: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerMode, setRegisterMode] = useState(false);
  const [customer, setCustomer] = useState<Row | null>(null);
  const [projects, setProjects] = useState<Row[]>([]);
  const [quotes, setQuotes] = useState<Row[]>([]);
  const [invoices, setInvoices] = useState<Row[]>([]);
  const [payments, setPayments] = useState<Row[]>([]);
  const [orders, setOrders] = useState<Row[]>([]);
  const [stages, setStages] = useState<Row[]>([]);
  const [proofs, setProofs] = useState<Row[]>([]);
  const [activities, setActivities] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [proofComment, setProofComment] = useState<Record<string, string>>({});

  useEffect(() => {
    let mounted = true;
    void supabase.auth.getSession().then(({ data }) => {
      if (mounted) setSession(data.session);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (mounted) setSession(nextSession);
    });
    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const load = useCallback(async () => {
    if (!session?.user?.email) {
      setCustomer(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { data: portalResult, error: portalError } = await (supabase as any).rpc('get_rawaj_customer_portal_data');
      if (portalError) throw portalError;
      const portal = (portalResult || {}) as Row;
      if (!portal.customer) {
        setCustomer(null);
        setProjects([]); setQuotes([]); setInvoices([]); setPayments([]); setOrders([]); setStages([]); setProofs([]); setActivities([]);
        setError('هذا البريد غير مرتبط بملف عميل لدى رواج. استخدم البريد المسجل في عرض السعر أو تواصل مع فريق رواج لربط الحساب.');
        return;
      }
      setCustomer(portal.customer as Row);
      setProjects((portal.projects || []) as Row[]);
      setQuotes((portal.quotes || []) as Row[]);
      setInvoices((portal.invoices || []) as Row[]);
      setPayments((portal.payments || []) as Row[]);
      setOrders((portal.orders || []) as Row[]);
      setStages((portal.stages || []) as Row[]);
      setProofs((portal.proofs || []) as Row[]);
      setActivities((portal.activities || []) as Row[]);
    } catch (e: any) {
      setError(e?.message || 'تعذر تحميل بيانات حساب العميل. تأكد من أن الأنظمة التشغيلية مفعّلة وأن بريد الحساب مرتبط بملف العميل.');
    } finally {
      setLoading(false);
    }
  }, [session?.user?.email]);

  useEffect(() => { void load(); }, [load]);

  const paidByInvoice = useMemo(() => payments.reduce<Record<string, number>>((acc, payment) => {
    acc[payment.invoice_id] = (acc[payment.invoice_id] || 0) + Number(payment.amount || 0);
    return acc;
  }, {}), [payments]);

  const signIn = async () => {
    setSaving(true); setError(''); setNotice('');
    try {
      const cleanEmail = email.trim().toLowerCase();
      if (!cleanEmail || password.length < 8) throw new Error('أدخل البريد الإلكتروني وكلمة مرور لا تقل عن 8 أحرف.');
      const result = registerMode
        ? await supabase.auth.signUp({ email: cleanEmail, password })
        : await supabase.auth.signInWithPassword({ email: cleanEmail, password });
      if (result.error) throw result.error;
      if (registerMode && !result.data.session) {
        setNotice('تم إنشاء طلب الحساب. تحقق من بريدك الإلكتروني لتأكيده، ثم سجّل الدخول بنفس البريد المسجل لدى رواج.');
      } else {
        setSession(result.data.session);
        setNotice(registerMode ? 'تم إنشاء الحساب. إذا لم تظهر مشاريعك، فتأكد من أن البريد نفسه مسجل في ملف العميل لدى رواج.' : 'تم تسجيل الدخول.');
      }
      setPassword('');
    } catch (e: any) {
      setError(e?.message || 'تعذر تسجيل الدخول.');
    } finally {
      setSaving(false);
    }
  };

  const reorder = async (quote: Row) => {
    if (!customer || !session?.user?.email) return;
    setSaving(true); setError(''); setNotice('');
    try {
      const items = Array.isArray(quote.line_items) && quote.line_items.length
        ? quote.line_items
        : [{ title: 'إعادة تنفيذ العرض السابق', quantity: 1, unit_price: Number(quote.subtotal || 0) }];
      const requestId = crypto.randomUUID();
      const payload = {
        id: requestId,
        reference_number: 'RW-' + requestId.slice(0, 8).toUpperCase(),
        customer: {
          name: customer.name,
          company: customer.company_name || '',
          mobile: customer.phone || '',
          whatsapp: customer.whatsapp || customer.phone || '',
          email: session.user.email,
          city: customer.city || '',
          address: customer.address || '',
        },
        items,
        status: 'new',
        general_notes: 'طلب إعادة تنفيذ مرتبط بالعرض السابق Q-' + quote.quote_number + '-V' + quote.version,
      };
      const { error: insertError } = await supabase.from('quotes' as any).insert(payload);
      if (insertError) throw insertError;
      setNotice('تم إرسال طلب إعادة التنفيذ إلى فريق رواج، وسيظهر ضمن طلبات التسعير للمراجعة.');
    } catch (e: any) {
      setError(e?.message || 'تعذر إرسال طلب إعادة التنفيذ.');
    } finally {
      setSaving(false);
    }
  };

  const respondToProof = async (task: Row, decision: 'approved' | 'feedback_requested') => {
    setSaving(true); setError(''); setNotice('');
    try {
      const { error: rpcError } = await (supabase as any).rpc('respond_to_rawaj_proof', {
        p_task_id: task.id,
        p_decision: decision,
        p_comment: proofComment[task.id] || null,
      });
      if (rpcError) throw rpcError;
      setProofComment((old) => ({ ...old, [task.id]: '' }));
      setNotice(decision === 'approved' ? 'تم اعتماد البروفة وتسجيل القرار.' : 'تم إرسال طلب التعديل إلى فريق التصميم.');
      await load();
    } catch (e: any) {
      setError(e?.message || 'تعذر تسجيل قرار البروفة.');
    } finally {
      setSaving(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null); setCustomer(null);
    setNotice('تم تسجيل الخروج.');
  };

  if (!session) {
    return (
      <div dir="rtl" className="mx-auto max-w-3xl py-8 sm:py-12">
        <section className="overflow-hidden rounded-3xl border border-[#E7E0D3] bg-white shadow-xl dark:border-[#302B28] dark:bg-[#191716]">
          <div className="bg-gradient-to-l from-[#5B0715] via-[#8E1025] to-[#B9142D] p-7 text-white sm:p-10">
            <div className="mb-4 inline-flex rounded-2xl bg-white/10 p-3"><ShieldCheck size={25} /></div>
            <h1 className="text-2xl font-black sm:text-3xl">بوابة عملاء رواج</h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/80">تابع مشاريعك وعروض الأسعار والفواتير ومراحل الإنتاج، واعتمد بروفات التصميم أو اطلب تعديلها من مكان واحد.</p>
          </div>
          <div className="grid gap-6 p-6 sm:grid-cols-[1fr_0.85fr] sm:p-8">
            <div className="space-y-4">
              <h2 className="text-lg font-black">{registerMode ? 'إنشاء حساب عميل' : 'تسجيل الدخول'}</h2>
              <label className="block space-y-1.5 text-xs font-bold"><span>البريد الإلكتروني المسجل لدى رواج</span><input className={input} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
              <label className="block space-y-1.5 text-xs font-bold"><span>كلمة المرور</span><input className={input} type="password" autoComplete={registerMode ? 'new-password' : 'current-password'} value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') void signIn(); }} /></label>
              {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-xs text-red-800 dark:bg-red-950/30 dark:text-red-200">{error}</p>}
              {notice && <p role="status" className="rounded-xl bg-emerald-50 p-3 text-xs text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200">{notice}</p>}
              <button type="button" disabled={saving} onClick={() => void signIn()} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#B9142D] px-4 py-3 text-sm font-black text-white disabled:opacity-50"><LogIn size={16} />{saving ? 'جارٍ التحقق...' : registerMode ? 'إنشاء الحساب' : 'دخول آمن'}</button>
              <button type="button" onClick={() => { setRegisterMode((v) => !v); setError(''); setNotice(''); }} className="w-full py-2 text-xs font-bold text-[#B9142D]">{registerMode ? 'لديك حساب بالفعل؟ تسجيل الدخول' : 'أول مرة؟ أنشئ حساب عميل'}</button>
            </div>
            <div className="rounded-2xl bg-[#F7F3EC] p-5 text-sm leading-7 text-stone-700 dark:bg-[#211D1B] dark:text-stone-300">
              <h3 className="font-black">خصوصية حسابك</h3>
              <p className="mt-2 text-xs">تظهر السجلات المرتبطة بالبريد الإلكتروني نفسه فقط. إذا كان بريد حسابك مختلفًا عن البريد المسجل في عرض السعر أو ملف العميل، فلن تظهر البيانات حتى يصحح فريق رواج الربط.</p>
              <p className="mt-4 text-xs">تُتاح متابعة المشاريع بعد تفعيل الأنظمة التشغيلية وربط البريد بملف العميل.</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const outstanding = invoices.reduce((sum, invoice) => sum + Math.max(0, Number(invoice.total || 0) - (paidByInvoice[invoice.id] || 0)), 0);
  const activeProjects = projects.filter((p) => !['closed', 'cancelled', 'delivered'].includes(p.status)).length;

  return (
    <div dir="rtl" className="space-y-5 py-6">
      <header className="flex flex-col gap-4 rounded-3xl bg-gradient-to-l from-[#5B0715] via-[#8E1025] to-[#B9142D] p-6 text-white sm:flex-row sm:items-center sm:justify-between">
        <div><div className="text-[10px] font-bold tracking-widest text-white/70">RAWAJ CLIENT PORTAL</div><h1 className="mt-2 text-2xl font-black">مرحبًا {customer?.company_name || customer?.name || session.user.email}</h1><p className="mt-2 text-xs text-white/80">متابعة المشاريع والعروض والفواتير والبروفات من حساب واحد.</p></div>
        <div className="flex gap-2"><button type="button" disabled={loading} onClick={() => void load()} className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-xs font-bold"><RefreshCw size={14} />تحديث</button><button type="button" onClick={() => void signOut()} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#8E1025]"><LogOut size={14} />خروج</button></div>
      </header>
      {error && <div role="alert" className="rounded-xl border border-red-300 bg-red-50 p-3 text-xs text-red-800 dark:border-red-900 dark:bg-red-950/30 dark:text-red-200">{error}</div>}
      {notice && <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200">{notice}</div>}
      {loading ? <div className={panel}>جارٍ تحميل بيانات حسابك...</div> : customer && <>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className={panel}><BriefcaseBusiness className="text-[#B9142D]" size={20}/><p className="mt-3 text-xs text-stone-500">مشاريع نشطة</p><strong className="mt-1 block text-2xl">{activeProjects}</strong></div>
          <div className={panel}><FileText className="text-[#B9142D]" size={20}/><p className="mt-3 text-xs text-stone-500">عروض الأسعار</p><strong className="mt-1 block text-2xl">{quotes.length}</strong></div>
          <div className={panel}><Wallet className="text-[#B9142D]" size={20}/><p className="mt-3 text-xs text-stone-500">المبلغ المتبقي</p><strong className="mt-1 block text-2xl">{money(outstanding)} ر.ي</strong></div>
          <div className={panel}><MessageSquareText className="text-[#B9142D]" size={20}/><p className="mt-3 text-xs text-stone-500">بروفات بانتظارك</p><strong className="mt-1 block text-2xl">{proofs.filter((p) => p.status === 'proof_submitted').length}</strong></div>
        </div>

        <section className={panel}><h2 className="font-black">مشاريعي ومراحل التنفيذ</h2><div className="mt-4 space-y-3">{projects.map((project) => {
          const projectOrders = orders.filter((order) => order.project_id === project.id);
          return <article key={project.id} className="rounded-xl border border-stone-100 p-4 dark:border-stone-800"><div className="flex flex-wrap items-start justify-between gap-2"><div><h3 className="font-black">{project.title}</h3><p className="mt-1 text-xs text-stone-500">رقم المشروع P-{project.project_number} · موعد التسليم {dateLabel(project.due_date)}</p></div><span className="rounded-lg bg-[#B9142D]/10 px-2.5 py-1 text-xs font-bold text-[#B9142D]">{statusLabels[project.status] || project.status}</span></div>{projectOrders.map((order) => <div key={order.id} className="mt-4 rounded-lg bg-stone-50 p-3 dark:bg-stone-900"><div className="flex flex-wrap justify-between gap-2 text-xs"><strong>أمر إنتاج PO-{order.order_number}</strong><span>{statusLabels[order.status] || order.status}</span></div><div className="mt-3 grid gap-2 sm:grid-cols-2">{stages.filter((stage) => stage.production_order_id === order.id).map((stage) => <div key={stage.id} className="flex items-center gap-2 text-xs"><span className={stage.status === 'completed' ? 'text-emerald-600' : 'text-stone-400'}><CheckCircle2 size={14}/></span><span>{stage.name}</span><span className="mr-auto text-stone-500">{statusLabels[stage.status] || stage.status}</span></div>)}</div></div>)}</article>;
        })}{projects.length === 0 && <p className="py-6 text-center text-xs text-stone-500">لا توجد مشاريع مرتبطة بحسابك حتى الآن.</p>}</div></section>

        <section className={panel}><h2 className="font-black">عروض الأسعار وإعادة الطلب</h2><div className="mt-4 space-y-3">{quotes.map((quote) => <article key={quote.id} className="flex flex-col gap-3 rounded-xl border border-stone-100 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-stone-800"><div><h3 className="font-black">Q-{quote.quote_number}-V{quote.version}</h3><p className="mt-1 text-xs text-stone-500">{dateLabel(quote.created_at)} · {statusLabels[quote.status] || quote.status}</p><p className="mt-2 text-sm font-bold">{money(quote.total)} ر.ي</p></div><button type="button" disabled={saving} onClick={() => void reorder(quote)} className="rounded-xl bg-[#B9142D] px-4 py-2.5 text-xs font-black text-white disabled:opacity-50">إعادة الطلب</button></article>)}{quotes.length === 0 && <p className="py-6 text-center text-xs text-stone-500">لا توجد عروض أسعار مرتبطة بحسابك.</p>}</div></section>

        <section className={panel}><h2 className="font-black">الفواتير والتحصيلات</h2><div className="mt-4 space-y-3">{invoices.map((invoice) => <article key={invoice.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-stone-100 p-4 dark:border-stone-800"><div><h3 className="font-black">فاتورة INV-{invoice.invoice_number}</h3><p className="mt-1 text-xs text-stone-500">الاستحقاق {dateLabel(invoice.due_date)} · {statusLabels[invoice.status] || invoice.status}</p></div><div className="text-left"><p className="font-black">{money(invoice.total)} ر.ي</p><p className="mt-1 text-xs text-stone-500">متبقي {money(Math.max(0, Number(invoice.total || 0) - (paidByInvoice[invoice.id] || 0)))} ر.ي</p></div></article>)}{invoices.length === 0 && <p className="py-6 text-center text-xs text-stone-500">لا توجد فواتير مرتبطة بحسابك.</p>}</div></section>

        <section className={panel}><h2 className="font-black">اعتماد بروفات التصميم</h2><p className="mt-1 text-xs text-stone-500">يمكنك اعتماد البروفة أو إرسال طلب تعديل. يسجل القرار ضمن سجل الملاحظات.</p><div className="mt-4 space-y-3">{proofs.filter((task) => task.status === 'proof_submitted').map((task) => <article key={task.id} className="rounded-xl border border-stone-100 p-4 dark:border-stone-800"><div className="flex flex-wrap items-start justify-between gap-2"><div><h3 className="font-black">{task.title_ar}</h3><p className="mt-1 text-xs text-stone-500">موعد التسليم {dateLabel(task.deadline)}</p></div><span className="rounded-lg bg-amber-100 px-2 py-1 text-xs font-bold text-amber-900"><Clock3 className="ml-1 inline" size={13}/>بانتظار اعتمادك</span></div>{(Array.isArray(task.proof_versions) ? task.proof_versions : []).map((proof: Row) => <a key={proof.id} href={proof.preview_url} target="_blank" rel="noreferrer" className="mt-3 block rounded-lg bg-stone-50 p-3 text-xs font-bold text-[#B9142D] underline dark:bg-stone-900">{proof.file_name || 'فتح البروفة'} · الإصدار {proof.version_number}</a>)}<textarea className={input + ' mt-3 min-h-20'} placeholder="ملاحظة للمصمم (اختياري)" value={proofComment[task.id] || ''} onChange={(e) => setProofComment((old) => ({ ...old, [task.id]: e.target.value }))}/><div className="mt-3 flex flex-wrap gap-2"><button type="button" disabled={saving} onClick={() => void respondToProof(task,'approved')} className="rounded-xl bg-emerald-700 px-4 py-2.5 text-xs font-black text-white disabled:opacity-50">اعتماد البروفة</button><button type="button" disabled={saving} onClick={() => void respondToProof(task,'feedback_requested')} className="rounded-xl border border-[#B9142D] px-4 py-2.5 text-xs font-black text-[#B9142D] disabled:opacity-50">طلب تعديل</button></div></article>)}{proofs.filter((task) => task.status === 'proof_submitted').length === 0 && <p className="py-6 text-center text-xs text-stone-500">لا توجد بروفات تنتظر اعتمادك.</p>}</div></section>

        <section className={panel}><h2 className="font-black">سجل التواصل</h2><div className="mt-3 space-y-2">{activities.map((activity) => <div key={activity.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 py-2 text-xs last:border-0 dark:border-stone-800"><span>{activity.subject}</span><span className="text-stone-500">{dateLabel(activity.due_at)} · {activity.completed_at ? 'مكتملة' : 'قيد المتابعة'}</span></div>)}{activities.length === 0 && <p className="py-4 text-center text-xs text-stone-500">لا توجد متابعات مسجلة.</p>}</div></section>
      </>}
    </div>
  );
};
