/**
 * Schuur 80 — Settings. Language choice, install prompt, about.
 */
import { useEffect, useState } from "react";
import { Check, Download, Info } from "lucide-react";
import { LANGUAGES, useLanguage } from "@/contexts/LanguageContext";
import PageHeader from "@/components/companion/PageHeader";
import { Callout } from "@/components/companion/Primitives";
import { cn } from "@/lib/utils";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
}

export default function SettingsPage() {
  const { t, lang, setLang } = useLanguage();
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  return (
    <div>
      <PageHeader title={t("settings.title")} eyebrow={t("nav.help")} backHref="/help" />
      <div className="space-y-7 px-4 pt-2 pb-4">
        {/* Language */}
        <section className="space-y-2.5" aria-labelledby="lang-h">
          <p className="eyebrow" id="lang-h">
            {t("settings.language")}
          </p>
          <p className="text-[13px] text-muted-foreground">{t("settings.languageSub")}</p>
          <div className="grid grid-cols-2 gap-2.5">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLang(l.code)}
                aria-pressed={lang === l.code}
                className={cn(
                  "pressable card-soft flex items-center justify-between rounded-2xl p-4 text-left text-[15px] font-medium",
                  lang === l.code
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground"
                )}
              >
                {l.native}
                {lang === l.code && <Check className="h-4 w-4" aria-hidden />}
              </button>
            ))}
          </div>
        </section>

        {/* Install */}
        <section className="space-y-2.5" aria-labelledby="install-h">
          <p className="eyebrow" id="install-h">
            {t("settings.install")}
          </p>
          <Callout icon={<Download className="h-5 w-5" aria-hidden />} tone="terracotta">
            <p>{t("settings.installBody")}</p>
            {installEvent && (
              <button
                type="button"
                onClick={() => installEvent.prompt()}
                className="pressable mt-3 rounded-full bg-primary px-5 py-2 text-[14px] font-medium text-primary-foreground"
              >
                {t("actions.install")}
              </button>
            )}
          </Callout>
        </section>

        {/* About */}
        <section className="space-y-2.5" aria-labelledby="about-h">
          <p className="eyebrow" id="about-h">
            {t("settings.about")}
          </p>
          <Callout icon={<Info className="h-5 w-5" aria-hidden />}>
            <p>{t("settings.aboutBody")}</p>
            <p className="mt-2 text-[12px] text-muted-foreground">
              {t("settings.version")} 1.0 — {t("app.address")}
            </p>
          </Callout>
        </section>
      </div>
    </div>
  );
}
