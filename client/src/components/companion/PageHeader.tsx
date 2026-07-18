/**
 * Schuur 80 — "Barn Light" sub-page header with back navigation.
 */
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PageHeader({
  title,
  eyebrow,
  backHref = "/",
}: {
  title: string;
  eyebrow?: string;
  backHref?: string;
}) {
  const { t } = useLanguage();
  const [, navigate] = useLocation();

  return (
    <div className="flex items-center gap-3 px-4 pb-2 pt-3">
      <button
        type="button"
        onClick={() => {
          if (window.history.length > 1) window.history.back();
          else navigate(backHref);
        }}
        aria-label={t("actions.back")}
        className="pressable card-soft flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-card"
      >
        <ArrowLeft className="h-4.5 w-4.5 text-foreground" aria-hidden />
      </button>
      <div className="min-w-0">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="truncate font-serif text-[24px] font-semibold leading-tight text-foreground">
          {title}
        </h1>
      </div>
    </div>
  );
}
