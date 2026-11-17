import { Moon, Sun } from 'lucide-react';

export function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--glass-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text)] transition-colors duration-150 hover:border-[var(--color-purple)] hover:text-[var(--color-deep-purple)]"
    >
      {isDark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
}
