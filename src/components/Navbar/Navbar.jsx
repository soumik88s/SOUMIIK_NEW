import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { PERSONAL } from '../../data/personal';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { HamburgerMenu } from '../HamburgerMenu/HamburgerMenu';

export function Navbar({ theme, onToggleTheme, onOpenResume }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef(null);

  return (
    <>
      <header className="glass-nav sticky top-0 z-40 w-full">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-3 whitespace-nowrap text-[var(--color-text)] transition-opacity hover:opacity-85"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#9b8ec4] to-[#514477] font-display text-sm font-bold text-white shadow-sm">
              {PERSONAL.monogram}
            </span>
            <span className="font-display text-base font-semibold tracking-tight sm:text-lg">
              {PERSONAL.name}
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-2.5">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-[var(--glass-border)] bg-[var(--color-surface-elevated)] px-3.5 text-sm font-medium text-[var(--color-text)] transition-colors duration-150 hover:border-[var(--color-purple)] whitespace-nowrap shrink-0"
            >
              <Menu className="h-4 w-4" aria-hidden="true" />
              <span>Menu</span>
            </button>
          </div>
        </div>
      </header>

      <HamburgerMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        triggerRef={triggerRef}
        onOpenResume={onOpenResume}
      />
    </>
  );
}
