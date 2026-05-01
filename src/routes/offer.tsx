import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/offer")({
  head: () => ({
    meta: [{ title: "Oferta — Gilam & Kigiz" }],
  }),
  component: OfferPage,
});

function OfferPage() {
  const { t } = useI18n();
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-display font-bold mb-6">{t("offer.title")}</h1>
      <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-8" />
      <p className="text-base md:text-lg leading-relaxed text-foreground/90">{t("offer.text")}</p>
    </div>
  );
}
