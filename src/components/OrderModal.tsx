import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useI18n, formatPrice } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { fetchProducts, type Product } from "@/lib/products";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  full_name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(7).max(30),
  location: z.string().trim().min(2).max(200),
  email: z.string().trim().email().optional().or(z.literal("")),
});

const BASE_URL = "http://138.2.146.136";

export function OrderModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const { t, lang } = useI18n();
  const { items, clear } = useCart();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [form, setForm] = useState({ full_name: "", phone: "", location: "", email: "" });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      fetchProducts()
        .then(setAllProducts)
        .catch(() => {})
        .finally(() => setProductsLoading(false));
    }
  }, [open]);

  // items: { id: string; quantity: number }[]
  const enriched = Array.isArray(items)
    ? items
        .map((i) => ({ ...i, product: allProducts.find((p) => p.id === i.id) }))
        .filter((i): i is typeof i & { product: Product } => !!i.product)
    : [];

  const total = enriched.reduce((s, i) => s + i.product.price * i.quantity, 0);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? t("order.error"));
      return;
    }
    if (!agreed) {
      toast.error(t("order.agree"));
      return;
    }
    if (!Array.isArray(enriched) || enriched.length === 0) {
      toast.error("Savatcha bo'sh yoki mahsulotlar yuklanmadi");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: parsed.data.full_name,
          phone: parsed.data.phone,
          address: parsed.data.location,
          email: parsed.data.email ?? "",
          oferta: true,
          totalPrice: Math.round(total),
          items: enriched.map((i) => ({
            productId: i.product.id,
            quantity: i.quantity,
          })),
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.message ?? "Server xatosi");
      }

      toast.success(t("order.success"));
      clear();
      onOpenChange(false);
      setForm({ full_name: "", phone: "", location: "", email: "" });
      setAgreed(false);
    } catch (err: any) {
      toast.error(err?.message ?? t("order.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{t("order.title")}</DialogTitle>
          <DialogDescription>
            {t("cart.total")}:{" "}
            <span className="font-bold text-accent">{formatPrice(total, lang)}</span>
          </DialogDescription>
        </DialogHeader>

        {productsLoading ? (
          <div className="py-8 text-center text-muted-foreground">Yuklanmoqda...</div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label htmlFor="full_name">{t("order.name")}</Label>
              <Input
                id="full_name"
                required
                maxLength={100}
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="phone">{t("order.phone")}</Label>
              <Input
                id="phone"
                type="tel"
                required
                maxLength={30}
                placeholder="+998 90 123 45 67"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="location">{t("order.location")}</Label>
              <Input
                id="location"
                required
                maxLength={200}
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email">Email (ixtiyoriy)</Label>
              <Input
                id="email"
                type="email"
                maxLength={100}
                placeholder="example@gmail.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <label className="flex items-start gap-2 cursor-pointer text-sm">
              <Checkbox
                checked={agreed}
                onCheckedChange={(c) => setAgreed(!!c)}
                className="mt-0.5"
              />
              <span className="leading-snug">
                {t("order.agree")} (
                <Link
                  to="/offer"
                  target="_blank"
                  className="text-primary underline hover:text-accent"
                >
                  {t("order.offer")}
                </Link>
                )
              </span>
            </label>
            <Button type="submit" disabled={loading || !agreed} className="w-full h-11">
              {loading ? "..." : t("order.submit")}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
