/**
 * Schuur 80 — "Barn Light" primitives.
 * Eyebrow labels, serif headings, warm cards, pending placeholder cards.
 */
import { type ReactNode, useState } from "react";
import { HelpCircle, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { isPending, type PendingContent, type LocalizedString } from "@/content/types";
import { pendingDefaults } from "@/lib/content";
import { cn } from "@/lib/utils";

/* ---------- Section header with eyebrow ---------- */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1", className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="font-serif text-[26px] font-semibold leading-tight text-foreground">
        {title}
      </h2>
      {subtitle && <p className="text-[14px] text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

/* ---------- Status badge ---------- */
export function StatusBadge({
  children,
  tone = "pending",
}: {
  children: ReactNode;
  tone?: "pending" | "nature" | "terracotta";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium",
        tone === "pending" && "bg-amber-100 text-amber-900",
        tone === "nature" && "bg-nature/15 text-nature",
        tone === "terracotta" && "bg-primary/12 text-primary"
      )}
    >
      {children}
    </span>
  );
}

/* ---------- Pending placeholder card (Placeholder Policy) ---------- */
export function PendingCard({
  pending,
  compact = false,
  className,
}: {
  pending?: PendingContent | null;
  compact?: boolean;
  className?: string;
}) {
  const { t, lt } = useLanguage();
  const status = pending?.status ? lt(pending.status) : lt(pendingDefaults.status);
  const explanation = pending?.explanation
    ? lt(pending.explanation)
    : lt(pendingDefaults.explanation);
  const expected = pending?.expectedUpdate
    ? lt(pending.expectedUpdate)
    : lt(pendingDefaults.expectedUpdate);

  return (
    <div
      className={cn(
        "rounded-2xl border border-dashed border-amber-300/80 bg-amber-50/60 p-4",
        className
      )}
      role="note"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100">
          <HelpCircle className="h-4 w-4 text-amber-700" aria-hidden />
        </div>
        <div className="min-w-0 space-y-1.5">
          <StatusBadge tone="pending">{t("pending.label")}</StatusBadge>
          <p className="text-[14px] font-medium leading-snug text-foreground">{status}</p>
          {!compact && (
            <p className="text-[13px] leading-relaxed text-muted-foreground">{explanation}</p>
          )}
          <p className="flex items-center gap-1.5 text-[12px] text-amber-800">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {expected}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Localized content or pending ---------- */
export function MaybePendingText({
  value,
  className,
  compact,
}: {
  value: LocalizedString | PendingContent | undefined;
  className?: string;
  compact?: boolean;
}) {
  const { lt } = useLanguage();
  if (!value) return null;
  if (isPending(value)) return <PendingCard pending={value} compact={compact} />;
  return <p className={cn("text-[15px] leading-relaxed text-foreground/90", className)}>{lt(value)}</p>;
}

/* ---------- Hero image with scrim ---------- */
export function HeroImage({
  src,
  alt,
  title,
  eyebrow,
  subtitle,
  heightClass = "h-64",
  className,
}: {
  src: string;
  alt: string;
  title?: string;
  eyebrow?: string;
  subtitle?: string;
  heightClass?: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={cn("relative w-full overflow-hidden", heightClass, className)}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-secondary" aria-hidden />}
      <img
        src={src}
        alt={alt}
        loading="eager"
        onLoad={() => setLoaded(true)}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
      {(title || eyebrow) && (
        <>
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent"
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 p-5">
            {eyebrow && (
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-amber-200/90">
                {eyebrow}
              </p>
            )}
            {title && (
              <h1 className="font-serif text-[32px] font-semibold leading-tight text-white">
                {title}
              </h1>
            )}
            {subtitle && <p className="mt-1 text-[14px] text-white/85">{subtitle}</p>}
          </div>
        </>
      )}
    </div>
  );
}

/* ---------- Callout ---------- */
export function Callout({
  icon,
  children,
  tone = "nature",
  className,
}: {
  icon?: ReactNode;
  children: ReactNode;
  tone?: "nature" | "terracotta";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-2xl p-4 text-[14px] leading-relaxed",
        tone === "nature" && "bg-nature/10 text-foreground/90",
        tone === "terracotta" && "bg-primary/8 text-foreground/90",
        className
      )}
    >
      {icon && (
        <span
          className={cn(
            "mt-0.5 shrink-0",
            tone === "nature" ? "text-nature" : "text-primary"
          )}
          aria-hidden
        >
          {icon}
        </span>
      )}
      <div className="min-w-0">{children}</div>
    </div>
  );
}

/* ---------- Skeleton loading card ---------- */
export function SkeletonCard({ heightClass = "h-40" }: { heightClass?: string }) {
  return (
    <div className={cn("animate-pulse rounded-3xl bg-secondary", heightClass)} aria-hidden />
  );
}
