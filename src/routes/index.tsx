import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { fetchProducts, type Product } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRight, Award, Hand, Leaf, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import heroImg from "@/assets/hero-carpet.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { t } = useI18n();
  const [featured, setFeatured] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts()
      .then((products) => setFeatured(products.slice(0, 3)))
      .catch(() => {});
  }, []);

  const features = [
    { icon: Hand, t: "home.why.1.t", d: "home.why.1.d" },
    { icon: Leaf, t: "home.why.2.t", d: "home.why.2.d" },
    { icon: Sparkles, t: "home.why.3.t", d: "home.why.3.d" },
  ];

  const awards = ["home.awards.1", "home.awards.2", "home.awards.3", "home.awards.4"];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt=""
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40 dark:from-background dark:via-background/90 dark:to-background/50" />
        </div>
        <div className="relative container mx-auto px-4 py-24 md:py-36 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-medium mb-6 animate-fade-in">
            <Sparkles className="w-3 h-3" /> 2012-yildan beri
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold leading-[1.1] mb-6 animate-fade-up">
            {t("hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl animate-fade-up">
            {t("hero.subtitle")}
          </p>
          <Link to="/products">
            <Button
              size="lg"
              className="text-base h-12 px-8 shadow-[var(--shadow-warm)] hover:scale-105 transition-transform"
            >
              {t("hero.cta")} <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">{t("home.featured")}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.length === 0
            ? // Skeleton loading
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-muted animate-pulse aspect-[3/4]" />
              ))
            : featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* About preview */}
      <section className="container mx-auto px-4 py-20">
        <div className="rounded-3xl bg-gradient-to-br from-secondary to-muted p-8 md:p-14 uzbek-pattern">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t("home.about.title")}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
              {t("home.about.text")}
            </p>
            <Link to="/about">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                {t("home.about.more")} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
            {t("home.why.title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.t}
              className="rounded-2xl bg-card border border-border p-8 hover:shadow-[var(--shadow-soft)] hover:-translate-y-1 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-xl mb-2">{t(f.t)}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t(f.d)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Awards */}
      <section className="container mx-auto px-4 pb-20">
        <div className="rounded-3xl bg-primary text-primary-foreground p-8 md:p-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pattern-border" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center">
              {t("home.awards.title")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {awards.map((a) => (
                <div key={a} className="text-center">
                  <Award className="w-8 h-8 mx-auto mb-3 text-accent" />
                  <p className="font-medium text-sm md:text-base">{t(a)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
