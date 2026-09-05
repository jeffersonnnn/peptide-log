import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  crumbs?: Crumb[];
}

/**
 * Shared page header for the multipage site. Keeps the "bureau" look:
 * mono eyebrow, large tracking-tight title, dim subtitle.
 */
export function PageHeader({ eyebrow, title, subtitle, crumbs }: PageHeaderProps) {
  return (
    <div className="mb-8">
      {crumbs && crumbs.length > 0 && (
        <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-[var(--text-faint)]">
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {c.href ? (
                <Link href={c.href} className="hover:text-[var(--accent)] transition-colors">
                  {c.label}
                </Link>
              ) : (
                <span className="text-[var(--text-dim)]">{c.label}</span>
              )}
              {i < crumbs.length - 1 && <span className="text-[var(--text-faint)]">/</span>}
            </span>
          ))}
        </nav>
      )}
      {eyebrow && (
        <span className="block text-[9px] font-mono uppercase tracking-[0.2em] text-[var(--text-dim)] mb-3">
          {eyebrow}
        </span>
      )}
      <h1 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] leading-[1.05]">
        {title}
      </h1>
      {subtitle && (
        <p className="text-[var(--text-dim)] text-sm mt-2 max-w-[60ch] leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
