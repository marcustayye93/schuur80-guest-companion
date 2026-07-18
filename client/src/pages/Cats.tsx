/**
 * Schuur 80 — The Animals directory & detail (cats, ducks, chickens).
 * Cats are presented as one group of 14 (4 kittens) — no individual profiles.
 */
import { Link, useRoute } from "wouter";
import { Cat as CatIcon, Bird, Egg, ChevronRight, PawPrint, Binoculars } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { catRules, cats, catsChallenge, catsIntro, media } from "@/lib/content";
import {
  HeroImage,
  MaybePendingText,
  StatusBadge,
  Callout,
} from "@/components/companion/Primitives";
import PageHeader from "@/components/companion/PageHeader";
import { isPending, type LocalizedString } from "@/content/types";
import NotFound from "./NotFound";

const ANIMAL_ICONS: Record<string, typeof CatIcon> = {
  cats: CatIcon,
  ducks: Bird,
  chickens: Egg,
};

function animalDisplayName(
  animal: (typeof cats)[number],
  lt: (v: LocalizedString) => string
) {
  return lt(animal.name as unknown as LocalizedString);
}

export function CatDirectory() {
  const { t, lt } = useLanguage();
  const catsImg = media("cats");

  return (
    <div>
      <PageHeader title={t("cats.title")} eyebrow={t("nav.garden")} backHref="/garden" />
      {catsImg && (
        <div className="px-4">
          <HeroImage
            src={catsImg.src}
            alt={lt(catsImg.alt)}
            heightClass="h-56"
            className="rounded-3xl card-soft"
          />
        </div>
      )}
      <div className="space-y-7 px-4 pt-5">
        <p className="text-[15px] leading-relaxed text-foreground/90">{lt(catsIntro)}</p>

        {/* Spot-them-all challenge banner */}
        <div className="card-soft flex items-start gap-3.5 rounded-3xl bg-[#64735A] p-5 text-white">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15">
            <Binoculars className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="font-serif text-[19px] font-semibold leading-snug">4 + 10 = 14</p>
            <p className="mt-1 text-[13.5px] leading-relaxed text-white/85">{lt(catsChallenge)}</p>
          </div>
        </div>

        <section className="space-y-2.5" aria-labelledby="animal-list">
          <p className="eyebrow" id="animal-list">
            {t("garden.catsSub")}
          </p>
          {cats.map((animal) => {
            const Icon = ANIMAL_ICONS[animal.id] ?? PawPrint;
            return (
              <Link
                key={animal.id}
                href={`/cats/${animal.id}`}
                className="pressable card-soft flex items-center gap-3.5 rounded-2xl bg-card p-4"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-serif text-[18px] font-semibold leading-snug text-foreground">
                    {animalDisplayName(animal, lt)}
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-snug text-muted-foreground line-clamp-2">
                    {isPending(animal.personality)
                      ? t("pending.label")
                      : lt(animal.personality as LocalizedString)}
                  </span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/60" aria-hidden />
              </Link>
            );
          })}
        </section>

        <section className="space-y-2.5 pb-4" aria-labelledby="cat-rules">
          <p className="eyebrow" id="cat-rules">
            {t("cats.rules")}
          </p>
          {catRules.map((rule, i) => (
            <Callout key={i} icon={<PawPrint className="h-5 w-5" aria-hidden />}>
              {lt(rule)}
            </Callout>
          ))}
        </section>
      </div>
    </div>
  );
}

export function CatDetail() {
  const [, params] = useRoute("/cats/:id");
  const { t, lt } = useLanguage();
  const cat = cats.find((c) => c.id === params?.id);
  if (!cat) return <NotFound />;

  const photo = media(cat.photoMediaId);
  const name = animalDisplayName(cat, lt);

  return (
    <div>
      <PageHeader title={name} eyebrow={t("cats.title")} backHref="/cats" />
      {photo && (
        <div className="px-4">
          <HeroImage
            src={photo.src}
            alt={lt(photo.alt)}
            heightClass="h-60"
            className="rounded-3xl card-soft"
          />
        </div>
      )}
      <div className="space-y-6 px-4 pt-5 pb-4">
        <section className="space-y-2" aria-labelledby="cat-pers">
          <p className="eyebrow" id="cat-pers">
            {t("cats.personality")}
          </p>
          <MaybePendingText value={cat.personality} compact />
        </section>

        <section className="space-y-2" aria-labelledby="cat-feed">
          <p className="eyebrow" id="cat-feed">
            {t("cats.feeding")}
          </p>
          <MaybePendingText value={cat.feeding} compact />
        </section>

        <section className="space-y-2" aria-labelledby="cat-notes">
          <p className="eyebrow" id="cat-notes">
            {t("cats.notes")}
          </p>
          <MaybePendingText value={cat.notes} compact />
        </section>

        <StatusBadge tone="nature">{t("offline.cached")}</StatusBadge>
      </div>
    </div>
  );
}
