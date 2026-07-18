/**
 * Schuur 80 — Garden. Orchard hero, outdoor amenities, garden guide, cats teaser.
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { devices, guideById, media } from "@/lib/content";
import { HeroImage, SectionHeader } from "@/components/companion/Primitives";
import { PhotoCard, ListRow } from "@/components/companion/Cards";
import { DeviceIcon } from "@/components/companion/DeviceBits";
import { isPending } from "@/content/types";
import { BookOpen } from "lucide-react";

export default function Garden() {
  const { t, lt } = useLanguage();
  const gardenImg = media("garden");
  const orchard = media("orchard");
  const catsImg = media("cats");
  const gardenGuide = guideById("garden-guide");
  const outdoorDevices = devices.filter((d) => d.roomId === "garden");

  return (
    <div>
      {gardenImg && (
        <HeroImage
          src={gardenImg.src}
          alt={lt(gardenImg.alt)}
          eyebrow={t("nav.garden")}
          title={t("garden.title")}
          subtitle={t("garden.subtitle")}
          heightClass="h-64"
          className="rounded-b-[28px]"
        />
      )}
      <div className="space-y-8 px-4 pt-6">
        {/* Garden guide */}
        {gardenGuide && (
          <ListRow
            href={`/guide/${gardenGuide.id}`}
            icon={<BookOpen className="h-5 w-5" aria-hidden />}
            title={lt(gardenGuide.name)}
            subtitle={lt(gardenGuide.summary)}
          />
        )}

        {/* Outdoor amenities */}
        <section className="space-y-3" aria-labelledby="out-h">
          <p className="eyebrow" id="out-h">
            {t("garden.outdoor")}
          </p>
          <div className="space-y-2.5">
            {outdoorDevices.map((d) => (
              <ListRow
                key={d.id}
                href={`/house/device/${d.id}`}
                icon={<DeviceIcon name={d.icon} />}
                title={lt(d.name)}
                subtitle={
                  isPending(d.brandModel) ? t("pending.label") : (d.brandModel as string)
                }
              />
            ))}
          </div>
        </section>

        {/* Orchard visual */}
        {orchard && (
          <section aria-label={lt(orchard.alt)}>
            <HeroImage
              src={orchard.src}
              alt={lt(orchard.alt)}
              heightClass="h-44"
              className="rounded-3xl card-soft"
            />
          </section>
        )}

        {/* Cats */}
        <section className="space-y-3 pb-4" aria-labelledby="cats-h">
          <SectionHeader
            eyebrow={t("garden.cats")}
            title={t("cats.title")}
            subtitle={t("garden.catsSub")}
          />
          {catsImg && (
            <PhotoCard
              href="/cats"
              src={catsImg.src}
              alt={lt(catsImg.alt)}
              title={t("home.meetCats")}
              heightClass="h-48"
            />
          )}
        </section>
      </div>
    </div>
  );
}
