import Link from "next/link";
import { SplitWords } from "@/components/motion/reveal";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  crumbs?: Crumb[];
  /** Optional element shown on the right of the title on wide screens. */
  aside?: React.ReactNode;
}

/**
 * Shared inner-page header. One clear title that rises in word by word,
 * a plain-language eyebrow, and a graduation rule below to tie every page
 * to the syringe scale.
 */
export function PageHeader({ eyebrow, title, subtitle, crumbs, aside }: PageHeaderProps) {
  const titleClass = "text-4xl md:text-5xl font-medium tracking-display leading-[1.02]";
  return (
    <header className="mb-8 md:mb-10">
      {crumbs && crumbs.length > 0 && (
        <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs text-[var(--text-faint)]" aria-label="Breadcrumb">
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-2">
              {c.href ? (
                <Link href={c.href} className="hover:text-white transition-colors">
                  {c.label}
                </Link>
              ) : (
                <span className="text-[var(--text-dim)]">{c.label}</span>
              )}
              {i < crumbs.length - 1 && <span aria-hidden>/</span>}
            </span>
          ))}
        </nav>
      )}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          {eyebrow && (
            <p className="hero-in text-sm text-[var(--accent)] mb-2">{eyebrow}</p>
          )}
          {typeof title === "string" ? (
            <SplitWords as="h1" text={title} className={titleClass} stagger={0.06} />
          ) : (
            <h1 className={`hero-in ${titleClass}`}>{title}</h1>
          )}
          {subtitle && (
            <p
              className="hero-in text-[var(--text-dim)] text-base mt-3 max-w-[58ch] leading-relaxed"
              style={{ animationDelay: "0.25s" }}
            >
              {subtitle}
            </p>
          )}
        </div>
        {aside && (
          <div className="shrink-0 hero-in" style={{ animationDelay: "0.35s" }}>
            {aside}
          </div>
        )}
      </div>
      <div className="graduation mt-6 hero-in" style={{ animationDelay: "0.4s" }} aria-hidden />
    </header>
  );
}
