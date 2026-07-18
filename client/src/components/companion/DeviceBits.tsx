/**
 * Schuur 80 — device/appliance UI bits. Icon mapping from JSON `icon` keys.
 */
import {
  Wifi,
  Flame,
  Thermometer,
  Wind,
  CookingPot,
  FlameKindling,
  Waves,
  Coffee,
  Projector,
  Bath,
  Beef,
  PlugZap,
  Shirt,
  ShieldAlert,
  Wrench,
  Sandwich,
  Armchair,
  Fan,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  wifi: Wifi,
  flame: Flame,
  thermometer: Thermometer,
  wind: Wind,
  "cooking-pot": CookingPot,
  "flame-kindling": FlameKindling,
  waves: Waves,
  coffee: Coffee,
  projector: Projector,
  bath: Bath,
  beef: Beef,
  "plug-zap": PlugZap,
  shirt: Shirt,
  "shield-alert": ShieldAlert,
  sandwich: Sandwich,
  armchair: Armchair,
  fan: Fan,
};

export function DeviceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? Wrench;
  return <Icon className={className ?? "h-5 w-5"} aria-hidden />;
}
