import { GoogleGenAI } from '@google/genai';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    view?: string;
    serviceId?: string;
  };
}

const SYSTEM_INSTRUCTION = `
أنت "مساعد رواج الذكي" (Rawaj AI Assistant)، الخبير الاستشاري التقني الرائد لمطابع وووكالة "رواج للطباعة والإعلان والتغليف والديكور" في صنعاء، اليمن.
مهمتك تقديم استشارات دقيقة للعملاء حول:
1. أنواع الورق وأوزانه (GSM) والفرق بين السلفنة اللامعة والمطفية المخملية (Soft Touch) والورنيش البارز (Spot UV).
2. تجهيز ملفات الطباعة Prepress (نظام الألوان CMYK، الهامش الآلي Safety Margin، وزيادة القص Bleed).
3. طباعة وتصنيع العلب والتغليف المقوى (Folding Cartons & Rigid Boxes) والتسليم بدقة.
4. تصنيع اللوحات الإعلانية والحروف البارزة المضيئة 3D (Stainless & Acrylic Channel Letters).
5. طباعة الفواتير الكربونية NCR والملصقات بالرول BOPP.

إجاباتك يجب أن تكون باللغة العربية المهنية، واضحة، مختصرة، وتقديم نصائح عملاتية للعميل مع توجيهه لاستخدام سلة الأسعار في المتجر عند الحاجة.
`;

export async function askRawajAi(userMessage: string, history: ChatMessage[] = []): Promise<ChatMessage> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${SYSTEM_INSTRUCTION}\n\nسؤال العميل: ${userMessage}` }] }
        ],
      });

      const aiText = response.text?.trim();
      if (aiText) {
        return {
          id: 'msg-' + Date.now(),
          sender: 'assistant',
          text: aiText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to expert knowledge base:', err);
    }
  }

  // Fallback Rule Engine
  const lower = userMessage.toLowerCase();
  let reply = 'أهلاً بك في مطابع رواج للطباعة والتغليف. أنا هنا لمساعدتك في اختيار أفضل خدمات الطباعة والتصميم وتحديد المواصفات بدقة.';
  let suggestedAction = undefined;

  if (lower.includes('بطاق') || lower.includes('كروت') || lower.includes('business card') || lower.includes('شخصية')) {
    reply = 'بطاقات الأعمال الفاخرة في رواج تُطبع على ورق مقوى فاخر 350 جرام مع خيارات سلفنة سوفت تاتش مخملية وبصمة ذهبية/فضية أو ورنيش بارز Spot UV. هل ترغب في تصفح قسم المطبوعات الورقية أو الانتقال لطلب عرض سعر مباشر؟';
    suggestedAction = { label: 'استعراض بطاقات الأعمال', view: 'services', serviceId: 'srv-bizcards-luxury' };
  } else if (lower.includes('فواتير') || lower.includes('سندات') || lower.includes('ncr') || lower.includes('دفاتر') || lower.includes('قبض')) {
    reply = 'نوفر دفاتر فواتير وسندات كربونية NCR أصلية عالية الحساسية مع ترقيم تسلسلي آلي وتخريم دقيق بدون الحاجة لكربون يدوي. تتوفر بأطقم (نسختين أو 3 نسخ). هل تحب أن أساعدك في تحديد المقاس والكمية؟';
    suggestedAction = { label: 'استعراض دفاتر الفواتير NCR', view: 'services', serviceId: 'srv-ncr-invoices' };
  } else if (lower.includes('علب') || lower.includes('كرتون') || lower.includes('تغليف') || lower.includes('عطور') || lower.includes('مستحضرات')) {
    reply = 'علب المنتجات والعطور ومستحضرات التجميل (Folding Cartons) تُصمم بأحدث قوالب الطي FEFCO وكرتون عاجي FBB صحي ومطابق للمواصفات مع تشطيبات فاخرة. يمكنك طلب نموذج أولي (Mockup) قبل الإنتاج الشامل.';
    suggestedAction = { label: 'استعراض علب التغليف والكرتون', view: 'services', serviceId: 'srv-folding-cartons' };
  } else if (lower.includes('ملصق') || lower.includes('ليبل') || lower.includes('استيكر') || lower.includes('رول') || lower.includes('بلاستيك')) {
    reply = 'ننتج ملصقات رول BOPP (أبيض وشفاف ومعدني) مقاومة للماء والزيوت ومجهزة تماماً لماكينات اللصق الآلي لخطوط الإنتاج والتعبئة.';
    suggestedAction = { label: 'استعراض ملصقات الرول', view: 'services', serviceId: 'srv-roll-labels' };
  } else if (lower.includes('حروف') || lower.includes('لوحات') || lower.includes('مضيء') || lower.includes('3d') || lower.includes('اكريليك')) {
    reply = 'نقوم بتصنيع الحروف البارزة المضيئة 3D (Face-Lit & Halo-Lit) للواجهات والمحلات بأكريليك مصبوب وستانلس ستيل وإضاءة LED مقاومة للأمطار والشمس مع ضمان شامل.';
    suggestedAction = { label: 'استعراض الحروف البارزة للواجهات', view: 'services', serviceId: 'srv-channel-letters' };
  } else if (lower.includes('سعر') || lower.includes('عرض') || lower.includes('تكلفة') || lower.includes('طلب') || lower.includes('أسعار')) {
    reply = 'يمكنك بكل سهولة إضافة أي خدمة إلى "سلة عروض الأسعار" وتحديد المواصفات بدقة (الكمية، المقاس، نوع الورق، والتشطيبات) ليقوم فريق التسعير بإرسال العرض المعتمد لك فوراً.';
    suggestedAction = { label: 'الانتقال لسلة عروض الأسعار', view: 'quote-cart' };
  } else if (lower.includes('مرحبا') || lower.includes('السلام') || lower.includes('أهلاً') || lower.includes('اهلا')) {
    reply = 'أهلاً بك يا سيدي في مطابع رواج للطباعة والتغليف والدعاية والإعلان! كيف يمكنني خدمتك اليوم وتلبية احتياجات مؤسستك؟';
  }

  return {
    id: 'msg-' + Date.now(),
    sender: 'assistant',
    text: reply,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    suggestedAction,
  };
}
