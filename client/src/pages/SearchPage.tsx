/**
 * Schuur 80 — Search. Client-side index across rooms, devices, guides,
 * FAQs, recommendations and cats. Works offline by design.
 */
import { useMemo, useState } from "react";
import { SearchX, Search as SearchIcon } from "lucide-react";
import { useLanguage, type Lang } from "@/contexts/LanguageContext";
import {
  cats,
  devices,
  faqs,
  guides,
  recommendations,
  rooms,
} from "@/lib/content";
import PageHeader from "@/components/companion/PageHeader";
import { ListRow } from "@/components/companion/Cards";
import { DeviceIcon } from "@/components/companion/DeviceBits";
import { isPending, type LocalizedString } from "@/content/types";
import {
  Warehouse,
  BookOpen,
  MapPin,
  Cat as CatIcon,
  HelpCircle,
} from "lucide-react";

interface SearchDoc {
  section: "rooms" | "devices" | "guides" | "faqs" | "recommendations" | "cats";
  href: string;
  title: LocalizedString | string;
  subtitle?: LocalizedString | string;
  haystack: string;
}

function textOf(ls: LocalizedString | string | undefined): string {
  if (!ls) return "";
  if (typeof ls === "string") return ls;
  return Object.values(ls).join(" ");
}

function buildIndex(): SearchDoc[] {
  const docs: SearchDoc[] = [];
  for (const r of rooms) {
    docs.push({
      section: "rooms",
      href: `/house/room/${r.id}`,
      title: r.name,
      subtitle: r.tagline,
      haystack: [
        textOf(r.name),
        textOf(r.tagline),
        isPending(r.description) ? "" : textOf(r.description),
        ...r.features.map(textOf),
      ]
        .join(" ")
        .toLowerCase(),
    });
  }
  for (const d of devices) {
    docs.push({
      section: "devices",
      href: `/house/device/${d.id}`,
      title: d.name,
      haystack: [textOf(d.name), ...(d.tips ?? []).map(textOf)].join(" ").toLowerCase(),
    });
  }
  for (const g of guides) {
    docs.push({
      section: "guides",
      href: `/guide/${g.id}`,
      title: g.name,
      subtitle: g.summary,
      haystack: [
        textOf(g.name),
        textOf(g.summary),
        ...g.steps.map((s) => textOf(s.title) + " " + (isPending(s.body) ? "" : textOf(s.body))),
      ]
        .join(" ")
        .toLowerCase(),
    });
  }
  for (const f of faqs) {
    docs.push({
      section: "faqs",
      href: "/guide/faqs",
      title: f.question,
      haystack: [textOf(f.question), isPending(f.answer) ? "" : textOf(f.answer)]
        .join(" ")
        .toLowerCase(),
    });
  }
  for (const rec of recommendations) {
    docs.push({
      section: "recommendations",
      href: "/guide/area",
      title: rec.name,
      subtitle: rec.distance,
      haystack: [rec.name, textOf(rec.distance), textOf(rec.description)]
        .join(" ")
        .toLowerCase(),
    });
  }
  cats.forEach((c, i) => {
    docs.push({
      section: "cats",
      href: `/cats/${c.id}`,
      title: isPending(c.name) ? `Cat ${i + 1}` : (c.name as string),
      haystack: ["cat kat chat katze poes", isPending(c.name) ? "" : (c.name as string)]
        .join(" ")
        .toLowerCase(),
    });
  });
  return docs;
}

const SECTION_ICONS = {
  rooms: Warehouse,
  devices: null,
  guides: BookOpen,
  faqs: HelpCircle,
  recommendations: MapPin,
  cats: CatIcon,
} as const;

export default function SearchPage() {
  const { t, lt, lang } = useLanguage();
  const [query, setQuery] = useState("");
  const index = useMemo(buildIndex, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return null;
    const terms = q.split(/\s+/);
    return index.filter((doc) => terms.every((term) => doc.haystack.includes(term)));
  }, [query, index]);

  const grouped = useMemo(() => {
    if (!results) return null;
    const map = new Map<string, SearchDoc[]>();
    for (const doc of results) {
      const arr = map.get(doc.section) ?? [];
      arr.push(doc);
      map.set(doc.section, arr);
    }
    return map;
  }, [results]);

  const resolve = (v: LocalizedString | string | undefined) =>
    typeof v === "string" ? v : v ? (v[lang as Lang] ?? v.en) : "";

  return (
    <div>
      <PageHeader title={t("search.title")} eyebrow={t("actions.search")} backHref="/" />
      <div className="space-y-6 px-4 pt-1 pb-4">
        <div className="card-soft flex items-center gap-3 rounded-2xl bg-card px-4 py-1">
          <SearchIcon className="h-4.5 w-4.5 shrink-0 text-primary" aria-hidden />
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("actions.searchPlaceholder")}
            aria-label={t("actions.search")}
            className="h-12 w-full bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted-foreground/70"
          />
        </div>

        {grouped && grouped.size === 0 && (
          <div className="flex flex-col items-center gap-3 py-14 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
              <SearchX className="h-6 w-6 text-muted-foreground" aria-hidden />
            </span>
            <p className="text-[15px] font-medium text-foreground">
              {t("search.noResults")} “{query.trim()}”
            </p>
            <p className="text-[13px] text-muted-foreground">{t("search.noResultsHint")}</p>
          </div>
        )}

        {grouped &&
          Array.from(grouped.entries()).map(([section, docs]: [string, SearchDoc[]]) => {
            const Icon = SECTION_ICONS[section as keyof typeof SECTION_ICONS];
            return (
              <section key={section} className="space-y-2.5" aria-label={t(`search.sections.${section}`)}>
                <p className="eyebrow">{t(`search.sections.${section}`)}</p>
                {docs.map((doc, i) => (
                  <ListRow
                    key={`${section}-${i}`}
                    href={doc.href}
                    icon={
                      Icon ? (
                        <Icon className="h-5 w-5" aria-hidden />
                      ) : (
                        <DeviceIcon name="wrench" />
                      )
                    }
                    title={resolve(doc.title)}
                    subtitle={doc.subtitle ? resolve(doc.subtitle) : undefined}
                  />
                ))}
              </section>
            );
          })}
      </div>
    </div>
  );
}
