/**
 * Schuur 80 — Questions for the Owners. A review page for the property
 * owners: every open question awaiting their answer, grouped by topic
 * with priority badges. Style: Barn Light editorial — sage-tinted
 * review cards, distinct from the amber pending register.
 */
import { ClipboardList, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ownerQuestions } from "@/lib/content";
import PageHeader from "@/components/companion/PageHeader";

const PRIORITY_STYLES: Record<string, string> = {
  high: "bg-red-100 text-red-900 border-red-200",
  medium: "bg-amber-100 text-amber-900 border-amber-200",
  low: "bg-stone-100 text-stone-700 border-stone-200",
};

export default function OwnerQuestions() {
  const { t, lt } = useLanguage();

  const total = ownerQuestions.reduce((n, g) => n + g.questions.length, 0);

  return (
    <div>
      <PageHeader
        title={t("ownerq.title")}
        eyebrow={t("nav.help")}
        backHref="/help"
      />
      <div className="space-y-5 px-4 pt-2 pb-4">
        <div className="rounded-2xl border border-primary/25 bg-primary/5 p-4">
          <p className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-foreground">
            <ClipboardList
              className="mt-0.5 h-4 w-4 shrink-0 text-primary"
              aria-hidden
            />
            <span>
              {t("ownerq.intro")}{" "}
              <span className="font-medium">
                {t("ownerq.count").replace("{n}", String(total))}
              </span>
            </span>
          </p>
        </div>

        {ownerQuestions.map((group) => (
          <section
            key={group.id}
            className="space-y-2.5"
            aria-label={lt(group.title)}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="eyebrow">{lt(group.title)}</p>
              <span
                className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${PRIORITY_STYLES[group.priority]}`}
              >
                {t(`ownerq.priority${group.priority.charAt(0).toUpperCase() + group.priority.slice(1)}`)}
              </span>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              {group.questions.map((item, i) => (
                <article
                  key={item.id}
                  className={
                    i > 0 ? "border-t border-border px-4 py-3.5" : "px-4 py-3.5"
                  }
                >
                  <h3 className="text-[15px] font-medium leading-snug text-foreground">
                    {lt(item.q)}
                  </h3>
                  <p className="mt-1.5 flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    {t("ownerq.landsLabel")}: {lt(item.lands)}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ))}

        <p className="px-1 text-[12.5px] leading-relaxed text-muted-foreground">
          {t("ownerq.footer")}
        </p>
      </div>
    </div>
  );
}
