/**
 * Schuur 80 — Barn Light design. Printable QR welcome card (/print/qr-card).
 * A6-ish card in the signature sage green (#64735A) with the arched-window
 * emblem, an app QR (opens the PWA) and a Wi-Fi auto-connect QR.
 * Print button triggers window.print(); print CSS strips the app chrome.
 */
import { useEffect } from "react";
import QRCode from "qrcode";
import { Printer, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { WIFI, wifiQrPayload } from "@/lib/wifiConfig";
import { BarnMark } from "@/components/companion/AppShell";

const APP_URL = "https://marcustayye93.github.io/schuur80-guest-companion/";

/** Signature palette for print — sage green with cream. */
const GREEN = "#64735A";
const GREEN_DEEP = "#4a5744";
const CREAM = "#F5F1EA";

function Qr({
  payload,
  size,
  label,
  dark,
  light,
}: {
  payload: string;
  size: number;
  label: string;
  dark: string;
  light: string;
}) {
  const set = (el: HTMLCanvasElement | null) => {
    if (!el || !payload) return;
    QRCode.toCanvas(el, payload, {
      width: size,
      margin: 1,
      color: { dark, light },
    }).catch(() => undefined);
  };
  return <canvas ref={set} aria-label={label} style={{ width: size, height: size }} />;
}

export default function PrintQrCard() {
  const { t } = useLanguage();

  useEffect(() => {
    document.body.classList.add("print-qr-page");
    return () => document.body.classList.remove("print-qr-page");
  }, []);

  return (
    <div className="min-h-screen bg-secondary/40 pb-16">
      {/* Screen-only toolbar */}
      <div className="flex items-center justify-between px-4 py-4 print:hidden">
        <Link
          href="/help"
          className="flex items-center gap-1.5 text-[14px] font-medium text-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {t("printCard.back")}
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-medium text-white shadow-sm transition-transform active:scale-[0.97]"
          style={{ backgroundColor: GREEN }}
        >
          <Printer className="h-4 w-4" aria-hidden />
          {t("printCard.print")}
        </button>
      </div>

      <p className="mx-auto max-w-sm px-6 pb-4 text-center text-[13px] leading-relaxed text-muted-foreground print:hidden">
        {t("printCard.hint")}
      </p>

      {/* The card itself — signature green */}
      <div
        className="print-card mx-auto w-[105mm] overflow-hidden rounded-2xl shadow-lg print:rounded-none print:shadow-none"
        style={{ backgroundColor: GREEN }}
      >
        {/* Header band */}
        <div className="flex flex-col items-center px-[8mm] pt-[7mm] pb-[5mm] text-center">
          <span style={{ color: CREAM }}>
            <BarnMark className="h-12 w-12" />
          </span>
          <p className="mt-2 font-serif text-[22px] tracking-wide" style={{ color: CREAM }}>
            Schuur 80
          </p>
          <p
            className="mt-1 text-[10.5px] uppercase tracking-[0.22em]"
            style={{ color: "rgba(245,241,234,0.75)" }}
          >
            {t("printCard.tagline")}
          </p>
        </div>

        {/* QR panel */}
        <div
          className="mx-[6mm] mb-[6mm] rounded-xl px-[6mm] py-[5mm]"
          style={{ backgroundColor: CREAM }}
        >
          <div className="flex flex-col items-center text-center">
            <p
              className="text-[10.5px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: GREEN_DEEP }}
            >
              {t("printCard.appTitle")}
            </p>
            <div
              className="mt-2 rounded-lg border-2 bg-white p-2.5"
              style={{ borderColor: GREEN }}
            >
              <Qr
                payload={APP_URL}
                size={170}
                label={t("printCard.appQrAlt")}
                dark={GREEN_DEEP}
                light="#ffffff"
              />
            </div>
            <p
              className="mt-2 max-w-[68mm] text-[10.5px] leading-snug"
              style={{ color: "#4d463c" }}
            >
              {t("printCard.appQrCaption")}
            </p>

            {WIFI.confirmed && (
              <>
                <div
                  className="mt-3.5 mb-3 h-px w-full"
                  style={{ backgroundColor: "rgba(100,115,90,0.3)" }}
                />
                <p
                  className="text-[10.5px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: GREEN_DEEP }}
                >
                  {t("printCard.wifiTitle")}
                </p>
                <div
                  className="mt-2 rounded-lg border-2 bg-white p-2.5"
                  style={{ borderColor: GREEN }}
                >
                  <Qr
                    payload={wifiQrPayload()}
                    size={140}
                    label={t("printCard.wifiQrAlt")}
                    dark={GREEN_DEEP}
                    light="#ffffff"
                  />
                </div>
                <p
                  className="mt-2 max-w-[68mm] text-[10.5px] leading-snug"
                  style={{ color: "#4d463c" }}
                >
                  {t("printCard.wifiQrCaption")}
                </p>
                <p className="mt-1.5 font-mono text-[10px]" style={{ color: GREEN_DEEP }}>
                  {t("printCard.network")}: {WIFI.ssid} · {t("printCard.password")}: {WIFI.password}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <p
          className="pb-[5mm] text-center text-[9.5px] tracking-wide"
          style={{ color: "rgba(245,241,234,0.7)" }}
        >
          Perstraat 80 · 9120 Haasdonk
        </p>
      </div>
    </div>
  );
}
