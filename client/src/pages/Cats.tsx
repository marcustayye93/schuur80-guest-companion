/**
 * Schuur 80 — Cat Directory & Cat Detail.
 * Names/profiles are pending until confirmed by the host (Placeholder Policy).
 */
import { Link, useRoute } from "wouter";
import { Cat as CatIcon, ChevronRight, PawPrint, Binoculars } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { catRules, cats, catsChallenge, catsIntro, media } from "@/lib/content";
import {
  HeroImage,
  PendingCard,
  MaybePendingText,
  StatusBadge,
  Callout,
} from "@/components/companion/Primitives";
import PageHeader from "@/components/companion/PageHeader";
import { isPending } from "@/content/types";
import NotFound from "./NotFound";

function catDisplayName(
  cat: (typeof cats)[number],
  t: (k: string) => string,
  lt: (v: import("@/content/types").LocalizedString) => string,
  index: number
) {
  if (isPending(cat.name)) return `${t("cats.fallbackName")} ${index + 1}`;
  return lt(cat.name as unknown as import("@/content/types").LocalizedString);
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

        <section className="space-y-2.5" aria-labelledby="cat-list">
          <p className="eyebrow" id="cat-list">
            {t("garden.catsSub")}
          </p>
          {cats.map((cat, i) => {
            const pendingName = isPending(cat.name);
            return (
              <Link
                key={cat.id}
                href={`/cats/${cat.id}`}
                className={cn(
                  "pressable flex items-center gap-3.5 rounded-2xl p-4",
                  pendingName
                    ? "border border-dashed border-amber-300/80 bg-amber-50/50"
                    : "card-soft bg-card"
                )}
              >
                <span
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
                    pendingName ? "bg-amber-100" : "bg-primary/10"
                  )}
                >
                  <CatIcon
                    className={cn(
                      "h-5 w-5",
                      pendingName ? "text-amber-700" : "text-primary"
                    )}
                    aria-hidden
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-serif text-[18px] font-semibold leading-snug text-foreground">
                    {catDisplayName(cat, t, lt, i)}
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-snug text-muted-foreground">
                    {pendingName
                      ? t("cats.pendingIntro")
                      : isPending(cat.personality)
                        ? t("pending.label")
                        : lt(cat.personality as import("@/content/types").LocalizedString)}
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
  const index = cats.findIndex((c) => c.id === params?.id);
  const cat = index >= 0 ? cats[index] : undefined;
  if (!cat) return <NotFound />;

  const photo = media(cat.photoMediaId);
  const name = catDisplayName(cat, t, lt, index);

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
        {isPending(cat.name) && <PendingCard pending={cat.name} />}

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
