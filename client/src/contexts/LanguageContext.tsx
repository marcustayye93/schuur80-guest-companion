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
import zh from "@/translations/zh.json";
import ko from "@/translations/ko.json";
import ja from "@/translations/ja.json";
import type { LocalizedString } from "@/content/types";

export type Lang = "en" | "nl" | "fr" | "de" | "zh" | "ko" | "ja";

export const LANGUAGES: { code: Lang; label: string; native: string; flag: string }[] = [
  { code: "en", label: "English", native: "English", flag: "🇬🇧" },
  { code: "nl", label: "Dutch", native: "Nederlands", flag: "🇳🇱" },
  { code: "fr", label: "French", native: "Français", flag: "🇫🇷" },
  { code: "de", label: "German", native: "Deutsch", flag: "🇩🇪" },
  { code: "zh", label: "Chinese", native: "中文", flag: "🇨🇳" },
  { code: "ko", label: "Korean", native: "한국어", flag: "🇰🇷" },
  { code: "ja", label: "Japanese", native: "日本語", flag: "🇯🇵" },
];

const DICTS: Record<Lang, Record<string, unknown>> = { en, nl, fr, de, zh, ko, ja };

const LANG_CODES = ["en", "nl", "fr", "de", "zh", "ko", "ja"];

const STORAGE_KEY = "schuur80.lang";

function detectLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && LANG_CODES.includes(stored)) return stored as Lang;
  } catch {
    /* ignore */
  }
  // First visit: walk the full preference list of the phone/browser so a
  // guest whose order is e.g. [ko-KR, en-US] lands on Korean automatically.
  const prefs = navigator.languages?.length ? navigator.languages : [navigator.language || "en"];
  for (const pref of prefs) {
    const code = pref.slice(0, 2).toLowerCase();
    if (LANG_CODES.includes(code)) return code as Lang;
  }
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
