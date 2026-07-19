/**
 * Schuur 80 — Barn Light design. Central Wi-Fi configuration.
 *
 * ONE place to set the real credentials once the owners confirm them:
 *   1. Set `confirmed` to true
 *   2. Fill in `ssid` and `password`
 *   3. Bump the service-worker VERSION and redeploy
 *
 * While `confirmed` is false, the app shows a "pending" state instead of
 * the QR code and never displays placeholder credentials to guests.
 */
export interface WifiConfig {
  confirmed: boolean;
  ssid: string;
  password: string;
  /** WPA | WEP | nopass */
  security: "WPA" | "WEP" | "nopass";
  hidden: boolean;
}

export const WIFI: WifiConfig = {
  confirmed: true,
  ssid: "Schuur80",
  password: "Schuur80",
  security: "WPA",
  hidden: false,
};

/** Escape special characters per the WIFI: QR string spec. */
function esc(v: string): string {
  return v.replace(/([\\;,:"])/g, "\\$1");
}

/** Build the standard WIFI: payload recognized by iOS and Android cameras. */
export function wifiQrPayload(cfg: WifiConfig = WIFI): string {
  const parts = [
    `WIFI:T:${cfg.security};`,
    `S:${esc(cfg.ssid)};`,
    cfg.security === "nopass" ? "" : `P:${esc(cfg.password)};`,
    cfg.hidden ? "H:true;" : "",
    ";",
  ];
  return parts.join("");
}

export type Platform = "ios" | "android" | "desktop";

/** Best-effort platform detection for tailored connect instructions. */
export function detectPlatform(): Platform {
  const ua = navigator.userAgent || "";
  const isIpadOs =
    navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  if (/iPhone|iPad|iPod/i.test(ua) || isIpadOs) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "desktop";
}
