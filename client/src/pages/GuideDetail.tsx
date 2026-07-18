/**
 * Schuur 80 — Guide Detail. Timeline of steps (with pending placeholders)
 * and optional interactive checklist persisted in localStorage.
 */
import { useCallback, useEffect, useState } from "react";
import { useRoute } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { guideById, media } from "@/lib/content";
import { HeroImage, PendingCard } from "@/components/companion/Primitives";
import PageHeader from "@/components/companion/PageHeader";
import { ChecklistItem } from "@/components/companion/Cards";
import { isPending } from "@/content/types";
import NotFound from "./NotFound";

function useChecklist(guideId: string, count: number) {
  const key = `schuur80.checklist.${guideId}`;
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem(key) ?? "{}");
    } catch {
      return {};
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(checked));
    } catch {
      /* ignore */
    }
  }, [checked, key]);
  const toggle = useCallback(
    (id: string) => setChecked((c) => ({ ...c, [id]: !c[id] })),
    []
  );
  const done = Object.values(checked).filter(Boolean).length;
  return { checked, toggle, done, total: count };
}

export default function GuideDetail() {
  const [, params] = useRoute("/guide/:id");
  const { t, lt } = useLanguage();
  const guide = params ? guideById(params.id) : undefined;
  const checklistCount = guide?.checklist?.length ?? 0;
  const { checked, toggle, done, total } = useChecklist(
    guide?.id ?? "none",
    checklistCount
  );
  if (!guide) return <NotFound />;

  const m = media(guide.mediaId);

  return (
    <div>
      <PageHeader title={lt(guide.name)} eyebrow={t("nav.guide")} backHref="/guide" />
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
      <div className="space-y-7 px-4 pt-5">
        <p className="text-[15px] leading-relaxed text-muted-foreground">{lt(guide.summary)}</p>

        {/* Timeline of steps */}
        {guide.steps.length > 0 && (
          <section aria-labelledby="steps-h">
            <p className="eyebrow mb-3" id="steps-h">
              {t("common.steps")}
            </p>
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
          </section>
        )}

        {/* Checklist */}
        {guide.checklist && guide.checklist.length > 0 && (
          <section className="space-y-3 pb-4" aria-labelledby="check-h">
            <div className="flex items-center justify-between">
              <p className="eyebrow" id="check-h">
                {t("checkout.checklistTitle")}
              </p>
              <span className="rounded-full bg-nature/15 px-2.5 py-1 text-[12px] font-medium text-nature">
                {done}/{total} {t("checkout.progress")}
              </span>
            </div>
            <div className="space-y-2.5">
              {guide.checklist.map((item, i) => {
                const id = `${guide.id}-${i}`;
                return (
                  <ChecklistItem
                    key={id}
                    id={id}
                    label={lt(item.label)}
                    checked={Boolean(checked[id])}
                    onToggle={toggle}
                  />
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
