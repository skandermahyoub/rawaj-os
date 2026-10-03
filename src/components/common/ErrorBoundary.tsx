import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      this.setState({ hasError: false, error: null });
      window.location.href = '/';
    } catch {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#12100F] text-[#FAF8F5] flex items-center justify-center p-4 font-['Tajawal',sans-serif]" dir="rtl">
          <div className="max-w-md w-full bg-[#1C1A1A] border border-[#B9142D]/40 rounded-3xl p-6 sm:p-8 text-center shadow-2xl space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-[#B9142D]/20 text-[#B9142D] mx-auto flex items-center justify-center border border-[#B9142D]/30 shadow-lg animate-pulse">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-black text-white">حدث تنبيه غير متوقع</h2>
              <p className="text-xs sm:text-sm text-[#A8A29E] leading-relaxed">
                تم استعادة حماية النظام بنجاح. يمكنك إعادة المحاولة أو الانتقال إلى الصفحة الرئيسية.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="px-5 py-2.5 rounded-xl bg-[#B9142D] hover:bg-[#9E1026] text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>إعادة تحميل المنصة</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
