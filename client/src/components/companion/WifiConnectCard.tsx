/**
 * Schuur 80 — Barn Light design. Wi-Fi connect card.
 * Shows a scannable WIFI: QR code (one-tap join on iOS & Android cameras),
 * copy-SSID / copy-password buttons, and platform-tailored instructions.
 * While credentials are unconfirmed it renders a gentle pending state.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import { Copy, Check, Wifi, QrCode, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { WIFI, wifiQrPayload, detectPlatform } from "@/lib/wifiConfig";

function CopyRow({
  label,
  value,
  copiedText,
  copyLabel,
}: {
  label: string;
  value: string;
  copiedText: string;
  copyLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(copiedText);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("—");
    }
  };
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-secondary/60 px-4 py-3">
      <div className="min-w-0">
        <p className="text-[12px] uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="truncate font-mono text-[14.5px] text-foreground">{value}</p>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={copyLabel}
        className="flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-card px-3.5 text-[13px] font-medium text-primary shadow-sm transition-transform active:scale-[0.97]"
      >
        {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
        {copyLabel}
      </button>
    </div>
  );
}

export default function WifiConnectCard() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const platform = useMemo(() => detectPlatform(), []);

  useEffect(() => {
    if (!WIFI.confirmed || !canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, wifiQrPayload(), {
      width: 220,
      margin: 1,
      color: { dark: "#3d2f24", light: "#faf7f0" },
    }).catch(() => undefined);
  }, []);

  if (!WIFI.confirmed) {
    return (
      <div className="card-soft space-y-2 rounded-3xl border border-dashed border-primary/35 bg-primary/5 p-5">
        <p className="flex items-center gap-2 text-[14px] font-medium text-foreground">
          <QrCode className="h-4.5 w-4.5 text-primary" aria-hidden />
          {t("wifi.qrPendingTitle")}
        </p>
        <p className="text-[13.5px] leading-relaxed text-muted-foreground">
          {t("wifi.qrPendingBody")}
        </p>
      </div>
    );
  }

  const instructions =
    platform === "ios"
      ? t("wifi.instructionsIos")
      : platform === "android"
        ? t("wifi.instructionsAndroid")
        : t("wifi.instructionsDesktop");

  return (
    <div className="card-soft space-y-4 rounded-3xl bg-card p-5">
      <p className="flex items-center gap-2 text-[15px] font-medium text-foreground">
        <Wifi className="h-5 w-5 text-primary" aria-hidden />
        {t("wifi.connectTitle")}
      </p>

      <div className="flex flex-col items-center gap-3 rounded-2xl bg-secondary/50 p-4">
        <canvas ref={canvasRef} className="rounded-xl" aria-label={t("wifi.qrAlt")} />
        <p className="max-w-[260px] text-center text-[13px] leading-relaxed text-muted-foreground">
          {t("wifi.scanHint")}
        </p>
      </div>

      <div className="space-y-2">
        <CopyRow
          label={t("wifi.network")}
          value={WIFI.ssid}
          copiedText={t("wifi.copied")}
          copyLabel={t("wifi.copy")}
        />
        <CopyRow
          label={t("wifi.password")}
          value={WIFI.password}
          copiedText={t("wifi.copied")}
          copyLabel={t("wifi.copy")}
        />
      </div>

      <div className="flex gap-2.5 rounded-2xl bg-primary/8 p-3.5">
        <Smartphone className="mt-0.5 h-4.5 w-4.5 shrink-0 text-primary" aria-hidden />
        <p className="text-[13px] leading-relaxed text-foreground/85">{instructions}</p>
      </div>
    </div>
  );
}
