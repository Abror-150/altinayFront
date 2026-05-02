import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { fetchProduct, type Product } from "@/lib/products";
import { useI18n, formatPrice } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { Minus, Plus, ArrowLeft, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/products/$id")({
  component: ProductDetail,
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-display font-bold mb-4">404</h1>
      <Link to="/products" className="text-primary hover:underline">
        Mahsulotlarga qaytish
      </Link>
    </div>
  ),
});

function ProductDetail() {
  const { id } = Route.useParams();
  const { lang, t } = useI18n();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProduct(id)
      .then((data) => {
        if (!data) setError("Mahsulot topilmadi.");
        else setProduct(data);
      })

      .catch(() => setError("Mahsulotni yuklashda xatolik yuz berdi."))
      .finally(() => setLoading(false));
  }, [id]);
  useEffect(() => {
    if (product) {
      console.log("VIDEO:", product.video);
      console.log("IMAGE:", product.image);
    }
  }, [product]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">
        Yuklanmoqda...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-display font-bold mb-4">Mahsulot topilmadi</h1>
        <Link to="/products" className="text-primary hover:underline">
          Mahsulotlarga qaytish
        </Link>
      </div>
    );
  }

  const total = product.price * qty;

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> {t("product.back")}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        {/* Chap tomon — rasm + video */}
        <div className="flex flex-col gap-4">
          <div className="rounded-3xl overflow-hidden bg-muted aspect-square shadow-[var(--shadow-warm)]">
            <img
              src={product.image}
              alt={product.name[lang]}
              width={1024}
              height={1024}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Video — faqat mavjud bo'lsa */}
          {product.video && (
            <div className="rounded-3xl overflow-hidden bg-muted shadow-[var(--shadow-warm)]">
              <video
                src={product.video}
                controls
                playsInline
                poster={product.image}
                className="w-full rounded-3xl"
              >
                Brauzeringiz videoni qo'llab-quvvatlamaydi.
              </video>
            </div>
          )}
        </div>

        {/* O'ng tomon — ma'lumotlar */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">{product.name[lang]}</h1>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            {product.shortDesc[lang]}
          </p>

          <div className="rounded-2xl bg-secondary/50 p-6 mb-6 border border-border">
            <div className="text-sm text-muted-foreground mb-1">{t("product.price")}</div>
            <div className="text-3xl font-display font-bold text-accent">
              {formatPrice(total, lang)}
            </div>
          </div>

          <div className="mb-6">
            <div className="text-sm font-medium mb-2">{t("product.qty")}</div>
            <div className="inline-flex items-center rounded-xl border border-border overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-12 h-12 flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="Decrease"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="w-14 text-center font-bold text-lg">{qty}</div>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-12 h-12 flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="Increase"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <Button
            size="lg"
            className="h-12 text-base shadow-[var(--shadow-warm)]"
            onClick={() => {
              addItem(product.id, qty);
              toast.success(t("product.added"));
            }}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            {t("product.add")}
          </Button>
        </div>
      </div>
    </div>
  );
}
