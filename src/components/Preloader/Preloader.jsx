import { useEffect, useState } from 'react';

export function Preloader() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') return false;
    const reduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return false;
    try {
      if (window.sessionStorage.getItem('sc-preloader-shown') === '1') return false;
      window.sessionStorage.setItem('sc-preloader-shown', '1');
    } catch {
      return false;
    }
    return true;
  });

  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!visible) return undefined;
    const fadeTimer = window.setTimeout(() => setFading(true), 220);
    const hideTimer = window.setTimeout(() => setVisible(false), 400);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-background)] transition-opacity duration-300 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="glass-panel flex flex-col items-center gap-3 rounded-2xl px-8 py-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#9b8ec4] to-[#514477] text-lg font-bold tracking-tight text-white shadow-sm">
          SC
        </div>
        <span className="text-xs font-medium tracking-wider text-[var(--color-muted)]">
          Soumik Chakraborty
        </span>
      </div>
    </div>
  );
}
