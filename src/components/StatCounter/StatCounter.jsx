import { useEffect, useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export function StatCounter({ value, decimals = 0, suffix = '', label, context }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (!isVisible) return undefined;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setDisplayValue(value);
      return undefined;
    }

    let frame = 0;
    const duration = 650;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(value * eased);
      if (progress < 1) {
        frame = window.requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    frame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frame);
  }, [isVisible, value]);

  const formatted = decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue);

  return (
    <div ref={ref} className="glass-panel rounded-2xl p-5">
      <div className="font-display font-mono-tabular text-3xl font-bold tracking-tight text-[var(--color-text)]">
        {formatted}
        {suffix}
      </div>
      <div className="mt-1.5 text-sm font-medium text-[var(--color-text)]">{label}</div>
      {context && <p className="mt-1 text-xs text-[var(--color-muted)]">{context}</p>}
    </div>
  );
}
