import React, { useState } from 'react';
import { ImageOff, Sparkles } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackCategory?: string;
  containerClassName?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className,
  fallbackCategory = 'رواج للطباعة',
  containerClassName = '',
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  const [hasError, setHasError] = useState(false);

  // Sync if src prop changes
  React.useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    // Never resurrect bundled/legacy artwork when the authoritative image fails.
    // A neutral placeholder is safer than showing stale content that the admin replaced.
    setHasError(true);
  };

  if (hasError || !currentSrc) {
    return (
      <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#EEE9E0] to-[#E3DDCF] dark:from-[#25211F] dark:to-[#1C1918] text-[#746E67] dark:text-[#A0988F] p-4 text-center select-none ${className || ''}`}>
        <div className="w-8 h-8 rounded-full bg-[#B9142D]/10 text-[#B9142D] flex items-center justify-center mb-1.5">
          <Sparkles className="w-4 h-4" />
        </div>
        <span className="text-[11px] font-bold text-[#171616] dark:text-[#F5F1EA] line-clamp-1">{alt || fallbackCategory}</span>
        <span className="text-[9px] text-[#B9142D] font-medium mt-0.5">رواج للطباعة والإعلان</span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
      {...props}
    />
  );
};
