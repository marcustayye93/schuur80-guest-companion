/**
 * Schuur 80 — Help hub. Emergency, FAQs, host contact, pending register, settings.
 */
import { Siren, BookOpen, MessageCircle, ClipboardList, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionHeader } from "@/components/companion/Primitives";
import { ListRow } from "@/components/companion/Cards";
import HostContactCard from "@/components/companion/HostContactCard";

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
          href="/settings"
          icon={<Settings className="h-5 w-5" aria-hidden />}
          title={t("settings.title")}
          subtitle={t("settings.languageSub")}
        />
      </div>

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
