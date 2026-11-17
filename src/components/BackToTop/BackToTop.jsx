import { useEffect, useState } from 'react';
import { ArrowUp, MessageSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 420);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <div className="no-print fixed right-4 bottom-4 z-30 flex items-center gap-2 sm:right-6 sm:bottom-6">
      {pathname !== '/contact' && (
        <Link
          to="/contact"
          className="glass-panel inline-flex h-10 items-center gap-1.5 rounded-xl px-3.5 text-xs font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-purple)]"
        >
          <MessageSquare className="h-3.5 w-3.5 text-[var(--color-purple)]" aria-hidden="true" />
          <span>Connect</span>
        </Link>
      )}
      
    </div>
  );
}
