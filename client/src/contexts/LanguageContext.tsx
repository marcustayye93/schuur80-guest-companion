/**
 * Schuur 80 — Barn Light design. Language context: EN/NL/FR/DE with EN fallback.
 * UI strings come from /translations/{lang}.json; content strings are
 * LocalizedString objects resolved with the `lt` helper.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import en from "@/translations/en.json";
import nl from "@/translations/nl.json";
import fr from "@/translations/fr.json";
import de from "@/translations/de.json";
import type { LocalizedString } from "@/content/types";

export type Lang = "en" | "nl" | "fr" | "de";

export const LANGUAGES: { code: Lang; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "nl", label: "Dutch", native: "Nederlands" },
  { code: "fr", label: "French", native: "Français" },
  { code: "de", label: "German", native: "Deutsch" },
];

const DICTS: Record<Lang, Record<string, unknown>> = { en, nl, fr, de };

const STORAGE_KEY = "schuur80.lang";

function detectLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && ["en", "nl", "fr", "de"].includes(stored)) return stored as Lang;
  } catch {
    /* ignore */
  }
  const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
  if (["en", "nl", "fr", "de"].includes(nav)) return nav as Lang;
  return "en";
}

function lookup(dict: Record<string, unknown>, key: string): string | undefined {
  const parts = key.split(".");
  let cur: unknown = dict;
  for (const p of parts) {
    if (typeof cur !== "object" || cur === null) return undefined;
    cur = (cur as Record<string, unknown>)[p];
  }
  return typeof cur === "string" ? cur : undefined;
}

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Translate a UI string key, e.g. t("nav.home"). English fallback. */
  t: (key: string) => string;
  /** Resolve a LocalizedString content object. English fallback. */
  lt: (ls: LocalizedString | undefined) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    (key: string) => lookup(DICTS[lang], key) ?? lookup(DICTS.en, key) ?? key,
    [lang]
  );

  const lt = useCallback(
    (ls: LocalizedString | undefined) => {
      if (!ls) return "";
      return ls[lang] ?? ls.en ?? "";
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t, lt }), [lang, setLang, t, lt]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
