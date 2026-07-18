/**
 * Schuur 80 — Home. "Barn Light": full-bleed hero, journey sections
 * (Before you arrive / Around the house / Before you go), photo cards.
 */
import { Link } from "wouter";
import { KeyRound, DoorOpen, Siren, MapPin, BookOpen, Cat } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { media } from "@/lib/content";
import { HeroImage } from "@/components/companion/Primitives";
import { PhotoCard, ListRow } from "@/components/companion/Cards";

export default function Home() {
  const { t, lt } = useLanguage();
  const hero = media("hero-exterior");
  const living = media("living-interior");
  const garden = media("garden");
  const catsImg = media("cats");
  const story = media("story");

  return (
    <div>
      {hero && (
        <HeroImage
          src={hero.src}
          alt={lt(hero.alt)}
          eyebrow={t("app.tagline")}
          title={t("home.welcome")}
          subtitle={t("home.welcomeSub")}
          heightClass="h-[340px]"
          className="rounded-b-[28px]"
        />
      )}

      <div className="space-y-8 px-4 pt-6">
        {/* Before arrival */}
        <section className="fade-rise space-y-3" aria-labelledby="sec-arrival">
          <p className="eyebrow" id="sec-arrival">
            {t("home.beforeArrival")}
          </p>
          <ListRow
            href="/arrival"
            icon={<KeyRound className="h-5 w-5" aria-hidden />}
            title={t("home.arrivalCard")}
            subtitle={t("home.arrivalCardSub")}
          />
          <ListRow
            href="/guide/area"
            icon={<MapPin className="h-5 w-5" aria-hidden />}
            title={t("home.recommendationsCard")}
            subtitle={t("home.recommendationsCardSub")}
          />
        </section>

        {/* During stay */}
        <section className="space-y-3" aria-labelledby="sec-stay">
          <p className="eyebrow" id="sec-stay">
            {t("home.duringStay")}
          </p>
          <div className="grid grid-cols-1 gap-3">
            {living && (
              <PhotoCard
                href="/house"
                src={living.src}
                alt={lt(living.alt)}
                title={t("home.exploreHouse")}
                subtitle={t("house.subtitle")}
                heightClass="h-56"
                className="fade-rise"
              />
            )}
            <div className="grid grid-cols-2 gap-3">
              {garden && (
                <PhotoCard
                  href="/garden"
                  src={garden.src}
                  alt={lt(garden.alt)}
                  title={t("home.exploreGarden")}
                  heightClass="h-44"
                  className="fade-rise"
                  style={{ animationDelay: "40ms" }}
                />
              )}
              {catsImg && (
                <PhotoCard
                  href="/cats"
                  src={catsImg.src}
                  alt={lt(catsImg.alt)}
                  title={t("home.meetCats")}
                  heightClass="h-44"
                  className="fade-rise"
                  style={{ animationDelay: "80ms" }}
                />
              )}
            </div>
          </div>
        </section>

        {/* Story */}
        {story && (
          <section aria-label={t("home.storyTitle")}>
            <PhotoCard
              href="/story"
              src={story.src}
              alt={lt(story.alt)}
              eyebrow={t("guide.story")}
              title={t("home.storyTitle")}
              subtitle={t("home.storySub")}
              heightClass="h-40"
            />
          </section>
        )}

        {/* Departure & help */}
        <section className="space-y-3 pb-2" aria-labelledby="sec-departure">
          <p className="eyebrow" id="sec-departure">
            {t("home.departure")}
          </p>
          <ListRow
            href="/checkout"
            icon={<DoorOpen className="h-5 w-5" aria-hidden />}
            title={t("home.checkoutCard")}
            subtitle={t("home.checkoutCardSub")}
          />
          <ListRow
            href="/emergency"
            icon={<Siren className="h-5 w-5" aria-hidden />}
            title={t("home.emergencyCard")}
            subtitle={t("home.emergencyCardSub")}
          />
        </section>

        {/* Quick links footer */}
        <section className="pb-4">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/guide/faqs"
              className="pressable card-soft flex items-center gap-2 rounded-full bg-card px-4 py-2 text-[13px] font-medium text-foreground"
            >
              <BookOpen className="h-4 w-4 text-primary" aria-hidden /> {t("guide.faqs")}
            </Link>
            <Link
              href="/cats"
              className="pressable card-soft flex items-center gap-2 rounded-full bg-card px-4 py-2 text-[13px] font-medium text-foreground"
            >
              <Cat className="h-4 w-4 text-primary" aria-hidden /> {t("cats.title")}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
