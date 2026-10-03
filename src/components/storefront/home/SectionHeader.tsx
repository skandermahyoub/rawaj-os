import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  moduleBadge?: string;
  badgeColor?: 'red' | 'gold' | 'dark' | 'emerald';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  actionLabel,
  onAction,
  icon,
  moduleBadge,
  badgeColor = 'red'
}) => {
  const getBadgeStyle = () => {
    switch (badgeColor) {
      case 'gold':
      case 'emerald':
        return 'bg-brand-accent-15 text-brand-accent border-brand-accent-30';
      case 'dark':
        return 'bg-[#171616] text-white dark:bg-white/15 dark:text-white border-transparent';
      case 'red':
      default:
        return 'bg-brand-primary-10 text-brand-primary border-brand-primary-30';
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3.5 border-b border-[#EBE5DA] dark:border-[#2C2826] mb-4 sm:mb-6">
      <div className="space-y-1.5 max-w-2xl">
        {moduleBadge && (
          <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold px-2.5 py-0.5 rounded-md border tracking-wide shadow-2xs">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getBadgeStyle()}`}>
              {moduleBadge}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2.5">
          {icon && (
            <div className="w-8 h-8 rounded-lg bg-brand-primary-10 text-brand-primary flex items-center justify-center shrink-0">
              {icon}
            </div>
          )}
          <h2 className="font-heading font-black text-[18px] sm:text-[22px] lg:text-[24px] text-[#171616] dark:text-[#F5F1EA] tracking-tight leading-tight">
            {title}
          </h2>
        </div>

        {subtitle && (
          <p className="text-[12px] sm:text-[13.5px] text-[#5C564F] dark:text-[#A0988F] leading-relaxed pr-0.5">
            {subtitle}
          </p>
        )}
      </div>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="touch-target self-start sm:self-auto text-[12px] sm:text-[13px] font-bold text-[#B9142D] hover:text-[#951126] dark:hover:text-[#E03A53] hover:underline flex items-center gap-1.5 shrink-0 pt-1 sm:pt-0 cursor-pointer transition-colors"
        >
          <span>{actionLabel}</span>
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        </button>
      )}
    </div>
  );
};

