import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  User, 
  FileText, 
  ArrowLeft,
  Printer,
  ChevronDown,
  X,
  ExternalLink
} from 'lucide-react';
import { QuoteRequest, QuoteStatus } from '../../types';

export const AdminQuotesList: React.FC = () => {
  const { quoteRequests, updateQuoteStatus, assignQuoteSalesperson, updateQuoteNotes, users, siteSettings, currentUser } = useApp();
  const canEditQuotes = ['owner', 'admin', 'sales'].includes(currentUser.role);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);

  // Notes state inside drawer
  const [internalNotesInput, setInternalNotesInput] = useState('');
  const [supplierNotesInput, setSupplierNotesInput] = useState('');
  const [actionError, setActionError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const filteredQuotes = quoteRequests.filter((q) => {
    if (statusFilter !== 'all' && q.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      const text = `${q.reference_number} ${q.customer.name} ${q.customer.company || ''} ${q.customer.mobile} ${q.customer.city}`.toLowerCase();
      if (!text.includes(query)) return false;
    }
    return true;
  });

  const handleOpenQuote = (quote: QuoteRequest) => {
    setSelectedQuote(quote);
    setInternalNotesInput(quote.internal_notes || '');
    setSupplierNotesInput(quote.supplier_notes || '');
  };

  const handleSaveNotes = async () => {
    if (!selectedQuote || !canEditQuotes) return;
    setActionError('');
    setIsSaving(true);
    try {
      await updateQuoteNotes(selectedQuote.id, internalNotesInput, supplierNotesInput);
      setSelectedQuote((prev) => prev ? { ...prev, internal_notes: internalNotesInput, supplier_notes: supplierNotesInput } : null);
    } catch (error: any) {
      setActionError(error?.message || 'تعذر حفظ الملاحظات.');
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusBadge = (status: QuoteStatus) => {
    switch (status) {
      case 'new':
        return <span className="bg-brand-primary-10 text-brand-primary text-[10px] font-bold px-2 py-0.5 rounded border border-brand-primary/20">طلب جديد</span>;
      case 'reviewing':
        return <span className="bg-[#FAF7F2] dark:bg-[#252222] text-[#57534E] dark:text-[#A8A29E] text-[10px] font-bold px-2 py-0.5 rounded border border-[#E7E0D3] dark:border-[#332F2F]">قيد المراجعة</span>;
      case 'need_more_info':
        return <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/20">يحتاج تفاصيل</span>;
      case 'pricing':
        return <span className="bg-brand-primary-15 text-brand-primary text-[10px] font-bold px-2 py-0.5 rounded border border-brand-primary/30">قيد التسعير والتوريد</span>;
      case 'sent':
        return <span className="bg-[#FAF7F2] dark:bg-[#252222] text-[#171616] dark:text-white text-[10px] font-bold px-2 py-0.5 rounded border border-[#E7E0D3] dark:border-[#332F2F]">تم الإرسال للعميل</span>;
      case 'negotiation':
        return <span className="bg-brand-accent-10 text-brand-accent text-[10px] font-bold px-2 py-0.5 rounded border border-brand-accent/20">قيد التفاوض</span>;
      case 'won':
        return <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/20">تم التعاقد (ناجح)</span>;
      case 'lost':
        return <span className="bg-red-500/10 text-red-600 dark:text-red-400 text-[10px] font-bold px-2 py-0.5 rounded border border-red-500/20">لم يتم الاتفاق</span>;
      case 'archived':
        return <span className="bg-[#FAF7F2] dark:bg-[#252222] text-[#78716C] dark:text-[#A8A29E] text-[10px] font-bold px-2 py-0.5 rounded">مؤرشف</span>;
    }
  };

  return (
    <div className="space-y-6 text-right pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FFFDFA] dark:bg-[#1C1A1A] p-4 rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F]">
        <div>
          <h1 className="font-heading font-extrabold text-base sm:text-lg text-[#171616] dark:text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#B9142D]" />
            <span>إدارة طلبات عروض الأسعار (Quote Requests)</span>
          </h1>
          <p className="text-xs text-[#78716C] dark:text-[#A8A29E]">
            متابعة الطلبات، تحديث حالات التسعير، إسناد المسؤولين، وتوثيق ملاحظات التوريد
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-[#FFFDFA] dark:bg-[#1C1A1A] p-3.5 rounded-xl border border-[#E7E0D3] dark:border-[#332F2F] flex flex-wrap gap-2.5 items-center justify-between">
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="w-3.5 h-3.5 text-[#78716C] absolute right-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث برقم الطلب، اسم العميل، الجوال، أو المدينة..."
              className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded-lg pr-8 pl-3 py-1.5 text-xs text-[#171616] dark:text-white focus:outline-hidden focus:border-[#B9142D]"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#3A3535] rounded-lg px-2.5 py-1.5 text-xs text-[#171616] dark:text-white focus:outline-hidden"
          >
            <option value="all">جميع الحالات ({quoteRequests.length})</option>
            <option value="new">طلبات جديدة</option>
            <option value="reviewing">قيد المراجعة</option>
            <option value="need_more_info">بانتظار تفاصيل العميل</option>
            <option value="pricing">قيد التسعير والتوريد</option>
            <option value="sent">تم الإرسال للعميل</option>
            <option value="negotiation">قيد التفاوض</option>
            <option value="won">معتمدة (ناجحة)</option>
            <option value="lost">لم يتم الاتفاق</option>
            <option value="archived">مؤرشفة</option>
          </select>
        </div>
      </div>

      {/* Quotes Table */}
      <div className="bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] overflow-hidden shadow-xs">
        {filteredQuotes.length === 0 ? (
          <div className="text-center py-12 text-xs text-[#78716C]">
            لا توجد طلبات مطابقة لمعايير البحث الحالية.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right">
              <thead>
                <tr className="bg-[#FAF7F2] dark:bg-[#221F1F] border-b border-[#E7E0D3] dark:border-[#332F2F] text-[#78716C] dark:text-[#A8A29E]">
                  <th className="p-3 font-bold">رقم الطلب</th>
                  <th className="p-3 font-bold">العميل / المنشأة</th>
                  <th className="p-3 font-bold">التواصل والمدينة</th>
                  <th className="p-3 font-bold">البنود المطلوبة</th>
                  <th className="p-3 font-bold">المسؤول</th>
                  <th className="p-3 font-bold">الحالة</th>
                  <th className="p-3 font-bold">التاريخ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F1E9] dark:divide-[#252222]">
                {filteredQuotes.map((q) => {
                  const sp = users.find((u) => u.id === q.assigned_to);
                  return (
                    <tr
                      key={q.id}
                      onClick={() => handleOpenQuote(q)}
                      className="hover:bg-[#FAF7F2] dark:hover:bg-[#252222]/50 cursor-pointer transition-colors"
                    >
                      <td className="p-3 font-mono font-bold text-[#B9142D]">{q.reference_number}</td>
                      <td className="p-3 font-bold text-[#171616] dark:text-white">
                        {q.customer.name}
                        {q.customer.company && (
                          <span className="block text-[10px] text-[#78716C] font-normal">{q.customer.company}</span>
                        )}
                      </td>
                      <td className="p-3 text-[#57534E] dark:text-[#D6D3D1]">
                        <div className="font-mono">{q.customer.whatsapp || q.customer.mobile}</div>
                        <div className="text-[10px] text-[#78716C]">{q.customer.city}</div>
                      </td>
                      <td className="p-3">
                        <span className="bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#332F2F] px-2 py-0.5 rounded text-[11px] font-bold">
                          {q.items.length} بنود
                        </span>
                      </td>
                      <td className="p-3 text-[#78716C]">
                        {sp ? sp.name : 'غير مسند'}
                      </td>
                      <td className="p-3">{getStatusBadge(q.status)}</td>
                      <td className="p-3 text-[#78716C]">{q.created_at.slice(0, 10)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quote Details Modal / Drawer */}
      {selectedQuote && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs"
          onClick={() => setSelectedQuote(null)}
        >
          <div
            className="w-full max-w-3xl bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl shadow-2xl border border-[#E7E0D3] dark:border-[#332F2F] p-5 sm:p-6 space-y-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-[#E7E0D3] dark:border-[#332F2F]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-[#B9142D]">
                    {selectedQuote.reference_number}
                  </span>
                  {getStatusBadge(selectedQuote.status)}
                </div>
                <h3 className="font-heading font-bold text-base text-[#171616] dark:text-white mt-1">
                  طلب العميل: {selectedQuote.customer.name} {selectedQuote.customer.company && `(${selectedQuote.customer.company})`}
                </h3>
              </div>

              <button
                onClick={() => setSelectedQuote(null)}
                className="p-1 text-[#78716C] hover:text-[#171616] dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {actionError && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs font-bold">
                {actionError}
              </div>
            )}

            {/* Quick Status & Assign Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#FAF7F2] dark:bg-[#221F1F] p-3 rounded-xl border border-[#E7E0D3] dark:border-[#332F2F] text-xs">
              <div className="space-y-1">
                <label className="font-bold">تغيير حالة الطلب:</label>
                <select
                  value={selectedQuote.status}
                  disabled={!canEditQuotes}
                  onChange={(e) => {
                    const newSt = e.target.value as QuoteStatus;
                    void (async () => {
                      setActionError('');
                      try {
                        await updateQuoteStatus(selectedQuote.id, newSt);
                        setSelectedQuote((prev) => prev ? { ...prev, status: newSt } : null);
                      } catch (error: any) {
                        setActionError(error?.message || 'تعذر تحديث حالة الطلب.');
                      }
                    })();
                  }}
                  className="w-full bg-white dark:bg-[#252222] border border-[#E7E0D3] rounded px-2.5 py-1.5 font-bold"
                >
                  <option value="new">طلب جديد</option>
                  <option value="reviewing">قيد المراجعة الفنية</option>
                  <option value="need_more_info">يحتاج تفاصيل إضافية من العميل</option>
                  <option value="pricing">قيد التسعير والتوريد</option>
                  <option value="sent">تم إرسال عرض السعر للعميل</option>
                  <option value="negotiation">قيد التفاوض</option>
                  <option value="won">تم التعاقد والاعتماد (ناجح)</option>
                  <option value="lost">لم يتم الاتفاق</option>
                  <option value="archived">مؤرشف</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold">إسناد لمسؤول مبيعات:</label>
                <select
                  value={selectedQuote.assigned_to || ''}
                  disabled={!canEditQuotes}
                  onChange={(e) => {
                    const nextAssignee = e.target.value;
                    void (async () => {
                      setActionError('');
                      try {
                        await assignQuoteSalesperson(selectedQuote.id, nextAssignee);
                        setSelectedQuote((prev) => prev ? { ...prev, assigned_to: nextAssignee || undefined } : null);
                      } catch (error: any) {
                        setActionError(error?.message || 'تعذر إسناد الطلب.');
                      }
                    })();
                  }}
                  className="w-full bg-white dark:bg-[#252222] border border-[#E7E0D3] rounded px-2.5 py-1.5"
                >
                  <option value="">-- اختر المسؤول --</option>
                  {users
                    .filter((u) => ['owner', 'admin', 'sales'].includes(u.role))
                    .map((u) => (
                      <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                    ))}
                </select>
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-[#FAF7F2] dark:bg-[#221F1F] border border-[#E7E0D3] dark:border-[#332F2F]">
                <div className="text-[#78716C] text-[10px]">الجوال / واتساب:</div>
                <div className="font-bold font-mono">{selectedQuote.customer.whatsapp || selectedQuote.customer.mobile}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FAF7F2] dark:bg-[#221F1F] border border-[#E7E0D3] dark:border-[#332F2F]">
                <div className="text-[#78716C] text-[10px]">المدينة:</div>
                <div className="font-bold">{selectedQuote.customer.city}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FAF7F2] dark:bg-[#221F1F] border border-[#E7E0D3] dark:border-[#332F2F]">
                <div className="text-[#78716C] text-[10px]">الموعد المطلوب:</div>
                <div className="font-bold">{selectedQuote.deadline_date || 'غير محدد'}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FAF7F2] dark:bg-[#221F1F] border border-[#E7E0D3] dark:border-[#332F2F]">
                <div className="text-[#78716C] text-[10px]">تاريخ الإنشاء:</div>
                <div className="font-bold">{selectedQuote.created_at.slice(0, 10)}</div>
              </div>
            </div>

            {/* Items Breakdown */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs text-[#171616] dark:text-white">
                الخدمات والمواصفات الفنية المطلوبة ({selectedQuote.items.length} بنود):
              </h4>

              <div className="space-y-2.5">
                {selectedQuote.items.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#221F1F] border border-[#E7E0D3] dark:border-[#332F2F] space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-sm text-[#171616] dark:text-white">
                        {idx + 1}. {item.service_name_ar}
                      </div>
                      <span className="bg-[#B9142D] text-white font-bold px-2 py-0.5 rounded text-[11px]">
                        الكمية: {item.quantity}
                      </span>
                    </div>

                    {item.specification_summary && item.specification_summary.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] bg-white dark:bg-[#252222] p-2 rounded border border-[#E7E0D3] dark:border-[#332F2F]">
                        {item.specification_summary.map((spec, sIdx) => (
                          <div key={sIdx}>
                            <span className="text-[#78716C]">{spec.label}: </span>
                            <span className="font-semibold text-[#171616] dark:text-white">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {item.custom_notes && (
                      <div className="text-[11px] text-[#78716C]">
                        <strong>ملاحظات العميل:</strong> {item.custom_notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Internal & Supplier Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold">ملاحظات فريق المبيعات الداخلية:</label>
                <textarea
                  rows={2}
                  value={internalNotesInput}
                  readOnly={!canEditQuotes}
                  onChange={(e) => setInternalNotesInput(e.target.value)}
                  placeholder="ملاحظات سرية للإدارة والمبيعات..."
                  className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded p-2"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold">ملاحظات التوريد والموردين (Suppliers):</label>
                <textarea
                  rows={2}
                  value={supplierNotesInput}
                  readOnly={!canEditQuotes}
                  onChange={(e) => setSupplierNotesInput(e.target.value)}
                  placeholder="اسم المورد، تكلفة الخامات، الشحن..."
                  className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded p-2"
                />
              </div>
            </div>

            {/* Save notes & WhatsApp Action */}
            <div className="flex items-center justify-between pt-3 border-t border-[#E7E0D3] dark:border-[#332F2F]">
              {canEditQuotes ? (
                <button
                  type="button"
                  onClick={() => void handleSaveNotes()}
                  disabled={isSaving}
                  className="bg-[#171616] dark:bg-white text-white dark:text-[#171616] text-xs font-bold px-4 py-2 rounded-lg disabled:opacity-50"
                >
                  {isSaving ? 'جارٍ الحفظ...' : 'حفظ الملاحظات'}
                </button>
              ) : (
                <span className="text-[11px] text-[#78716C]">عرض فقط — التعديل متاح للمبيعات والإدارة.</span>
              )}

              <a
                href={`https://wa.me/${selectedQuote.customer.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#25D366] text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>محادثة العميل عبر الواتساب</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
