import { useScrollReveal } from '../../hooks/useScrollReveal';

export function ScrollReveal({ children, className = '', delayMs = 0 }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
      className={`transition-all duration-500 ease-out will-change-transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
}
