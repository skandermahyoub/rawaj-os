import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ExternalLink,
  Filter
} from 'lucide-react';

export const AdminContactInboxManager: React.FC = () => {
  const { contactMessages, markContactMessageStatus, deleteContactMessage } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredMessages = contactMessages.filter((m) => {
    if (filterStatus === 'all') return true;
    return m.status === filterStatus;
  });

  const unreadCount = contactMessages.filter((m) => m.status === 'unread').length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#171616] via-[#241F1E] to-[#171616] text-white border border-[#3E3836] shadow-xl flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B9142D]/20 text-[#E03A53] border border-[#B9142D]/40 text-xs font-bold mb-3">
            <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>صندوق البريد الداخلي واستفسارات العملاء</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-black text-white">
            الرسائل والاستفسارات الواردة من موديول تواصل معنا
          </h2>
          <p className="text-xs sm:text-sm text-[#CDC4B7] mt-1">
            متابعة الرسائل المباشرة المرسلة من زوار وعملاء المنشأة مع إمكانية الرد الفوري المباشر عبر واتساب.
          </p>
        </div>

        {unreadCount > 0 && (
          <div className="px-4 py-2 rounded-xl bg-[#B9142D] text-white font-bold text-xs flex items-center gap-2 shadow-md animate-pulse">
            <span>{unreadCount} رسائل غير مقروءة</span>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
            filterStatus === 'all'
              ? 'bg-[#B9142D] text-white shadow-xs'
              : 'bg-white dark:bg-[#201D1C] text-[#746E67] border border-[#EBE4D5] dark:border-[#352F2D]'
          }`}
        >
          كافة الرسائل ({contactMessages.length})
        </button>
        <button
          onClick={() => setFilterStatus('unread')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
            filterStatus === 'unread'
              ? 'bg-[#B9142D] text-white shadow-xs'
              : 'bg-white dark:bg-[#201D1C] text-[#746E67] border border-[#EBE4D5] dark:border-[#352F2D]'
          }`}
        >
          غير المقروءة ({unreadCount})
        </button>
        <button
          onClick={() => setFilterStatus('read')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
            filterStatus === 'read'
              ? 'bg-[#B9142D] text-white shadow-xs'
              : 'bg-white dark:bg-[#201D1C] text-[#746E67] border border-[#EBE4D5] dark:border-[#352F2D]'
          }`}
        >
          المقروءة ({contactMessages.filter(m => m.status === 'read').length})
        </button>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-[#1E1B1A] rounded-2xl border border-[#EBE4D5] dark:border-[#2E2A28] text-xs text-[#746E67]">
            لا توجد رسائل واردة حالياً في هذا القسم.
          </div>
        ) : (
          filteredMessages.map((msg) => {
            const cleanPhone = msg.phone.replace(/[^0-9]/g, '');
            const isUnread = msg.status === 'unread';

            return (
              <div
                key={msg.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isUnread
                    ? 'bg-white dark:bg-[#23201F] border-[#B9142D]/40 shadow-sm ring-1 ring-[#B9142D]/20'
                    : 'bg-[#FFFDF9] dark:bg-[#1E1B1A] border-[#EBE4D5] dark:border-[#2E2A28]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0EBE0] dark:border-[#2E2A28] pb-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-[#B9142D]/10 text-[#B9142D] font-bold text-xs flex items-center justify-center">
                      {msg.name.slice(0, 2)}
                    </span>
                    <div>
                      <h4 className="font-heading font-black text-xs sm:text-sm text-[#171616] dark:text-[#F5F1EA]">
                        {msg.name}
                      </h4>
                      <span className="text-[11px] text-[#746E67] dark:text-[#A0988F] font-mono" dir="ltr">
                        {msg.phone} {msg.email && `• ${msg.email}`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#746E67] dark:text-[#A0988F] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{new Date(msg.created_at).toLocaleDateString('ar-YE', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                    </span>
                    
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#D4AF37]/15 text-[#8A6715] dark:text-[#E0B245]">
                      {msg.service_interest || 'استفسار عام'}
                    </span>
                  </div>
                </div>

                {/* Message Body */}
                <p className="text-xs sm:text-sm text-[#3E3A36] dark:text-[#D5CFC7] leading-relaxed mb-4 bg-[#FBF9F5] dark:bg-[#181615] p-3.5 rounded-xl border border-[#F0EBE0] dark:border-[#282322]">
                  {msg.message}
                </p>

                {/* Actions Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/967${cleanPhone.replace(/^0+/, '')}?text=${encodeURIComponent(`مرحباً ${msg.name}، نتواصل معك من وكالة رواج للطباعة بخصوص استفسارك.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>رد فوري عبر واتساب</span>
                    </a>

                    <a
                      href={`tel:${msg.phone}`}
                      className="px-3.5 py-1.5 rounded-xl bg-[#F5F1E9] dark:bg-[#252220] hover:bg-[#EBE3D3] text-[#171616] dark:text-white font-bold text-xs border border-[#DCD5C5] dark:border-[#383331] flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#B9142D]" />
                      <span>اتصال مباشر</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    {isUnread ? (
                      <button
                        onClick={() => markContactMessageStatus(msg.id, 'read')}
                        className="text-xs text-[#746E67] hover:text-[#171616] font-bold"
                      >
                        تحديد كمقروء
                      </button>
                    ) : (
                      <button
                        onClick={() => markContactMessageStatus(msg.id, 'unread')}
                        className="text-xs text-[#746E67] hover:text-[#B9142D] font-bold"
                      >
                        تحديد كغير مقروء
                      </button>
                    )}

                    <button
                      onClick={() => {
                        if (confirm('هل أنت متأكد من حذف هذه الرسالة؟')) {
                          deleteContactMessage(msg.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                      title="حذف الرسالة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
