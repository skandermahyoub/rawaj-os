import React, { useEffect, useState } from 'react';

interface BrandLogoProps {
  src?: string | null;
  alt?: string;
  className?: string;
  fallbackClassName?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  src,
  alt = 'رواج',
  className = 'w-full h-full object-contain',
  fallbackClassName = 'w-full h-full object-contain',
}) => {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (src && !failed) {
    return (
      <img
        key={src}
        src={src}
        alt={alt}
        className={className}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`flex items-center justify-center text-center font-black text-[11px] leading-none text-[#B9142D] ${fallbackClassName}`}
    >
      رواج
    </div>
  );
};
