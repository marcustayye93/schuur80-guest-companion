/**
 * Schuur 80 — FAQs. Accordion with pending answers rendered as placeholder cards.
 */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";
import { faqs } from "@/lib/content";
import { PendingCard } from "@/components/companion/Primitives";
import PageHeader from "@/components/companion/PageHeader";
import { isPending } from "@/content/types";

export default function Faqs() {
  const { t, lt } = useLanguage();

  return (
    <div>
      <PageHeader title={t("guide.faqs")} eyebrow={t("nav.guide")} backHref="/guide" />
      <div className="px-4 pt-2 pb-4">
        <Accordion type="single" collapsible className="space-y-2.5">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="card-soft rounded-2xl border-none bg-card px-4"
            >
              <AccordionTrigger className="py-4 text-left text-[15px] font-medium text-foreground hover:no-underline">
                {lt(faq.question)}
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                {isPending(faq.answer) ? (
                  <PendingCard pending={faq.answer} compact />
                ) : (
                  <p className="text-[14px] leading-relaxed text-foreground/85">
                    {lt(faq.answer)}
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
