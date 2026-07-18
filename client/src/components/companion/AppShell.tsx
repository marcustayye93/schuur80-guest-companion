/**
 * Schuur 80 — "Barn Light" app shell.
 * Persistent bottom navigation (Home, House, Garden, Guide, Help),
 * top bar with wordmark, search, language switcher and offline indicator.
 */
import { type ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Home,
  Warehouse,
  Trees,
  Map,
  LifeBuoy,
  Search,
  Globe,
  WifiOff,
  Check,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGUAGES, useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

/** Official Schuur 80 emblem — arched barn window/fanlight mark, recreated from the embroidered brand mark. */
export function BarnMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 116"
      fill="none"
      className={className}
      aria-hidden
      role="presentation"
      stroke="currentColor"
      strokeWidth="7"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      {/* arched outline: round arch top, straight sides, flat bottom */}
      <path d="M8 108V48a40 40 0 0 1 80 0v60H8Z" />
      {/* transom / springing line */}
      <path d="M8 48h80" />
      {/* lower horizontal */}
      <path d="M8 79h80" />
      {/* arch mullions */}
      <path d="M38 11v37M58 11v37" />
      {/* middle band: left stub mullion */}
      <path d="M30 48v31" />
      {/* right column running to the bottom */}
      <path d="M68 48v60" />
      {/* shelf inside right column */}
      <path d="M68 63h20" />
    </svg>
  );
}

export function useOnline() {
  const [online, setOnline] = useState(() => navigator.onLine);
  useEffect(() => {
    const up = () => setOnline(true);
    const down = () => setOnline(false);
    window.addEventListener("online", up);
    window.addEventListener("offline", down);
    return () => {
      window.removeEventListener("online", up);
      window.removeEventListener("offline", down);
    };
  }, []);
  return online;
}

const NAV_ITEMS = [
  { key: "home", href: "/", icon: Home },
  { key: "house", href: "/house", icon: Warehouse },
  { key: "garden", href: "/garden", icon: Trees },
  { key: "guide", href: "/guide", icon: Map },
  { key: "help", href: "/help", icon: LifeBuoy },
] as const;

function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={t("actions.language")}
          className="pressable flex h-10 w-10 items-center justify-center rounded-full bg-card card-soft"
        >
          <span className="sr-only">{t("actions.language")}</span>
          <span className="flex items-center gap-1 text-[12px] font-semibold uppercase text-foreground">
            <Globe className="h-4 w-4 text-primary" aria-hidden />
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40 rounded-2xl">
        {LANGUAGES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => setLang(l.code)}
            className="flex items-center justify-between rounded-xl text-[14px]"
          >
            {l.native}
            {lang === l.code && <Check className="h-4 w-4 text-primary" aria-hidden />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function AppShell({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  const [location] = useLocation();
  const online = useOnline();

  return (
    <div className="app-column relative flex min-h-dvh flex-col bg-background">
      {/* Top bar */}
      <header className="pt-safe sticky top-0 z-40 bg-background/90 backdrop-blur-md">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <Link href="/" className="flex items-center gap-2.5" aria-label={t("app.name")}>
            <BarnMark className="h-8 w-8 text-primary" />
            <span className="font-serif text-[22px] font-semibold leading-none text-foreground">
              Schuur <span className="text-primary">80</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            {!online && (
              <span
                className="flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1.5 text-[11px] font-medium text-amber-900"
                role="status"
              >
                <WifiOff className="h-3.5 w-3.5" aria-hidden />
                {t("offline.badge")}
              </span>
            )}
            <Link
              href="/search"
              aria-label={t("actions.search")}
              className="pressable flex h-10 w-10 items-center justify-center rounded-full bg-card card-soft"
            >
              <Search className="h-4 w-4 text-primary" aria-hidden />
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
        {!online && (
          <div className="bg-amber-100/80 px-4 py-1.5 text-center text-[12px] text-amber-900">
            {t("offline.banner")}
          </div>
        )}
      </header>

      {/* Page content */}
      <main className="flex-1 pb-28">{children}</main>

      {/* Bottom navigation */}
      <nav
        className="pb-safe fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-lg"
        aria-label="Main navigation"
      >
        <div className="card-soft mx-3 mb-3 flex items-stretch justify-between rounded-3xl border border-border/60 bg-card/95 px-2 py-1.5 backdrop-blur-md">
          {NAV_ITEMS.map(({ key, href, icon: Icon }) => {
            const active =
              href === "/" ? location === "/" : location.startsWith(href);
            return (
              <Link
                key={key}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "pressable flex min-w-14 flex-1 flex-col items-center gap-0.5 rounded-2xl px-1 py-2",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon
                  className={cn("h-5 w-5", active && "fill-primary/10")}
                  strokeWidth={active ? 2.2 : 1.8}
                  aria-hidden
                />
                <span
                  className={cn(
                    "text-[10.5px] leading-none",
                    active ? "font-semibold" : "font-medium"
                  )}
                >
                  {t(`nav.${key}`)}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
