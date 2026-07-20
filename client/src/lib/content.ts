/**
 * Schuur 80 — Barn Light design. Central content access layer.
 * All app content is JSON-driven; nothing is hardcoded in components.
 */
import roomsJson from "@/content/rooms.json";
import devicesJson from "@/content/devices.json";
import catsJson from "@/content/cats.json";
import guidesJson from "@/content/guides.json";
import faqsJson from "@/content/faqs.json";
import historyJson from "@/content/history.json";
import recommendationsJson from "@/content/recommendations.json";
import mediaJson from "@/content/media.json";
import pendingRegisterJson from "@/content/pending-register.json";
import ownerQuestionsJson from "@/content/owner-questions.json";
import type {
  Cat,
  Device,
  Faq,
  Guide,
  HistoryChapter,
  LocalizedString,
  MediaAsset,
  PendingContent,
  PendingRegisterItem,
  Recommendation,
  Room,
} from "@/content/types";

export const rooms = roomsJson.rooms as unknown as Room[];
export const devices = devicesJson.devices as unknown as Device[];
export const pendingDefaults = devicesJson.pendingDefaults as unknown as {
  status: LocalizedString;
  explanation: LocalizedString;
  expectedUpdate: LocalizedString;
};
export const cats = catsJson.cats as unknown as Cat[];
export const catsIntro = catsJson.intro as unknown as LocalizedString;
export const catsChallenge = catsJson.challenge as unknown as LocalizedString;
export const catRules = catsJson.generalRules as unknown as LocalizedString[];
export const guides = guidesJson.guides as unknown as Guide[];
export const faqs = faqsJson.faqs as unknown as Faq[];
export const historyChapters = historyJson.chapters as unknown as HistoryChapter[];
export const recommendations =
  recommendationsJson.recommendations as unknown as Recommendation[];
export const hostPicksPending =
  recommendationsJson.hostPicksPending as unknown as PendingContent;
/**
 * Media src resolution: media.json stores root-absolute paths like
 * "/manus-storage/x.jpg". When the app is served from a sub-path (GitHub
 * Pages project site), prefix them with Vite's BASE_URL so the images that
 * ship alongside the build resolve correctly. At "/" this is a no-op.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
export const mediaAssets = (mediaJson.assets as unknown as MediaAsset[]).map(
  (m) => ({
    ...m,
    src: m.src.startsWith("/") && BASE ? `${BASE}${m.src}` : m.src,
  })
);
export const pendingRegister =
  pendingRegisterJson.items as unknown as PendingRegisterItem[];

export interface OwnerQuestion {
  id: string;
  q: LocalizedString;
  lands: LocalizedString;
}

export interface OwnerQuestionGroup {
  id: string;
  title: LocalizedString;
  priority: "high" | "medium" | "low";
  questions: OwnerQuestion[];
}

export const ownerQuestions =
  ownerQuestionsJson.groups as unknown as OwnerQuestionGroup[];

const mediaById = new Map(mediaAssets.map((m) => [m.id, m]));

export function media(id: string | undefined): MediaAsset | undefined {
  return id ? mediaById.get(id) : undefined;
}

export function roomById(id: string): Room | undefined {
  return rooms.find((r) => r.id === id);
}

export function deviceById(id: string): Device | undefined {
  return devices.find((d) => d.id === id);
}

export function guideById(id: string): Guide | undefined {
  return guides.find((g) => g.id === id);
}

export function devicesForRoom(roomId: string): Device[] {
  return devices.filter((d) => d.roomId === roomId);
}
