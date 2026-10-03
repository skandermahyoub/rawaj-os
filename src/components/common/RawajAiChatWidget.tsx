import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, MessageSquare, Bot, User, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { askRawajAi, ChatMessage } from '../../services/rawajAiChatService';
import { useApp } from '../../context/AppContext';

export const RawajAiChatWidget: React.FC = () => {
  const { navigate } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: 'مرحباً بك في مطابع رواج للطباعة والتغليف 🌟. أنا مساعدك الذكي لخدمة العملاء، جاهز لإجابتك على أي استفسار حول خدماتنا، مواصفات الورق، التشطيبات، ومساعدتك في اختيار أو صياغة طلبيتك بدقة.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim() || isTyping) return;

    const userText = inputVal.trim();
    setInputVal('');

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const assistantMsg = await askRawajAi(userText, messages);
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickPrompt = (promptText: string) => {
    setInputVal(promptText);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 sm:bottom-24 left-4 sm:left-6 z-50 px-4 py-3 rounded-2xl bg-gradient-to-r from-brand-primary to-[#8B0E23] text-white shadow-[0_10px_30px_rgba(185,20,45,0.4)] hover:scale-105 transition-all duration-300 flex items-center gap-2.5 cursor-pointer group border border-white/20"
          title="مساعد رواج الذكي"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
          <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="font-heading font-black text-xs sm:text-sm">خدمة العملاء الذكية</span>
        </button>
      )}

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed inset-y-4 left-4 sm:left-6 w-[92vw] sm:w-[420px] z-50 bg-[#FFFDFA] dark:bg-[#191716] rounded-3xl border-2 border-[#E7E0D3] dark:border-[#332F2F] shadow-[0_20px_60px_rgba(0,0,0,0.35)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-[#171616] to-[#2B2725] text-white flex items-center justify-between border-b border-[#332F2F]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-primary text-white flex items-center justify-center shadow-md relative">
                <Bot className="w-5 h-5" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#171616] rounded-full"></span>
              </div>
              <div>
                <h3 className="font-heading font-black text-sm flex items-center gap-1.5">
                  <span>مساعد رواج الذكي</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </h3>
                <p className="text-[10px] text-neutral-300 font-mono">خبير الطباعة والتغليف • متصل الآن</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-[#FAF7F2] dark:bg-[#141211] border-b border-[#E7E0D3] dark:border-[#2D2A26] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <button
              onClick={() => handleQuickPrompt('ما هي مواصفات بطاقات الأعمال الفاخرة؟')}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#201D1C] border border-[#E7E0D3] dark:border-[#332F2F] text-[10px] font-bold text-[#57534E] dark:text-[#A8A29E] whitespace-nowrap hover:border-brand-primary hover:text-brand-primary transition-all cursor-pointer"
            >
              🃏 بطاقات الأعمال
            </button>
            <button
              onClick={() => handleQuickPrompt('كيف أطلب دفاتر فواتير كربونية NCR؟')}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#201D1C] border border-[#E7E0D3] dark:border-[#332F2F] text-[10px] font-bold text-[#57534E] dark:text-[#A8A29E] whitespace-nowrap hover:border-brand-primary hover:text-brand-primary transition-all cursor-pointer"
            >
              📄 دفاتر الفواتير
            </button>
            <button
              onClick={() => handleQuickPrompt('ما هي خامات علب التغليف والعطور؟')}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#201D1C] border border-[#E7E0D3] dark:border-[#332F2F] text-[10px] font-bold text-[#57534E] dark:text-[#A8A29E] whitespace-nowrap hover:border-brand-primary hover:text-brand-primary transition-all cursor-pointer"
            >
              📦 علب التغليف
            </button>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-right bg-[#FAF7F2]/50 dark:bg-[#141211]/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-white text-xs ${
                  msg.sender === 'user' ? 'bg-[#171616] dark:bg-[#332F2F]' : 'bg-brand-primary shadow-xs'
                }`}>
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-[80%] space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-brand-primary text-white rounded-2xl rounded-tr-xs p-3 text-xs shadow-xs'
                    : 'bg-white dark:bg-[#1E1C1A] text-[#171616] dark:text-[#F5F1EA] rounded-2xl rounded-tl-xs p-3.5 text-xs border border-[#E7E0D3] dark:border-[#332F2F] shadow-xs'
                }`}>
                  <p className="leading-relaxed">{msg.text}</p>

                  {/* Suggested Action Button if provided */}
                  {msg.suggestedAction && (
                    <button
                      onClick={() => {
                        if (msg.suggestedAction?.view) {
                          navigate({ view: msg.suggestedAction.view as any, serviceId: msg.suggestedAction.serviceId });
                          setIsOpen(false);
                        }
                      }}
                      className="mt-2 w-full px-3 py-2 rounded-xl bg-brand-primary-10 dark:bg-brand-primary/20 text-brand-primary dark:text-[#F3A6B2] text-[11px] font-bold border border-brand-primary/30 flex items-center justify-between hover:bg-brand-primary hover:text-white transition-all cursor-pointer group"
                    >
                      <span>{msg.suggestedAction.label}</span>
                      <ArrowLeft className="w-3.5 h-3.5 group-hover:translate-x-[-2px] transition-transform" />
                    </button>
                  )}

                  <span className={`block text-[9px] font-mono mt-1 ${msg.sender === 'user' ? 'text-white/70' : 'text-[#8E867D]'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center">
                <div className="w-8 h-8 rounded-xl bg-brand-primary text-white flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white dark:bg-[#1E1C1A] px-4 py-3 rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] flex items-center gap-1.5 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-brand-primary animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-brand-primary animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-brand-primary animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-[#191716] border-t border-[#E7E0D3] dark:border-[#332F2F] flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="اكتب استفسارك هنا (مثلاً: أريد طباعة كروت شخصية)..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#141211] border border-[#E7E0D3] dark:border-[#332F2F] text-xs text-[#171616] dark:text-white placeholder:text-[#8E867D] focus:outline-hidden focus:border-brand-primary transition-all"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isTyping}
              className="p-2.5 rounded-xl bg-brand-primary text-white hover:bg-[#8B0E23] disabled:opacity-40 transition-all cursor-pointer shadow-xs"
              title="إرسال"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
