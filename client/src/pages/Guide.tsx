/**
 * Schuur 80 — Guide hub. Journey guides, area recommendations, FAQs, story.
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { guides, media } from "@/lib/content";
import { SectionHeader } from "@/components/companion/Primitives";
import { PhotoCard, ListRow } from "@/components/companion/Cards";
import { DeviceIcon } from "@/components/companion/DeviceBits";
import { KeyRound, DoorOpen, Trees, Flame, ScrollText, Recycle, MapPin, BookOpen, type LucideIcon } from "lucide-react";

const GUIDE_ICONS: Record<string, LucideIcon> = {
  "key-round": KeyRound,
  "door-open": DoorOpen,
  trees: Trees,
  flame: Flame,
  "scroll-text": ScrollText,
  recycle: Recycle,
};

export function GuideIcon({ name }: { name: string }) {
  const Icon = GUIDE_ICONS[name];
  if (Icon) return <Icon className="h-5 w-5" aria-hidden />;
  return <DeviceIcon name={name} />;
}

export default function Guide() {
  const { t, lt } = useLanguage();
  const story = media("story");

  return (
    <div className="space-y-8 px-4 pt-4">
      <SectionHeader
        eyebrow={t("nav.guide")}
        title={t("guide.title")}
        subtitle={t("guide.subtitle")}
      />

      <section className="space-y-2.5" aria-labelledby="journey-h">
        <p className="eyebrow" id="journey-h">
          {t("guide.journey")}
        </p>
        <div className="space-y-2.5">
          {guides.map((g) => (
            <ListRow
              key={g.id}
              href={`/guide/${g.id}`}
              icon={<GuideIcon name={g.icon} />}
              title={lt(g.name)}
              subtitle={lt(g.summary)}
            />
          ))}
        </div>
      </section>

      <section className="space-y-2.5" aria-labelledby="area-h">
        <p className="eyebrow" id="area-h">
          {t("guide.area")}
        </p>
        <ListRow
          href="/guide/area"
          icon={<MapPin className="h-5 w-5" aria-hidden />}
          title={t("home.recommendationsCard")}
          subtitle={t("home.recommendationsCardSub")}
        />
        <ListRow
          href="/guide/faqs"
          icon={<BookOpen className="h-5 w-5" aria-hidden />}
          title={t("guide.faqs")}
          subtitle={t("help.faqSub")}
        />
      </section>

      {story && (
        <section className="pb-4" aria-label={t("guide.story")}>
          <PhotoCard
            href="/story"
            src={story.src}
            alt={lt(story.alt)}
            eyebrow={t("guide.story")}
            title={t("home.storyTitle")}
            subtitle={t("home.storySub")}
            heightClass="h-44"
          />
        </section>
      )}
    </div>
  );
}
