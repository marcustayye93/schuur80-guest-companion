/**
 * Schuur 80 — Appliance Guide Template. Data-driven device page with
 * model, step instructions (or pending placeholder), and tips.
 */
import { useRoute, Link } from "wouter";
import { Lightbulb } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { deviceById, roomById } from "@/lib/content";
import { PendingCard, Callout, StatusBadge } from "@/components/companion/Primitives";
import PageHeader from "@/components/companion/PageHeader";
import { DeviceIcon } from "@/components/companion/DeviceBits";
import { isPending } from "@/content/types";
import NotFound from "./NotFound";

export default function DeviceDetail() {
  const [, params] = useRoute("/house/device/:id");
  const { t, lt } = useLanguage();
  const device = params ? deviceById(params.id) : undefined;
  if (!device) return <NotFound />;

  const room = roomById(device.roomId);

  return (
    <div>
      <PageHeader title={lt(device.name)} eyebrow={t("house.appliances")} backHref="/house" />
      <div className="space-y-6 px-4 pt-2">
        {/* Identity card */}
        <div className="card-soft flex items-center gap-4 rounded-3xl bg-card p-5">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
            <DeviceIcon name={device.icon} className="h-7 w-7" />
          </span>
          <div className="min-w-0 space-y-1">
            <p className="text-[15px] font-medium text-foreground">{lt(device.name)}</p>
            {device.brandModel !== undefined && !isPending(device.brandModel) && (
              <p className="text-[13px] text-muted-foreground">
                {t("common.model")}: {device.brandModel as string}
              </p>
            )}
            {room && (
              <Link
                href={`/house/room/${room.id}`}
                className="text-[13px] font-medium text-primary underline-offset-2 hover:underline"
              >
                {lt(room.name)}
              </Link>
            )}
          </div>
        </div>

        {/* Instructions */}
        <section className="space-y-2.5" aria-labelledby="steps-h">
          <p className="eyebrow" id="steps-h">
            {t("common.steps")}
          </p>
          {isPending(device.instructions) ? (
            <PendingCard pending={device.instructions} />
          ) : (
            <ol className="space-y-2.5">
              {device.instructions.steps.map((s, i) => (
                <li key={i} className="card-soft flex gap-3 rounded-2xl bg-card p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/12 font-serif text-[15px] font-semibold text-primary">
                    {i + 1}
                  </span>
                  <p className="text-[14.5px] leading-relaxed text-foreground/90">{lt(s)}</p>
                </li>
              ))}
            </ol>
          )}
        </section>

        {/* Tips */}
        {device.tips && device.tips.length > 0 && (
          <section className="space-y-2.5 pb-4" aria-labelledby="tips-h">
            <p className="eyebrow" id="tips-h">
              {t("common.tips")}
            </p>
            {device.tips.map((tip, i) => (
              <Callout key={i} icon={<Lightbulb className="h-5 w-5" aria-hidden />}>
                {lt(tip)}
              </Callout>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
