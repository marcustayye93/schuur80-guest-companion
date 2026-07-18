/**
 * Schuur 80 Guest Companion — Content Model Types
 * Design: "Barn Light" — warm architectural calm. All content is JSON-driven.
 * Placeholder policy: unknown info is represented as { pending: true, ... } and
 * never invented. See pending-register.json for the Pending Content Register.
 */

/** A translatable string keyed by language code, English fallback required. */
export interface LocalizedString {
  en: string;
  nl?: string;
  fr?: string;
  de?: string;
}

/** Placeholder for content not yet confirmed by the host. */
export interface PendingContent {
  pending: true;
  /** Status label, e.g. "Awaiting host confirmation" */
  status: LocalizedString;
  /** Why this information is not yet available */
  explanation: LocalizedString;
  /** When an update is expected */
  expectedUpdate: LocalizedString;
}

export type MaybePending<T> = T | PendingContent;

export function isPending(value: unknown): value is PendingContent {
  return (
    typeof value === "object" &&
    value !== null &&
    (value as PendingContent).pending === true
  );
}

export interface MediaAsset {
  id: string;
  src: string;
  alt: LocalizedString;
  aspect?: string;
}

export interface Room {
  id: string;
  category: "living" | "kitchen" | "bedroom" | "bathroom" | "cinema" | "bar" | "utility";
  name: LocalizedString;
  tagline: LocalizedString;
  description: MaybePending<LocalizedString>;
  mediaId: string;
  features: LocalizedString[];
  deviceIds: string[];
  guideIds: string[];
}

export interface Device {
  id: string;
  roomId: string;
  name: LocalizedString;
  brandModel: MaybePending<string>;
  icon: string;
  instructions: MaybePending<{ steps: LocalizedString[] }>;
  tips?: LocalizedString[];
}

export interface Cat {
  id: string;
  name: MaybePending<string>;
  photoMediaId: string;
  personality: MaybePending<LocalizedString>;
  feeding: MaybePending<LocalizedString>;
  notes: MaybePending<LocalizedString>;
}

export interface GuideStep {
  title: LocalizedString;
  body: MaybePending<LocalizedString>;
}

export interface Guide {
  id: string;
  category: "arrival" | "checkout" | "house" | "garden" | "safety";
  name: LocalizedString;
  summary: LocalizedString;
  icon: string;
  mediaId?: string;
  steps: GuideStep[];
  checklist?: { label: LocalizedString; pendingDetail?: PendingContent }[];
}

export interface Faq {
  id: string;
  category: string;
  question: LocalizedString;
  answer: MaybePending<LocalizedString>;
}

export interface HistoryChapter {
  id: string;
  era: LocalizedString;
  title: LocalizedString;
  body: MaybePending<LocalizedString>;
  mediaId?: string;
}

export interface Recommendation {
  id: string;
  category: "city" | "culture" | "food" | "nature" | "family";
  name: string;
  distance: LocalizedString;
  description: LocalizedString;
  url?: string;
  hostTip?: MaybePending<LocalizedString>;
}

export interface PendingRegisterItem {
  id: string;
  area: LocalizedString;
  item: LocalizedString;
  status: LocalizedString;
  expected: LocalizedString;
}
