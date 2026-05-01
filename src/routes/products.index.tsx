import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Mahsulotlar — Gilam & Kigiz" },
      { name: "description", content: "Barcha qo'lda to'qilgan gilam va kigiz mahsulotlari." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { t } = useI18n();
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12 animate-fade-up">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">{t("products.title")}</h1>
        <p className="text-muted-foreground text-lg">{t("products.subtitle")}</p>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-4" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
