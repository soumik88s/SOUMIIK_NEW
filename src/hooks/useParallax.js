import { useEffect, useState } from 'react';

export function useParallax(speed = 0.08) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isNarrow = window.innerWidth < 768;

    if (reducedMotion || isNarrow) {
      setOffset(0);
      return;
    }

    let rafId = 0;
    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        setOffset(Math.min(window.scrollY * speed, 48));
        rafId = 0;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return offset;
}
