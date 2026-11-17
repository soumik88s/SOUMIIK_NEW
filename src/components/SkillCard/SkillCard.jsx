export function SkillCard({ category }) {
  return (
    <section className="glass-panel flex flex-col rounded-2xl p-6">
      <h3 className="font-display text-lg font-bold text-[var(--color-text)]">
        {category.title}
      </h3>
      <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-muted)]">
        {category.context}
      </p>

      <ul className="mt-5 divide-y divide-[var(--glass-border)] border-t border-[var(--glass-border)]">
        {category.items.map((skill) => (
          <li
            key={skill.name}
            className="flex items-baseline justify-between gap-4 py-2.5 text-sm"
          >
            <span className="font-medium text-[var(--color-text)]">{skill.name}</span>
            <span className="text-right text-xs text-[var(--color-muted)]">{skill.note}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
