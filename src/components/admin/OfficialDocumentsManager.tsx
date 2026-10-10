import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FileText, Printer, RefreshCw, ShieldCheck, Signature } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { SignaturePad } from './SignaturePad';

type Row = Record<string, any>;
type DocType = 'quote' | 'invoice';
const panel = 'rounded-2xl border border-[#E7E0D3] bg-white p-4 shadow-sm dark:border-[#302B28] dark:bg-[#191716]';
const input = 'w-full rounded-xl border border-[#E7E0D3] bg-white px-3 py-2.5 text-sm text-[#25211F] outline-none focus:border-[#B9142D] dark:border-[#393331] dark:bg-[#1D1A19] dark:text-[#F5F1EA]';
const money = (v: unknown) => new Intl.NumberFormat('ar-YE', { maximumFractionDigits: 2 }).format(Number(v || 0));
const dateLabel = (v?: string | null) => v ? new Date(v).toLocaleDateString('ar-YE') : '—';
const esc = (v: unknown) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] || c));

export const OfficialDocumentsManager: React.FC = () => {
  const [quotes, setQuotes] = useState<Row[]>([]);
  const [invoices, setInvoices] = useState<Row[]>([]);
  const [customers, setCustomers] = useState<Row[]>([]);
  const [signatures, setSignatures] = useState<Row[]>([]);
  const [kind, setKind] = useState<DocType>('quote');
  const [selected, setSelected] = useState<Row | null>(null);
  const [signature, setSignature] = useState('');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [party, setParty] = useState<'customer' | 'rawaj'>('customer');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const results = await Promise.all([
        supabase.from('commercial_quotes' as any).select('*').order('created_at', { ascending: false }).limit(500),
        supabase.from('invoices' as any).select('*').order('created_at', { ascending: false }).limit(500),
        supabase.from('customers' as any).select('*').order('created_at', { ascending: false }).limit(1000),
        supabase.from('document_signatures' as any).select('*').order('signed_at', { ascending: false }).limit(1000),
      ]);
      const failed = results.find((r) => r.error);
      if (failed?.error) throw failed.error;
      setQuotes((results[0].data || []) as Row[]);
      setInvoices((results[1].data || []) as Row[]);
      setCustomers((results[2].data || []) as Row[]);
      setSignatures((results[3].data || []) as Row[]);
    } catch (e: any) {
      setError(e?.message || 'تعذر تحميل أرشيف المستندات. تحقق من صلاحيات المستخدم وتطبيق ترحيل قاعدة البيانات في بيئة الاختبار.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const customerFor = (row: Row) => customers.find((c) => c.id === row.customer_id);
  const reference = (type: DocType, row: Row) => type === 'quote' ? 'Q-' + row.quote_number + '-V' + row.version : 'INV-' + row.invoice_number;
  const linkedSignatures = useMemo(() => signatures.filter((s) => s.document_type === kind), [signatures, kind]);
  const filtered = useMemo(() => {
    const rows = kind === 'quote' ? quotes : invoices;
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => {
      const c = customerFor(r);
      return [reference(kind, r), c?.name, c?.company_name, c?.phone, r.status].some((v) => String(v || '').toLowerCase().includes(q));
    });
  }, [kind, quotes, invoices, customers, search]);

  const openSign = (type: DocType, row: Row) => {
    setKind(type);
    setSelected(row);
    setSignature('');
    setName('');
    setTitle('');
    setCustomTitle('');
    setParty('customer');
    setError('');
    setNotice('');
  };

  const printDocument = (type: DocType, row: Row, signed?: Row | null) => {
    const customer = customerFor(row);
    const ref = reference(type, row);
    const isQuote = type === 'quote';
    const items = Array.isArray(row.line_items) ? row.line_items : [];
    const lines = items.length ? items.map((item: Row, index: number) => '<tr><td>' + (index + 1) + '</td><td>' + esc(item.description || item.name || item.service || 'خدمة') + '</td><td>' + esc(item.quantity ?? 1) + '</td><td>' + esc(item.unit_price ?? item.price ?? '—') + '</td><td>' + esc(item.total ?? (Number(item.quantity ?? 1) * Number(item.unit_price ?? item.price ?? 0))) + '</td></tr>').join('') : '<tr><td colspan="5">تفاصيل البنود غير مدخلة في السجل القديم.</td></tr>';
    const signBlock = signed
      ? '<section class="signature"><div><b>الموقّع:</b> ' + esc(signed.signer_name) + '<br><b>الصفة:</b> ' + esc(signed.signer_title) + '<br><b>الطرف:</b> ' + (signed.signer_party === 'customer' ? 'العميل' : 'رواج') + '<br><b>تاريخ التوقيع:</b> ' + esc(new Date(signed.signed_at).toLocaleString('ar-YE')) + '</div><img alt="التوقيع" src="' + signed.signature_data_url + '"></section>'
      : '<section class="signature"><b>التوقيع والاعتماد</b><div class="line"></div></section>';
    const w = window.open('', '_blank');
    if (!w) { setError('تعذر فتح نافذة الطباعة. اسمح بالنوافذ المنبثقة لهذا الموقع ثم أعد المحاولة.'); return; }
    w.document.write('<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>' + esc(ref) + '</title><style>@page{size:A4;margin:16mm}*{box-sizing:border-box}body{font-family:Arial,Tahoma,sans-serif;color:#24201e;font-size:12px;line-height:1.7}header{display:flex;justify-content:space-between;border-bottom:3px solid #b9142d;padding-bottom:14px}.brand{font-size:27px;font-weight:900;color:#b9142d}.muted{color:#777;font-size:11px}.title{font-size:21px;font-weight:800;margin:20px 0}.grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:16px 0}.box{border:1px solid #ddd;border-radius:8px;padding:12px}table{width:100%;border-collapse:collapse;margin:18px 0}th{background:#f6f2ef}td,th{border:1px solid #ddd;padding:9px;text-align:right}.totals{width:280px;margin-right:auto}.total{font-size:17px;font-weight:900;color:#b9142d}.terms{white-space:pre-wrap;margin-top:18px}.signature{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;margin-top:34px;padding-top:16px;border-top:1px solid #ddd;min-height:100px}.signature img{max-width:230px;max-height:85px;object-fit:contain}.line{width:220px;border-bottom:1px solid #555;height:50px}footer{margin-top:32px;padding-top:10px;border-top:1px solid #ddd;color:#777;font-size:10px}</style></head><body><header><div><div class="brand">رواج</div><div class="muted">للطباعة والإعلان والديكور</div></div><div><b>' + (isQuote ? 'عرض سعر رسمي' : 'فاتورة رسمية') + '</b><br>المرجع: ' + esc(ref) + '<br><span class="muted">التاريخ: ' + esc(dateLabel(isQuote ? row.created_at : row.issued_at || row.created_at)) + '</span></div></header><div class="grid"><div class="box"><b>بيانات العميل</b><br>' + esc(customer?.company_name || customer?.name || '—') + '<br>' + esc(customer?.name || '') + '<br>' + esc(customer?.phone || '') + '<br>' + esc(customer?.email || '') + '<br>' + esc(customer?.address || '') + '</div><div class="box"><b>بيانات المستند</b><br>الحالة: ' + esc(row.status || '—') + '<br>العملة: ' + esc(row.currency || 'YER') + '<br>' + (isQuote ? 'صالح حتى: ' + esc(dateLabel(row.valid_until)) : 'الاستحقاق: ' + esc(dateLabel(row.due_date))) + '</div></div><div class="title">' + (isQuote ? 'تفاصيل عرض السعر' : 'تفاصيل الفاتورة') + '</div><table><thead><tr><th>#</th><th>وصف الخدمة</th><th>الكمية</th><th>سعر الوحدة</th><th>الإجمالي</th></tr></thead><tbody>' + lines + '</tbody></table><table class="totals"><tbody><tr><td>قبل الخصم</td><td>' + esc(money(row.subtotal)) + '</td></tr><tr><td>الخصم</td><td>' + esc(money(row.discount)) + '</td></tr><tr><td>الضريبة / الرسوم</td><td>' + esc(money(row.tax)) + '</td></tr><tr><td class="total">الصافي</td><td class="total">' + esc(money(row.total)) + ' ر.ي</td></tr></tbody></table><div class="terms"><b>' + (isQuote ? 'الشروط والأحكام' : 'ملاحظات الفاتورة') + '</b><br>' + esc(row.terms || row.notes || 'تُعتمد شروط التسليم والدفع كتابةً قبل بدء التنفيذ.') + '</div>' + signBlock + '<footer>تم إنشاء المستند من نظام رواج التشغيلي. احتفظ بالمرجع عند المراسلات والتحصيل.</footer><script>window.onload=function(){window.print()}</script></body></html>');
    w.document.close();
  };

  const saveSignature = async () => {
    if (!selected) return;
    const signerTitle = title === '__custom__' ? customTitle.trim() : title.trim();
    if (!name.trim() || !signerTitle) { setError('أدخل اسم الموقّع وحدد صفته أو اكتب صفة مخصصة.'); return; }
    if (!signature.startsWith('data:image/png;base64,') || signature.length < 500) { setError('التوقيع فارغ أو غير واضح. وقّع داخل مساحة التوقيع أولًا.'); return; }
    setSaving(true); setError(''); setNotice('');
    try {
      const docType = kind;
      const customer = customerFor(selected);
      const snapshot = {
        document_type: docType,
        document_reference: reference(docType, selected),
        customer: customer ? { name: customer.name, company_name: customer.company_name, phone: customer.phone, email: customer.email, address: customer.address } : null,
        document: { ...selected },
        signed_at: new Date().toISOString(),
      };
      const result = await supabase.from('document_signatures' as any).insert({
        document_type: docType,
        quote_id: docType === 'quote' ? selected.id : null,
        invoice_id: docType === 'invoice' ? selected.id : null,
        signer_name: name.trim(),
        signer_title: signerTitle,
        signer_party: party,
        signature_data_url: signature,
        document_snapshot: snapshot,
      }).select('*').single();
      if (result.error) throw result.error;
      if (docType === 'quote' && party === 'customer' && !['approved', 'converted'].includes(selected.status)) {
        const updated = await supabase.from('commercial_quotes' as any).update({ status: 'approved', approved_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq('id', selected.id);
        if (updated.error) throw updated.error;
      }
      if (docType === 'invoice' && party === 'rawaj' && selected.status === 'draft') {
        const updated = await supabase.from('invoices' as any).update({ status: 'issued', issued_at: new Date().toISOString() }).eq('id', selected.id);
        if (updated.error) throw updated.error;
      }
      setNotice('حُفظ التوقيع ونسخة بيانات المستند وقت الاعتماد في الأرشيف. يمكنك طباعة المستند أو حفظه PDF.');
      setSelected(null);
      setSignature('');
      await load();
    } catch (e: any) {
      setError(e?.message || 'تعذر حفظ التوقيع؛ لم يتم تأكيد الاعتماد.');
    } finally { setSaving(false); }
  };

  const allRows = filtered;
  return <div dir="rtl" className="space-y-5 pb-10 text-right">
    <div className="flex flex-col gap-4 rounded-3xl bg-gradient-to-l from-[#5B0715] via-[#8E1025] to-[#B9142D] p-6 text-white sm:flex-row sm:items-center sm:justify-between">
      <div><div className="text-[10px] font-bold tracking-widest text-white/70">RAWAJ DOCUMENT CONTROL</div><h2 className="mt-2 text-2xl font-black">المستندات الرسمية والتوقيعات</h2><p className="mt-2 max-w-2xl text-xs leading-6 text-white/80">توقيع باللمس أو القلم، توثيق اسم الموقّع وصفته، حفظ نسخة ثابتة من بيانات المستند، ثم الطباعة أو الحفظ بصيغة PDF من نافذة الطباعة.</p></div>
      <button type="button" onClick={() => void load()} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-xs font-bold"><RefreshCw size={15}/> تحديث الأرشيف</button>
    </div>
    {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-800">{error}</div>}
    {notice && <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">{notice}</div>}
    <section className={panel}>
      <div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="font-black">عروض الأسعار والفواتير</h3><p className="mt-1 text-xs text-stone-500">ابحث بالمرجع أو اسم العميل أو الهاتف. كل توقيع جديد ينشئ سجلًا إضافيًا غير قابل للتعديل أو الحذف من الواجهة.</p></div><div className="flex flex-wrap gap-2"><button type="button" onClick={() => setKind('quote')} className={'rounded-xl px-4 py-2 text-xs font-bold ' + (kind === 'quote' ? 'bg-[#B9142D] text-white' : 'border border-stone-300 dark:border-stone-700')}>عروض الأسعار ({quotes.length})</button><button type="button" onClick={() => setKind('invoice')} className={'rounded-xl px-4 py-2 text-xs font-bold ' + (kind === 'invoice' ? 'bg-[#B9142D] text-white' : 'border border-stone-300 dark:border-stone-700')}>الفواتير ({invoices.length})</button></div></div>
      <input className={input + ' mt-4'} value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="بحث سريع بالمرجع أو العميل أو رقم الهاتف..." />
      {loading ? <div className="py-10 text-center text-sm text-stone-500">جارٍ تحميل الأرشيف...</div> : <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[780px] text-right text-xs"><thead className="bg-stone-50 dark:bg-stone-900"><tr>{['المرجع','العميل','الإجمالي','الحالة','التوقيعات المحفوظة','الإجراءات'].map((h)=><th key={h} className="p-3">{h}</th>)}</tr></thead><tbody>{allRows.map((row)=>{const customer=customerFor(row);const id=kind==='quote'?row.id:row.id;const signed=linkedSignatures.filter((sig)=>kind==='quote'?sig.quote_id===id:sig.invoice_id===id);return <tr key={row.id} className="border-t border-stone-100 dark:border-stone-800"><td className="p-3 font-bold">{reference(kind,row)}</td><td className="p-3">{customer?.company_name||customer?.name||'—'}<div className="mt-1 text-stone-500">{customer?.phone||''}</div></td><td className="p-3 font-bold">{money(row.total)} ر.ي</td><td className="p-3">{row.status||'—'}</td><td className="p-3">{signed.length ? <div className="space-y-1">{signed.slice(0,2).map((sig)=><div key={sig.id} className="text-[10px]"><span className="font-bold">{sig.signer_name}</span> · {sig.signer_title}<div className="text-stone-500">{dateLabel(sig.signed_at)} · {sig.signer_party==='customer'?'العميل':'رواج'}</div><button type="button" onClick={()=>printDocument(kind,row,sig)} className="mt-1 inline-flex items-center gap-1 text-[#B9142D]"><Printer size={12}/> طباعة النسخة الموقعة</button></div>)}</div> : <span className="text-stone-400">لا يوجد توقيع</span>}</td><td className="p-3"><div className="flex min-w-32 flex-col gap-2"><button type="button" onClick={()=>openSign(kind,row)} className="inline-flex items-center justify-center gap-1 rounded-lg bg-[#B9142D] px-3 py-2 font-bold text-white"><Signature size={13}/> توقيع / اعتماد</button><button type="button" onClick={()=>printDocument(kind,row,null)} className="inline-flex items-center justify-center gap-1 rounded-lg border border-stone-300 px-3 py-2 font-bold dark:border-stone-700"><FileText size={13}/> طباعة / حفظ PDF</button></div></td></tr>})}{allRows.length===0&&<tr><td colSpan={6} className="p-8 text-center text-stone-500">لا توجد مستندات مطابقة للبحث.</td></tr>}</tbody></table></div>}
    </section>
    <section className={panel}><div className="flex items-center gap-2"><ShieldCheck className="text-[#B9142D]" size={18}/><h3 className="font-black">ضوابط الاعتماد</h3></div><ul className="mt-3 list-disc space-y-2 pr-5 text-xs leading-6 text-stone-600 dark:text-stone-300"><li>يمكن إدخال اسم الموقّع يدويًا واختيار الصفة من قائمة أو كتابة صفة مخصصة.</li><li>اعتماد العميل لعرض السعر يحدّث حالة العرض إلى «معتمد»؛ توقيع رواج على مسودة فاتورة يصدرها.</li><li>السجل يحتفظ بصورة التوقيع ونسخة JSON من بيانات المستند وقت التوقيع؛ التوقيعات لا تُعدّل أو تُحذف عبر الواجهة.</li><li>التوقيع المرئي هنا ليس شهادة توقيع رقمي مؤهلة ولا يثبت هوية الشخص بذاته؛ لا يُنسب التوقيع إلى طرف ما إلا بعد توقيعه فعليًا.</li></ul></section>
    {selected && <div className="fixed inset-0 z-[10020] flex items-center justify-center overflow-y-auto bg-black/60 p-3 sm:p-5" role="dialog" aria-modal="true" aria-label="توقيع مستند رسمي"><div className="my-5 max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-[#FAF8F5] p-5 shadow-2xl dark:bg-[#171514]"><div className="flex items-start justify-between gap-3"><div><div className="text-[10px] font-bold tracking-widest text-[#B9142D]">RAWAJ DOCUMENT CONTROL</div><h3 className="mt-1 text-lg font-black">{kind==='quote'?'اعتماد وتوقيع عرض السعر':'اعتماد وتوقيع الفاتورة'}</h3><p className="mt-1 text-xs text-stone-500">{reference(kind,selected)} · {customerFor(selected)?.company_name||customerFor(selected)?.name||'عميل'} · {money(selected.total)} ر.ي</p></div><button type="button" onClick={()=>setSelected(null)} className="rounded-lg px-3 py-1 text-xl">×</button></div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2"><label className="space-y-1.5 text-xs font-bold"><span>اسم الموقّع</span><input className={input} value={name} onChange={(e)=>setName(e.target.value)} placeholder="الاسم الكامل" /></label><label className="space-y-1.5 text-xs font-bold"><span>الصفة</span><select className={input} value={title} onChange={(e)=>setTitle(e.target.value)}><option value="">اختر الصفة</option><option value="المالك / المدير العام">المالك / المدير العام</option><option value="مدير العمليات">مدير العمليات</option><option value="مدير المبيعات">مدير المبيعات</option><option value="المحاسب">المحاسب</option><option value="المفوض بالتوقيع">المفوض بالتوقيع</option><option value="ممثل الشركة">ممثل الشركة</option><option value="العميل">العميل</option><option value="__custom__">صفة أخرى — كتابة يدوية</option></select>{title==='__custom__'&&<input className={input} value={customTitle} onChange={(e)=>setCustomTitle(e.target.value)} placeholder="اكتب الصفة الوظيفية"/>}</label><label className="space-y-1.5 text-xs font-bold"><span>الطرف الذي يمثله التوقيع</span><select className={input} value={party} onChange={(e)=>setParty(e.target.value as 'customer'|'rawaj')}><option value="customer">العميل / ممثل العميل</option><option value="rawaj">رواج / ممثل رواج</option></select></label><div className="rounded-xl bg-stone-100 p-3 text-xs leading-6 text-stone-600 dark:bg-stone-900 dark:text-stone-300">لا تُسجّل اعتمادًا باسم الطرف الآخر إلا إذا كان هو من وقّع فعليًا على هذا الجهاز.</div></div>
      <div className="mt-4"><div className="mb-2 text-xs font-black">التوقيع باللمس أو القلم</div><SignaturePad value={signature} onChange={setSignature} disabled={saving}/></div>
      {error&&<div className="mt-3 rounded-xl bg-red-50 p-3 text-xs text-red-800">{error}</div>}
      <div className="mt-5 flex flex-wrap justify-end gap-2"><button type="button" onClick={()=>printDocument(kind,selected,null)} className="rounded-xl border border-stone-300 px-4 py-2.5 text-xs font-bold dark:border-stone-700">طباعة / حفظ PDF</button><button type="button" onClick={()=>setSelected(null)} className="rounded-xl border border-stone-300 px-4 py-2.5 text-xs font-bold dark:border-stone-700">إلغاء</button><button type="button" disabled={saving||!signature} onClick={()=>void saveSignature()} className="rounded-xl bg-[#B9142D] px-5 py-2.5 text-xs font-black text-white disabled:opacity-50">{saving?'جارٍ حفظ التوقيع...':'حفظ التوقيع والأرشفة'}</button></div>
      <p className="mt-3 text-[10px] leading-5 text-stone-500">الحفظ يسجل التوقيع المرئي وبيانات الموقّع ونسخة المستند وقت الاعتماد. هذا ليس بديلًا عن التحقق المستقل من الهوية أو التوقيع الرقمي المعتمد قانونيًا.</p>
    </div></div>}
  </div>;
};
