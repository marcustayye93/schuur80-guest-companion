/**
 * Schuur 80 — Arrival. Hero, arrival guide steps and live weather (online only).
 */
import { useEffect, useState } from "react";
import { CloudSun, Thermometer } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { guideById, media } from "@/lib/content";
import { HeroImage, PendingCard, Callout } from "@/components/companion/Primitives";
import PageHeader from "@/components/companion/PageHeader";
import { useOnline } from "@/components/companion/AppShell";
import { isPending } from "@/content/types";

interface Weather {
  temp: number;
  code: number;
}

/** Open-Meteo — free, no key. Haasdonk ~51.16N 4.28E. */
function useWeather(enabled: boolean) {
  const [weather, setWeather] = useState<Weather | null>(null);
  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=51.16&longitude=4.28&current=temperature_2m,weather_code"
    )
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && data?.current) {
          setWeather({
            temp: Math.round(data.current.temperature_2m),
            code: data.current.weather_code,
          });
        }
      })
      .catch(() => {
        /* silent — weather is a nice-to-have */
      });
    return () => {
      cancelled = true;
    };
  }, [enabled]);
  return weather;
}

export default function Arrival() {
  const { t, lt } = useLanguage();
  const online = useOnline();
  const weather = useWeather(online);
  const guide = guideById("arrival-guide");
  const m = media("arrival");

  return (
    <div>
      <PageHeader title={t("arrival.title")} eyebrow={t("home.beforeArrival")} backHref="/" />
      {m && (
        <div className="px-4">
          <HeroImage
            src={m.src}
            alt={lt(m.alt)}
            heightClass="h-52"
            className="rounded-3xl card-soft"
          />
        </div>
      )}
      <div className="space-y-7 px-4 pt-5 pb-4">
        {/* Weather */}
        <Callout icon={<CloudSun className="h-5 w-5" aria-hidden />}>
          <p className="font-medium">{t("arrival.weather")}</p>
          {weather ? (
            <p className="mt-1 flex items-center gap-1.5 text-[15px]">
              <Thermometer className="h-4 w-4 text-nature" aria-hidden />
              {weather.temp}°C
            </p>
          ) : (
            <p className="mt-0.5 text-[13px] text-muted-foreground">
              {t("arrival.weatherPending")}
            </p>
          )}
        </Callout>

        {/* Steps */}
        {guide && (
          <ol className="relative space-y-5 border-l border-primary/25 pl-5">
            {guide.steps.map((step, i) => (
              <li key={i} className="relative">
                <span
                  className="absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-primary bg-background"
                  aria-hidden
                />
                <h3 className="font-serif text-[19px] font-semibold text-foreground">
                  {lt(step.title)}
                </h3>
                <div className="mt-1.5">
                  {isPending(step.body) ? (
                    <PendingCard pending={step.body} compact />
                  ) : (
                    <p className="text-[14.5px] leading-relaxed text-foreground/85">
                      {lt(step.body)}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
