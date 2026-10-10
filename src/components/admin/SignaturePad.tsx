import React, { useEffect, useRef, useState } from 'react';

type SignaturePadProps = {
  value?: string;
  onChange: (signature: string) => void;
  disabled?: boolean;
};

export const SignaturePad: React.FC<SignaturePadProps> = ({ value = '', onChange, disabled = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const [hasInk, setHasInk] = useState(Boolean(value));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (value.startsWith('data:image/')) {
      const image = new Image();
      image.onload = () => ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      image.src = value;
      setHasInk(true);
    } else {
      setHasInk(false);
    }
  }, [value]);

  const point = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * (canvas.width / rect.width),
      y: (event.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const start = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (disabled) return;
    const canvas = canvasRef.current!;
    canvas.setPointerCapture(event.pointerId);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const p = point(event);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineWidth = 3.2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#171514';
    drawing.current = true;
    setHasInk(true);
  };

  const move = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || disabled) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const p = point(event);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  };

  const finish = () => {
    if (!drawing.current) return;
    drawing.current = false;
    const canvas = canvasRef.current;
    if (canvas) onChange(canvas.toDataURL('image/png'));
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || disabled) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasInk(false);
    onChange('');
  };

  return (
    <div className="space-y-2">
      <div className="overflow-hidden rounded-xl border border-dashed border-stone-300 bg-white dark:border-stone-700">
        <canvas
          ref={canvasRef}
          width={900}
          height={300}
          aria-label="مساحة التوقيع الإلكتروني باللمس أو الفأرة"
          className={`block h-36 w-full touch-none ${disabled ? 'opacity-60' : 'cursor-crosshair'}`}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={finish}
          onPointerCancel={finish}
          onPointerLeave={finish}
        />
      </div>
      <div className="flex items-center justify-between gap-3 text-xs text-stone-500">
        <span>{hasInk ? 'تم التقاط التوقيع؛ احفظه لتسجيل الاعتماد.' : 'وقّع داخل المساحة باستخدام الإصبع أو القلم أو الفأرة.'}</span>
        <button type="button" onClick={clear} disabled={disabled || !hasInk} className="shrink-0 rounded-lg border border-stone-300 px-3 py-1.5 font-bold disabled:opacity-40 dark:border-stone-700">مسح التوقيع</button>
      </div>
    </div>
  );
};
