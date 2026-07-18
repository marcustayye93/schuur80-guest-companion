/**
 * Schuur 80 — Pending Content Register. Transparency page listing every
 * item still awaiting host confirmation (Placeholder Policy).
 * Style: distinctive amber/dashed "awaiting host confirmation" card
 * language, grouped editorially by area — never generic nav rows.
 */
import { Clock, CircleDashed } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { pendingRegister } from "@/lib/content";
import PageHeader from "@/components/companion/PageHeader";

export default function PendingRegister() {
  const { t, lt } = useLanguage();

  /* Group items by area label for editorial rhythm */
  const groups = new Map<string, typeof pendingRegister>();
  for (const item of pendingRegister) {
    const key = lt(item.area);
    const list = groups.get(key) ?? [];
    list.push(item);
    groups.set(key, list);
  }

  return (
    <div>
      <PageHeader
        title={t("help.pendingRegister")}
        eyebrow={t("nav.help")}
        backHref="/help"
      />
      <div className="space-y-5 px-4 pt-2 pb-4">
        <div className="rounded-2xl border border-dashed border-amber-400/70 bg-amber-50/70 p-4">
          <p className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-amber-950">
            <CircleDashed className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden />
            {t("help.pendingRegisterSub")}
          </p>
        </div>

        {Array.from(groups.entries()).map(([area, items]) => (
          <section key={area} className="space-y-2.5" aria-label={area}>
            <p className="eyebrow">{area}</p>
            <div className="overflow-hidden rounded-2xl border border-dashed border-amber-300/80 bg-amber-50/40">
              {items.map((item, i) => (
                <article
                  key={item.id}
                  className={
                    i > 0
                      ? "border-t border-dashed border-amber-200/90 px-4 py-3.5"
                      : "px-4 py-3.5"
                  }
                >
                  <h3 className="text-[15px] font-medium leading-snug text-foreground">
                    {lt(item.item)}
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                    {lt(item.status)}
                  </p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-[12px] font-medium text-amber-800">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    {t("pending.expectedLabel")}: {lt(item.expected)}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
