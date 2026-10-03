import React, { useEffect, useState } from 'react';
import { RawajLogo } from './RawajLogo';

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

  return <RawajLogo className={fallbackClassName} />;
};
