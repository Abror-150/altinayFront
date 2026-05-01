import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Biz haqimizda — Gilam & Kigiz" },
      { name: "description", content: "2012-yildan beri an'anaviy o'zbek gilam va kigiz ishlab chiqaramiz." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useI18n();
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 animate-fade-up">{t("about.title")}</h1>
      <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-8" />
      <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-10">{t("about.p1")}</p>

      <div className="rounded-3xl bg-secondary/40 border border-border p-8 uzbek-pattern">
        <h2 className="text-2xl font-display font-bold mb-4">{t("about.activity")}</h2>
        <p className="text-base text-foreground/90 leading-relaxed">{t("about.p2")}</p>
      </div>
    </div>
  );
}
