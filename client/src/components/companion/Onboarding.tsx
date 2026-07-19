/**
 * Schuur 80 — Barn Light design. First-visit onboarding overlay.
 * Welcomes the guest and shows platform-tailored "add to home screen"
 * instructions so the companion behaves like a real app. Dismissal is
 * remembered in localStorage; reachable again from the Help page.
 */
import { useEffect, useMemo, useState } from "react";
import { Share, MoreVertical, Monitor, X, PlusSquare } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { detectPlatform, type Platform } from "@/lib/wifiConfig";
import { BarnMark } from "./AppShell";

const STORAGE_KEY = "schuur80.onboarded";

export function shouldShowOnboarding(): boolean {
  try {
    if (localStorage.getItem(STORAGE_KEY) === "1") return false;
  } catch {
    /* ignore */
  }
  // Already installed as PWA → no need to explain installation
  if (window.matchMedia("(display-mode: standalone)").matches) return false;
  return true;
}

export function markOnboarded() {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* ignore */
  }
}

function StepList({ platform }: { platform: Platform }) {
  const { t } = useLanguage();
  const steps: { icon: ReactIcon; text: string }[] =
    platform === "ios"
      ? [
          { icon: Share, text: t("onboarding.iosStep1") },
          { icon: PlusSquare, text: t("onboarding.iosStep2") },
        ]
      : platform === "android"
        ? [
            { icon: MoreVertical, text: t("onboarding.androidStep1") },
            { icon: PlusSquare, text: t("onboarding.androidStep2") },
          ]
        : [
            { icon: Monitor, text: t("onboarding.desktopStep1") },
            { icon: PlusSquare, text: t("onboarding.desktopStep2") },
          ];
  return (
    <ol className="space-y-2.5">
      {steps.map((s, i) => (
        <li key={i} className="flex items-start gap-3 rounded-2xl bg-secondary/60 p-3.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
            <s.icon className="h-4 w-4" aria-hidden />
          </span>
          <p className="pt-1 text-[14px] leading-relaxed text-foreground/90">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

type ReactIcon = typeof Share;

export default function Onboarding({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  const platform = useMemo(() => detectPlatform(), []);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const dismiss = () => {
    markOnboarded();
    setVisible(false);
    setTimeout(onClose, 220);
  };

  const title =
    platform === "ios"
      ? t("onboarding.installTitleIos")
      : platform === "android"
        ? t("onboarding.installTitleAndroid")
        : t("onboarding.installTitleDesktop");

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-end justify-center bg-foreground/40 backdrop-blur-sm transition-opacity duration-200 sm:items-center ${visible ? "opacity-100" : "opacity-0"}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
      onClick={dismiss}
    >
      <div
        className={`w-full max-w-md rounded-t-3xl bg-background p-6 pb-8 shadow-2xl transition-transform duration-200 sm:rounded-3xl sm:pb-6 ${visible ? "translate-y-0" : "translate-y-6"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <BarnMark className="h-7 w-7" />
          </span>
          <button
            type="button"
            onClick={dismiss}
            aria-label={t("onboarding.skip")}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-transform active:scale-[0.97]"
          >
            <X className="h-4.5 w-4.5" aria-hidden />
          </button>
        </div>

        <h2 id="onboarding-title" className="font-serif text-[22px] leading-snug text-foreground">
          {t("onboarding.welcomeTitle")}
        </h2>
        <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">
          {t("onboarding.welcomeBody")}
        </p>

        <p className="eyebrow mt-5 mb-2.5">{title}</p>
        <StepList platform={platform} />
        <p className="mt-3 text-[12.5px] leading-relaxed text-muted-foreground">
          {t("onboarding.worksInBrowser")}
        </p>

        <button
          type="button"
          onClick={dismiss}
          className="mt-5 w-full rounded-full bg-primary py-3.5 text-[15px] font-medium text-primary-foreground shadow-sm transition-transform active:scale-[0.98]"
        >
          {t("onboarding.continue")}
        </button>
      </div>
    </div>
  );
}
