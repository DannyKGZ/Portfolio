import { useEffect, useRef } from 'react';

const CHARS =
  '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン' +
  '0123456789<>{}[]/=;const let func return import export React TSX JSX npm git push pull merge' +
  'async await useState useEffect TypeScript Bitrix PHP HTML CSS Vite';

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let columns = 0;
    let drops: number[] = [];
    let speeds: number[] = [];
    let fontSize = 14;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = parent.getBoundingClientRect();

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      fontSize = Math.max(12, Math.floor(width / 55));
      columns = Math.floor(width / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -40);
      speeds = Array.from({ length: columns }, () => 0.4 + Math.random() * 0.8);
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();

      ctx.fillStyle = 'rgba(12, 14, 18, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "IBM Plex Mono", "Courier New", monospace`;

      for (let i = 0; i < columns; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const brightness = 0.15 + Math.random() * 0.55;
        const isHead = Math.random() > 0.985;
        ctx.fillStyle = isHead
          ? `rgba(251, 120, 40, ${brightness + 0.3})`
          : `rgba(251, 120, 40, ${brightness * 0.6})`;

        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i] += speeds[i] * (reducedMotion ? 0.15 : 1);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas.parentElement!);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden
    />
  );
};

export default MatrixRain;
