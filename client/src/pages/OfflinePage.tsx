/**
 * Schuur 80 — Offline screen. Friendly state shown at /offline.
 */
import { WifiOff } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function OfflinePage() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center gap-4 px-8 py-24 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
        <WifiOff className="h-7 w-7 text-amber-800" aria-hidden />
      </span>
      <h1 className="font-serif text-[28px] font-semibold text-foreground">
        {t("offline.title")}
      </h1>
      <p className="max-w-xs text-[14.5px] leading-relaxed text-muted-foreground">
        {t("offline.body")}
      </p>
      <Link
        href="/"
        className="pressable mt-2 rounded-full bg-primary px-6 py-2.5 text-[14px] font-medium text-primary-foreground"
      >
        {t("error.goHome")}
      </Link>
    </div>
  );
}
