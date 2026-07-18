/**
 * Schuur 80 — Emergency. Verified Belgian public emergency numbers +
 * pending host contact. Address card for reading to emergency services.
 */
import { Phone, MapPin, Siren, Shield, Stethoscope, Pill, Skull } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import PageHeader from "@/components/companion/PageHeader";
import { PendingCard } from "@/components/companion/Primitives";

/**
 * Public, verifiable Belgian emergency numbers (not host-specific):
 * 112 EU emergency, 101 police, 1733 doctor on duty, 070 245 245 poison centre,
 * 0903 99 000 pharmacy on duty.
 */
const NUMBERS = [
  { key: "callEu", number: "112", icon: Siren, urgent: true },
  { key: "police", number: "101", icon: Shield, urgent: true },
  { key: "doctor", number: "1733", icon: Stethoscope, urgent: false },
  { key: "poison", number: "070 245 245", icon: Skull, urgent: false },
  { key: "pharmacy", number: "0903 99 000", icon: Pill, urgent: false },
] as const;

export default function Emergency() {
  const { t } = useLanguage();

  return (
    <div>
      <PageHeader title={t("emergency.title")} eyebrow={t("nav.help")} backHref="/help" />
      <div className="space-y-6 px-4 pt-2 pb-4">
        {/* Address card */}
        <div className="card-soft rounded-3xl bg-foreground p-5 text-background">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-amber-200">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {t("emergency.addressNote")}
          </p>
          <p className="mt-2 font-serif text-[24px] font-semibold leading-snug">
            Schuur 80
          </p>
          <p className="text-[15px] text-background/85">{t("app.address")}</p>
        </div>

        {/* Emergency numbers */}
        <section className="space-y-2.5" aria-label={t("emergency.title")}>
          {NUMBERS.map(({ key, number, icon: Icon, urgent }) => (
            <a
              key={key}
              href={`tel:${number.replace(/\s/g, "")}`}
              className={`pressable card-soft flex items-center gap-3 rounded-2xl p-4 ${
                urgent ? "bg-destructive text-destructive-foreground" : "bg-card text-foreground"
              }`}
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                  urgent ? "bg-white/15" : "bg-secondary text-primary"
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-medium">{t(`emergency.${key}`)}</span>
                {key === "callEu" && (
                  <span
                    className={`block text-[13px] ${urgent ? "text-white/75" : "text-muted-foreground"}`}
                  >
                    {t("emergency.callEuSub")}
                  </span>
                )}
              </span>
              <span className="flex items-center gap-2 text-[17px] font-semibold tabular-nums">
                <Phone className="h-4 w-4" aria-hidden />
                {number}
              </span>
            </a>
          ))}
        </section>

        {/* Host contact — pending */}
        <section className="space-y-2.5" aria-labelledby="host-h">
          <p className="eyebrow" id="host-h">
            {t("emergency.hostContact")}
          </p>
          <PendingCard />
        </section>
      </div>
    </div>
  );
}
