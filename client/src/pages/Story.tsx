/**
 * Schuur 80 — Story of the Barn. Editorial chapter timeline with imagery.
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { historyChapters, media } from "@/lib/content";
import { HeroImage, PendingCard } from "@/components/companion/Primitives";
import PageHeader from "@/components/companion/PageHeader";
import { isPending } from "@/content/types";

export default function Story() {
  const { t, lt } = useLanguage();
  const hero = media("story");

  return (
    <div>
      <PageHeader title={t("story.title")} eyebrow={t("nav.guide")} backHref="/guide" />
      {hero && (
        <div className="px-4">
          <HeroImage
            src={hero.src}
            alt={lt(hero.alt)}
            heightClass="h-52"
            className="rounded-3xl card-soft"
            subtitle={t("story.subtitle")}
          />
        </div>
      )}
      <div className="space-y-8 px-4 pt-6 pb-4">
        {historyChapters.map((ch, i) => {
          const m = i > 0 ? media(ch.mediaId) : undefined;
          return (
            <section key={ch.id} className="space-y-3" aria-labelledby={`ch-${ch.id}`}>
              <div>
                <p className="eyebrow">{lt(ch.era)}</p>
                <h2
                  id={`ch-${ch.id}`}
                  className="font-serif text-[24px] font-semibold leading-tight text-foreground"
                >
                  {lt(ch.title)}
                </h2>
              </div>
              {m && (
                <HeroImage
                  src={m.src}
                  alt={lt(m.alt)}
                  heightClass="h-44"
                  className="rounded-3xl card-soft"
                />
              )}
              {isPending(ch.body) ? (
                <PendingCard pending={ch.body} />
              ) : (
                <p className="text-[15px] leading-relaxed text-foreground/88">{lt(ch.body)}</p>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
