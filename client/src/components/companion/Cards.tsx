/**
 * Schuur 80 — "Barn Light" card components.
 * Photo cards with gradient scrims and serif titles; warm list rows.
 */
import { type ReactNode, useState } from "react";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------- Photo card (signature element) ---------- */
export function PhotoCard({
  href,
  src,
  alt,
  eyebrow,
  title,
  subtitle,
  heightClass = "h-52",
  className,
  style,
}: {
  href: string;
  src: string;
  alt: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  heightClass?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Link
      href={href}
      className={cn(
        "pressable card-soft group relative block overflow-hidden rounded-3xl",
        heightClass,
        className
      )}
      style={style}
    >
      {!loaded && <div className="absolute inset-0 animate-pulse bg-secondary" aria-hidden />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={cn(
          "h-full w-full object-cover transition-all duration-500 group-hover:scale-[1.03]",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 p-4">
        {eyebrow && (
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-200 [text-shadow:0_1px_4px_rgba(0,0,0,0.55)]">
            {eyebrow}
          </p>
        )}
        <h3 className="font-serif text-[22px] font-semibold leading-tight text-white">{title}</h3>
        {subtitle && <p className="mt-0.5 text-[13px] text-white/80">{subtitle}</p>}
      </div>
    </Link>
  );
}

/* ---------- Warm list row ---------- */
export function ListRow({
  href,
  onClick,
  icon,
  title,
  subtitle,
  trailing,
  className,
}: {
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  trailing?: ReactNode;
  className?: string;
}) {
  const content = (
    <>
      {icon && (
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1 text-left">
        <span className="block truncate text-[15px] font-medium text-foreground">{title}</span>
        {subtitle && (
          <span className="block truncate text-[13px] text-muted-foreground">{subtitle}</span>
        )}
      </span>
      {trailing ?? <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/60" aria-hidden />}
    </>
  );

  const cls = cn(
    "pressable card-soft flex w-full items-center gap-3 rounded-2xl bg-card p-3.5",
    className
  );

  if (href) {
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {content}
    </button>
  );
}

/* ---------- Checklist item with local persistence ---------- */
export function ChecklistItem({
  id,
  label,
  checked,
  onToggle,
}: {
  id: string;
  label: string;
  checked: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <label
      className={cn(
        "pressable card-soft flex cursor-pointer items-center gap-3 rounded-2xl bg-card p-4 transition-colors",
        checked && "bg-nature/10"
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(id)}
        className="h-5 w-5 shrink-0 accent-[#64735A]"
      />
      <span
        className={cn(
          "text-[15px] leading-snug",
          checked ? "text-muted-foreground line-through" : "text-foreground"
        )}
      >
        {label}
      </span>
    </label>
  );
}
