import { ThemeCustomizerSettings, ArabicFontFamily } from '../types';

const fontFamilies: Record<ArabicFontFamily, string> = {
  tajawal: "'Tajawal', system-ui, -apple-system, sans-serif",
  cairo: "'Cairo', system-ui, -apple-system, sans-serif",
  noto_sans: "'Noto Sans Arabic', system-ui, -apple-system, sans-serif",
  noto_kufi: "'Noto Kufi Arabic', system-ui, -apple-system, sans-serif",
  almarai: "'Almarai', system-ui, -apple-system, sans-serif",
};

function hexToRgbValues(hex: string): { r: number; g: number; b: number } {
  let clean = (hex || '').replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  const num = parseInt(clean, 16);
  if (isNaN(num) || clean.length !== 6) return { r: 185, g: 20, b: 45 };
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function applyThemeToDocument(settings: ThemeCustomizerSettings) {
  if (typeof document === 'undefined') return;

  const {
    theme_mode = 'light',
    primary_color = '#B9142D',
    primary_hover = '#951126',
    secondary_bg = '#12100F',
    accent_color = '#D4AF37',
    background_pattern = 'grid',
    glow_intensity = 70,
    arabic_font = 'tajawal',
  } = settings;

  const root = document.documentElement;

  // 1. Dark Mode Class on <html>
  if (theme_mode === 'dark') {
    root.classList.add('dark');
  } else if (theme_mode === 'light') {
    root.classList.remove('dark');
  } else if (theme_mode === 'auto') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }

  const pRgb = hexToRgbValues(primary_color);
  const pHRgb = hexToRgbValues(primary_hover);
  const sRgb = hexToRgbValues(secondary_bg);
  const aRgb = hexToRgbValues(accent_color);

  // 2. Set Clean CSS Variables
  root.style.setProperty('--rawaj-primary', primary_color);
  root.style.setProperty('--rawaj-primary-rgb', `${pRgb.r}, ${pRgb.g}, ${pRgb.b}`);

  root.style.setProperty('--rawaj-primary-hover', primary_hover);
  root.style.setProperty('--rawaj-primary-hover-rgb', `${pHRgb.r}, ${pHRgb.g}, ${pHRgb.b}`);

  root.style.setProperty('--rawaj-secondary', secondary_bg);
  root.style.setProperty('--rawaj-secondary-rgb', `${sRgb.r}, ${sRgb.g}, ${sRgb.b}`);

  root.style.setProperty('--rawaj-accent', accent_color);
  root.style.setProperty('--rawaj-accent-rgb', `${aRgb.r}, ${aRgb.g}, ${aRgb.b}`);

  root.style.setProperty('--rawaj-glow-opacity', (glow_intensity / 100).toString());

  // 3. Set Font on Document Body
  const font = fontFamilies[arabic_font] || fontFamilies.tajawal;
  document.body.style.fontFamily = font;

  // 4. Background Pattern
  const styleId = 'rawaj-theme-pattern-style';
  let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = styleId;
    document.head.appendChild(styleEl);
  }

  // Remove old destructive style tag if exists
  const oldDestructiveTag = document.getElementById('rawaj-dynamic-theme-style');
  if (oldDestructiveTag) {
    oldDestructiveTag.remove();
  }

  let patternCss = '';
  if (background_pattern === 'grid') {
    patternCss = `
      body {
        background-image: 
          radial-gradient(rgba(${pRgb.r}, ${pRgb.g}, ${pRgb.b}, 0.05) 1px, transparent 1px),
          linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px);
        background-size: 32px 32px;
      }
      .dark body {
        background-image: 
          radial-gradient(rgba(${aRgb.r}, ${aRgb.g}, ${aRgb.b}, 0.08) 1px, transparent 1px),
          linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px);
        background-size: 32px 32px;
      }
    `;
  } else if (background_pattern === 'dots') {
    patternCss = `
      body {
        background-image: radial-gradient(rgba(${pRgb.r}, ${pRgb.g}, ${pRgb.b}, 0.08) 1.5px, transparent 1.5px);
        background-size: 20px 20px;
      }
      .dark body {
        background-image: radial-gradient(rgba(${aRgb.r}, ${aRgb.g}, ${aRgb.b}, 0.08) 1.5px, transparent 1.5px);
        background-size: 20px 20px;
      }
    `;
  } else if (background_pattern === 'mesh') {
    patternCss = `
      body {
        background: radial-gradient(at 0% 0%, rgba(${pRgb.r}, ${pRgb.g}, ${pRgb.b}, 0.05) 0px, transparent 50%),
                    radial-gradient(at 100% 100%, rgba(${aRgb.r}, ${aRgb.g}, ${aRgb.b}, 0.05) 0px, transparent 50%),
                    #F5F1E9;
        background-attachment: fixed;
      }
      .dark body {
        background: radial-gradient(at 0% 0%, rgba(${pRgb.r}, ${pRgb.g}, ${pRgb.b}, 0.10) 0px, transparent 50%),
                    radial-gradient(at 100% 100%, rgba(${aRgb.r}, ${aRgb.g}, ${aRgb.b}, 0.08) 0px, transparent 50%),
                    #141211;
        background-attachment: fixed;
      }
    `;
  } else {
    patternCss = `
      body {
        background-image: none !important;
      }
    `;
  }

  styleEl.innerHTML = patternCss;
}
