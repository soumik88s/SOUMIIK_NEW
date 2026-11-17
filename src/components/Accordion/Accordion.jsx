import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function Accordion({ items }) {
  const [openId, setOpenId] = useState(items?.[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `faq-panel-${item.id}`;
        const buttonId = `faq-btn-${item.id}`;

        return (
          <div key={item.id} className="glass-panel overflow-hidden rounded-2xl">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-sm font-semibold text-[var(--color-text)] transition-colors hover:text-[var(--color-deep-purple)] sm:text-base"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-[var(--color-purple)] transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="border-t border-[var(--glass-border)] px-5 py-4 text-sm leading-relaxed text-[var(--color-muted)]"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
