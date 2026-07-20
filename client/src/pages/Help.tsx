/**
 * Schuur 80 — Help hub. Emergency, FAQs, host contact, pending register, settings.
 */
import { Siren, BookOpen, MessageCircle, MessageCircleQuestion, ClipboardList, Settings, QrCode, Smartphone, Wrench } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionHeader } from "@/components/companion/Primitives";
import { ListRow } from "@/components/companion/Cards";
import HostContactCard from "@/components/companion/HostContactCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/** Symptom-first troubleshooting: key prefix + optional deep link to the relevant device page. */
const TROUBLES: { key: string; href?: string }[] = [
  { key: "tsWifi", href: "/house/device/wifi-router" },
  { key: "tsCold" },
  { key: "tsProjector" },
  { key: "tsHotTub" },
  { key: "tsPower" },
];

export default function Help() {
  const { t } = useLanguage();

  return (
    <div className="space-y-7 px-4 pt-4">
      <SectionHeader
        eyebrow={t("nav.help")}
        title={t("help.title")}
        subtitle={t("help.subtitle")}
      />

      <div className="space-y-2.5">
        <ListRow
          href="/emergency"
          icon={<Siren className="h-5 w-5" aria-hidden />}
          title={t("help.emergency")}
          subtitle={t("help.emergencySub")}
          className="border border-destructive/20"
        />
        <ListRow
          href="/guide/faqs"
          icon={<BookOpen className="h-5 w-5" aria-hidden />}
          title={t("help.faq")}
          subtitle={t("help.faqSub")}
        />
        <ListRow
          href="/help/pending"
          icon={<ClipboardList className="h-5 w-5" aria-hidden />}
          title={t("help.pendingRegister")}
          subtitle={t("help.pendingRegisterSub")}
        />
        <ListRow
          href="/help/owner-questions"
          icon={<MessageCircleQuestion className="h-5 w-5" aria-hidden />}
          title={t("help.ownerQuestions")}
          subtitle={t("help.ownerQuestionsSub")}
        />
        <ListRow
          href="/settings"
          icon={<Settings className="h-5 w-5" aria-hidden />}
          title={t("settings.title")}
          subtitle={t("settings.languageSub")}
        />
        <ListRow
          href="/print/qr-card"
          icon={<QrCode className="h-5 w-5" aria-hidden />}
          title={t("help.printCard")}
          subtitle={t("help.printCardSub")}
        />
        <ListRow
          onClick={() => {
            try {
              localStorage.removeItem("schuur80.onboarded");
            } catch {
              /* ignore */
            }
            window.location.reload();
          }}
          icon={<Smartphone className="h-5 w-5" aria-hidden />}
          title={t("help.installApp")}
          subtitle={t("help.installAppSub")}
        />
      </div>

      <section className="space-y-2.5" aria-labelledby="troubleshoot-h">
        <p className="eyebrow flex items-center gap-1.5" id="troubleshoot-h">
          <Wrench className="h-3.5 w-3.5" aria-hidden />
          {t("help.troubleshooting")}
        </p>
        <p className="text-[13px] text-muted-foreground">{t("help.troubleshootingSub")}</p>
        <Accordion type="single" collapsible className="space-y-2">
          {TROUBLES.map(({ key, href }) => (
            <AccordionItem
              key={key}
              value={key}
              className="card-soft rounded-2xl border-none bg-card px-4"
            >
              <AccordionTrigger className="py-3.5 text-left text-[14px] font-medium text-foreground hover:no-underline">
                {t(`help.${key}Title`)}
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <p className="text-[13.5px] leading-relaxed text-foreground/85">
                  {t(`help.${key}Body`)}
                </p>
                {href && (
                  <Link
                    href={href}
                    className="mt-2 inline-block text-[13px] font-medium text-primary underline underline-offset-2"
                  >
                    {t("common.moreInfo")}
                  </Link>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="space-y-2.5 pb-4" aria-labelledby="contact-h">
        <p className="eyebrow" id="contact-h">
          {t("help.contact")}
        </p>
        <HostContactCard />
        <p className="flex items-center gap-2 text-[13px] text-muted-foreground">
          <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
          {t("help.contactSub")}
        </p>
      </section>
    </div>
  );
}
