/**
 * Schuur 80 — House. Rooms overview, appliances directory, house guides.
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { devices, guides, media, rooms } from "@/lib/content";
import { SectionHeader, Callout } from "@/components/companion/Primitives";
import { PhotoCard, ListRow } from "@/components/companion/Cards";
import { DeviceIcon } from "@/components/companion/DeviceBits";
import { isPending } from "@/content/types";
import { Map } from "lucide-react";

const ROOM_GROUP_ORDER = ["living", "kitchen", "cinema", "garden", "utility"] as const;

export default function House() {
  const { t, lt } = useLanguage();
  const houseGuides = guides.filter((g) => g.category === "house");

  /* Editorial grouping: appliances clustered by the room they live in */
  const deviceGroups = ROOM_GROUP_ORDER.map((roomId) => ({
    roomId,
    items: devices.filter((d) => d.roomId === roomId),
  })).filter((g) => g.items.length > 0);

  const groupLabel = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId);
    if (room) return lt(room.name);
    return t(`house.group.${roomId}`);
  };

  return (
    <div className="space-y-8 px-4 pt-4">
      <SectionHeader
        eyebrow={t("nav.house")}
        title={t("house.title")}
        subtitle={t("house.subtitle")}
      />

      {/* House map placeholder per contract */}
      <Callout icon={<Map className="h-5 w-5" aria-hidden />} tone="terracotta">
        <p className="font-medium">{t("house.map")}</p>
        <p className="mt-0.5 text-[13px] text-muted-foreground">{t("house.mapPending")}</p>
      </Callout>

      {/* Rooms */}
      <section className="space-y-3" aria-labelledby="rooms-h">
        <p className="eyebrow" id="rooms-h">
          {t("house.rooms")}
        </p>
        <div className="grid grid-cols-1 gap-3">
          {rooms.map((room, i) => {
            const m = media(room.mediaId);
            return (
              <PhotoCard
                key={room.id}
                href={`/house/room/${room.id}`}
                src={m?.src ?? ""}
                alt={m ? lt(m.alt) : ""}
                title={lt(room.name)}
                subtitle={lt(room.tagline)}
                heightClass={i === 0 ? "h-52" : "h-44"}
                className="fade-rise"
                style={{ animationDelay: `${i * 40}ms` }}
              />
            );
          })}
        </div>
      </section>

      {/* Appliances */}
      <section className="space-y-3" aria-labelledby="devices-h">
        <p className="eyebrow" id="devices-h">
          {t("house.appliances")}
        </p>
        <div className="space-y-5">
          {deviceGroups.map(({ roomId, items }) => (
            <div key={roomId} className="space-y-2">
              <div className="flex items-center gap-3 px-1">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-nature">
                  {groupLabel(roomId)}
                </p>
                <span className="h-px flex-1 bg-border" aria-hidden />
              </div>
              <div className="space-y-2">
                {items.map((d) => (
                  <ListRow
                    key={d.id}
                    href={`/house/device/${d.id}`}
                    icon={<DeviceIcon name={d.icon} />}
                    title={lt(d.name)}
                    subtitle={
                      isPending(d.brandModel)
                        ? t("pending.label")
                        : (d.brandModel as string)
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* House guides */}
      {houseGuides.length > 0 && (
        <section className="space-y-3 pb-4" aria-labelledby="guides-h">
          <p className="eyebrow" id="guides-h">
            {t("house.guides")}
          </p>
          <div className="space-y-2.5">
            {houseGuides.map((g) => (
              <ListRow
                key={g.id}
                href={`/guide/${g.id}`}
                icon={<DeviceIcon name={g.icon} />}
                title={lt(g.name)}
                subtitle={lt(g.summary)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
