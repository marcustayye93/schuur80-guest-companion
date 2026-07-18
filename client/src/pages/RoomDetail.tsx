/**
 * Schuur 80 — Room Detail. Hero image, description, features, devices, guides.
 */
import { useRoute } from "wouter";
import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { devicesForRoom, guideById, media, roomById } from "@/lib/content";
import { HeroImage, MaybePendingText } from "@/components/companion/Primitives";
import PageHeader from "@/components/companion/PageHeader";
import { ListRow } from "@/components/companion/Cards";
import { DeviceIcon } from "@/components/companion/DeviceBits";
import { isPending } from "@/content/types";
import NotFound from "./NotFound";

export default function RoomDetail() {
  const [, params] = useRoute("/house/room/:id");
  const { t, lt } = useLanguage();
  const room = params ? roomById(params.id) : undefined;
  if (!room) return <NotFound />;

  const m = media(room.mediaId);
  const roomDevices = devicesForRoom(room.id);
  const roomGuides = room.guideIds
    .map((id) => guideById(id))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  return (
    <div>
      <PageHeader title={lt(room.name)} eyebrow={t("nav.house")} backHref="/house" />
      {m && (
        <div className="px-4">
          <HeroImage
            src={m.src}
            alt={lt(m.alt)}
            heightClass="h-60"
            className="rounded-3xl card-soft"
          />
        </div>
      )}
      <div className="space-y-7 px-4 pt-5">
        <MaybePendingText value={room.description} />

        {room.features.length > 0 && (
          <section className="space-y-2.5" aria-labelledby="feat-h">
            <p className="eyebrow" id="feat-h">
              {t("house.features")}
            </p>
            <ul className="grid grid-cols-2 gap-2">
              {room.features.map((f, i) => (
                <li
                  key={i}
                  className="card-soft flex items-center gap-2 rounded-2xl bg-card px-3 py-2.5 text-[13.5px] text-foreground"
                >
                  <Check className="h-4 w-4 shrink-0 text-nature" aria-hidden />
                  {lt(f)}
                </li>
              ))}
            </ul>
          </section>
        )}

        {roomDevices.length > 0 && (
          <section className="space-y-2.5" aria-labelledby="dev-h">
            <p className="eyebrow" id="dev-h">
              {t("house.appliances")}
            </p>
            <div className="space-y-2.5">
              {roomDevices.map((d) => (
                <ListRow
                  key={d.id}
                  href={`/house/device/${d.id}`}
                  icon={<DeviceIcon name={d.icon} />}
                  title={lt(d.name)}
                  subtitle={
                    isPending(d.brandModel) ? t("pending.label") : (d.brandModel as string)
                  }
                />
              ))}
            </div>
          </section>
        )}

        {roomGuides.length > 0 && (
          <section className="space-y-2.5 pb-4" aria-labelledby="rg-h">
            <p className="eyebrow" id="rg-h">
              {t("house.guides")}
            </p>
            <div className="space-y-2.5">
              {roomGuides.map((g) => (
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
    </div>
  );
}
