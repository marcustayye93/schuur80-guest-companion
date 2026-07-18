/**
 * Schuur 80 — Out & about. Local recommendations + pending host picks.
 */
import { ExternalLink, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { hostPicksPending, recommendations } from "@/lib/content";
import { PendingCard } from "@/components/companion/Primitives";
import PageHeader from "@/components/companion/PageHeader";

export default function Area() {
  const { t, lt } = useLanguage();

  return (
    <div>
      <PageHeader
        title={t("home.recommendationsCard")}
        eyebrow={t("guide.area")}
        backHref="/guide"
      />
      <div className="space-y-6 px-4 pt-2">
        <div className="space-y-3">
          {recommendations.map((rec, i) => (
            <article
              key={rec.id}
              className="card-soft fade-rise rounded-3xl bg-card p-5"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-serif text-[21px] font-semibold text-foreground">
                    {rec.name}
                  </h3>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[12.5px] text-nature">
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                    {lt(rec.distance)}
                  </p>
                </div>
              </div>
              <p className="mt-2.5 text-[14px] leading-relaxed text-foreground/85">
                {lt(rec.description)}
              </p>
              {rec.url && (
                <a
                  href={rec.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-primary underline-offset-2 hover:underline"
                >
                  {t("common.website")}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              )}
            </article>
          ))}
        </div>

        <section className="space-y-2.5 pb-4" aria-labelledby="picks-h">
          <p className="eyebrow" id="picks-h">
            {t("guide.hostPicks")}
          </p>
          <PendingCard pending={hostPicksPending} />
        </section>
      </div>
    </div>
  );
}
