import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Savol-javob — Gilam & Kigiz" },
      { name: "description", content: "Eng ko'p so'raladigan savollar va javoblar." },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const { t } = useI18n();
  const items = [1, 2, 3, 4, 5, 6];
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 text-center animate-fade-up">{t("faq.title")}</h1>
      <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-10" />

      <Accordion type="single" collapsible className="space-y-3">
        {items.map((i) => (
          <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl border border-border bg-card px-6 data-[state=open]:shadow-[var(--shadow-soft)] transition-shadow">
            <AccordionTrigger className="text-left font-display font-semibold text-base md:text-lg hover:no-underline">
              {t(`faq.q${i}`)}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {t(`faq.a${i}`)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
