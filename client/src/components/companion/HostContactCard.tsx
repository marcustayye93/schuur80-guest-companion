/**
 * Schuur 80 — Host contact card ("Barn Light" style).
 * Official contact details from the Schuur 80 name card:
 * +32 477 78 30 42 · info@schuur80.be · schuur80.be
 */
import { Phone, Mail, Globe, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const HOST_CONTACT = {
  phoneDisplay: "+32 477 78 30 42",
  phoneHref: "tel:+32477783042",
  email: "info@schuur80.be",
  emailHref: "mailto:info@schuur80.be",
  websiteDisplay: "schuur80.be",
  websiteHref: "https://schuur80.be",
  whatsappHref: "https://wa.me/32477783042",
} as const;

export default function HostContactCard() {
  const { t } = useLanguage();
  const rows = [
    {
      key: "phone",
      icon: Phone,
      label: t("contact.call"),
      value: HOST_CONTACT.phoneDisplay,
      href: HOST_CONTACT.phoneHref,
      external: false,
    },
    {
      key: "whatsapp",
      icon: MessageCircle,
      label: t("contact.whatsapp"),
      value: HOST_CONTACT.phoneDisplay,
      href: HOST_CONTACT.whatsappHref,
      external: true,
    },
    {
      key: "email",
      icon: Mail,
      label: t("contact.email"),
      value: HOST_CONTACT.email,
      href: HOST_CONTACT.emailHref,
      external: false,
    },
    {
      key: "website",
      icon: Globe,
      label: t("contact.website"),
      value: HOST_CONTACT.websiteDisplay,
      href: HOST_CONTACT.websiteHref,
      external: true,
    },
  ] as const;

  return (
    <div className="space-y-2.5">
      {rows.map(({ key, icon: Icon, label, value, href, external }) => (
        <a
          key={key}
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="pressable card-soft flex items-center gap-3 rounded-2xl bg-card p-4 text-foreground"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[13px] text-muted-foreground">{label}</span>
            <span className="block truncate text-[15px] font-medium">{value}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
