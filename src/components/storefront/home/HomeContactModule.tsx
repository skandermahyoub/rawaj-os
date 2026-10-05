import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { 
  Phone, 
  Mail, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const HomeContactModule: React.FC = () => {
  const { siteSettings, footerSettings, submitContactMessage } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceInterest, setServiceInterest] = useState('طباعة تجارية وتغليف');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    setSubmitError('');
    setIsSubmitting(true);
    try {
      await submitContactMessage({
        name,
        phone,
        email,
        service_interest: serviceInterest,
        message,
      });

      setIsSubmitted(true);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
      setTimeout(() => setIsSubmitted(false), 6000);
    } catch (error: any) {
      setSubmitError(error?.message || 'تعذر إرسال الرسالة. حاول مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappNumber = siteSettings.mobile_whatsapp || footerSettings.mobile_whatsapp || '';
  const cleanWhatsapp = whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      
      {/* 2-Column Grid: Contact Channels + Interactive Message Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Right Column: Direct Quick Contact Channels */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#201D1C] border border-[#EBE4D5] dark:border-[#352F2D] shadow-xs space-y-4">
            <h4 className="font-heading font-black text-sm sm:text-base text-[#171616] dark:text-[#F5F1EA] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B9142D]" />
              <span>قنوات التواصل والخدمة المباشرة</span>
            </h4>

            {/* Direct WhatsApp Business */}
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent('مرحباً وكالة رواج، أود الاستفسار عن خدمات الطباعة والإنتاج.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-bold text-xs sm:text-sm transition-all group"
            >
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                  <MessageSquare className="w-4 h-4" />
                </span>
                <div>
                  <span className="block leading-tight">واتساب الأعمال المباشر</span>
                  <span className="text-[11px] font-normal text-emerald-600 dark:text-emerald-400">رد فوري واستشارات فنية</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-emerald-600 group-hover:translate-x-[-2px] transition-transform" />
            </a>

            {/* Direct Phone Call */}
            <a
              href={`tel:${siteSettings.phone || footerSettings.phone || ''}`}
              className="flex items-center justify-between p-3.5 rounded-xl bg-brand-primary-10 hover:bg-brand-primary-15 border border-brand-primary/30 text-[#171616] dark:text-white font-bold text-xs sm:text-sm transition-all group"
            >
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-brand-primary text-white flex items-center justify-center shadow-xs">
                  <Phone className="w-4 h-4" />
                </span>
                <div>
                  <span className="block leading-tight">الهاتف الموحد للإدارة</span>
                  <span className="text-[11px] font-normal text-brand-primary font-mono" dir="ltr">{siteSettings.phone || footerSettings.phone || 'غير محدد'}</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-brand-primary group-hover:translate-x-[-2px] transition-transform" />
            </a>

            {/* Official Email */}
            <a
              href={`mailto:${siteSettings.email || 'info@rawaj.com'}`}
              className="flex items-center justify-between p-3.5 rounded-xl bg-brand-accent-10 hover:bg-brand-accent-15 border border-brand-accent/30 text-[#171616] dark:text-white font-bold text-xs sm:text-sm transition-all group"
            >
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-brand-accent text-white flex items-center justify-center shadow-xs">
                  <Mail className="w-4 h-4" />
                </span>
                <div>
                  <span className="block leading-tight">البريد الإلكتروني للشركات</span>
                  <span className="text-[11px] font-normal text-brand-accent">{siteSettings.email || 'info@rawaj.com'}</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-brand-accent group-hover:translate-x-[-2px] transition-transform" />
            </a>

            {/* Facebook Messenger */}
            {footerSettings.social_links?.facebook && (
              <a
                href={footerSettings.social_links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-700 dark:text-sky-300 font-bold text-xs sm:text-sm transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-sky-600 text-white flex items-center justify-center shadow-xs">
                    <MessageSquare className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="block leading-tight">ماسنجر فيسبوك</span>
                    <span className="text-[11px] font-normal text-sky-600 dark:text-sky-400">صفحة رواج الرسمية</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-sky-600 group-hover:translate-x-[-2px] transition-transform" />
              </a>
            )}

            {/* Working Hours & Branches Info */}
            <div className="pt-3 border-t border-[#EBE4D5] dark:border-[#352F2D] space-y-2 text-xs text-[#746E67] dark:text-[#A0988F]">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                <span>أوقات العمل: السبت - الخميس: 8:00 صباحاً - 8:00 مساءً</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                <span>{siteSettings.address_ar || 'صنعاء - شارع الزبيري - المركز الرئيسي'}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Left Column: Direct Interactive Message Form to Internal Inbox */}
        <div className="lg:col-span-7">
          <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#201D1C] border border-[#EBE4D5] dark:border-[#352F2D] shadow-md space-y-5">
            <div>
              <h4 className="font-heading font-black text-sm sm:text-base md:text-lg text-[#171616] dark:text-[#F5F1EA]">
                أرسل رسالة فورية إلى الإدارة والإنتاج
              </h4>
              <p className="text-xs sm:text-sm text-[#746E67] dark:text-[#A0988F] mt-0.5">
                تصل رسالتك مباشرة إلى صندوق البريد الداخلي لإدارة رواج ويتم الرد عليك خلال أقل من ساعة.
              </p>
            </div>

            {submitError && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300 text-xs sm:text-sm">
                {submitError}
              </div>
            )}

            {isSubmitted && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm flex items-center gap-3 animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>تم إرسال رسالتك بنجاح! سيقوم مستشار رواج بالتواصل معك على رقم هاتفك فوراً.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">
                    الاسم الكريم *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: م. أحمد الحميري"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs sm:text-sm focus:outline-hidden focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">
                    رقم الهاتف / الواتساب *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="مثال: 771234567"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs sm:text-sm focus:outline-hidden focus:border-brand-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">
                    البريد الإلكتروني (اختياري)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs sm:text-sm focus:outline-hidden focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">
                    الخدمة أو القسم المطلوب
                  </label>
                  <select
                    value={serviceInterest}
                    onChange={(e) => setServiceInterest(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs sm:text-sm focus:outline-hidden focus:border-brand-primary"
                  >
                    <option value="طباعة تجارية وتغليف">طباعة أوفست وتغليف وعلب</option>
                    <option value="ملصقات وليبل رول">ملصقات وليبل رول للمنتجات</option>
                    <option value="واجهات كلادينج وحروف مضيئة">واجهات كلادينج وحروف مضيئة</option>
                    <option value="طباعة ملابس وتطريز">يونيفورم وملابس وتطريز آلي</option>
                    <option value="هدايا ومؤتمرات">هدايا دعائية ومطبوعات مؤتمرات</option>
                    <option value="استشارة فنية وزيارة ميدانية">استشارة فنية وزيارة ميدانية</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#423E3A] dark:text-[#C5BCB1] mb-1">
                  تفاصيل الاستفسار أو المواصفات *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="اكتب هنا تفاصيل طلبك، الكميات التقريبية، أو مواعيد التدشين المطلوبة..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD5C5] dark:border-[#3A3533] bg-[#FCFAF5] dark:bg-[#1A1817] text-xs sm:text-sm focus:outline-hidden focus:border-brand-primary resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-brand-primary hover:bg-brand-hover text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>إرسال الرسالة إلى بريد الإدارة الداخلي</span>
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
};
