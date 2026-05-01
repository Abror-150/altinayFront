import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { products } from "@/lib/products";
import { useI18n, formatPrice } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { OrderModal } from "@/components/OrderModal";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  const { items, updateQty, removeItem } = useCart();
  const { t, lang } = useI18n();
  const [orderOpen, setOrderOpen] = useState(false);

  const enriched = items
    .map((i) => ({ ...i, product: products.find((p) => p.id === i.id)! }))
    .filter((i) => i.product);

  const total = enriched.reduce((s, i) => s + i.product.price * i.quantity, 0);

  if (enriched.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h1 className="text-3xl font-display font-bold mb-3">{t("cart.empty")}</h1>
        <Link to="/products">
          <Button size="lg" className="mt-4">{t("cart.empty.cta")}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-display font-bold mb-8">{t("cart.title")}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {enriched.map((i) => (
            <div key={i.id} className="flex gap-4 p-4 rounded-2xl bg-card border border-border">
              <Link to="/products/$id" params={{ id: i.id }} className="shrink-0">
                <img src={i.product.image} alt={i.product.name[lang]} className="w-24 h-24 rounded-xl object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to="/products/$id" params={{ id: i.id }}>
                  <h3 className="font-display font-semibold hover:text-primary transition-colors">{i.product.name[lang]}</h3>
                </Link>
                <p className="text-sm text-accent font-bold mt-1">{formatPrice(i.product.price * i.quantity, lang)}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="inline-flex items-center rounded-lg border border-border overflow-hidden">
                    <button onClick={() => updateQty(i.id, i.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-muted">
                      <Minus className="w-3 h-3" />
                    </button>
                    <div className="w-10 text-center text-sm font-bold">{i.quantity}</div>
                    <button onClick={() => updateQty(i.id, i.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-muted">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button onClick={() => removeItem(i.id)} className="text-muted-foreground hover:text-destructive p-2" aria-label={t("cart.remove")}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-secondary/50 border border-border p-6 h-fit sticky top-20">
          <h2 className="font-display font-semibold text-lg mb-4">{t("cart.title")}</h2>
          <div className="space-y-2 text-sm mb-4">
            {enriched.map((i) => (
              <div key={i.id} className="flex justify-between text-muted-foreground">
                <span className="truncate pr-2">{i.product.name[lang]} × {i.quantity}</span>
                <span className="shrink-0">{formatPrice(i.product.price * i.quantity, lang)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-4 flex justify-between items-baseline mb-6">
            <span className="font-medium">{t("cart.total")}</span>
            <span className="text-2xl font-display font-bold text-accent">{formatPrice(total, lang)}</span>
          </div>
          <Button size="lg" className="w-full h-12 shadow-[var(--shadow-warm)]" onClick={() => setOrderOpen(true)}>
            {t("cart.order")}
          </Button>
        </div>
      </div>

      <OrderModal open={orderOpen} onOpenChange={setOrderOpen} items={enriched} total={total} />
    </div>
  );
}
