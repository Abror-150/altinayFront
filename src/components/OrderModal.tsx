import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useI18n, formatPrice } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import type { Product } from "@/lib/products";

const schema = z.object({
  full_name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(7).max(30),
  location: z.string().trim().min(2).max(200),
});

export function OrderModal({
  open,
  onOpenChange,
  items,
  total,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  items: { id: string; quantity: number; product: Product }[];
  total: number;
}) {
  const { t, lang } = useI18n();
  const { clear } = useCart();
  const [form, setForm] = useState({ full_name: "", phone: "", location: "" });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const { error } = await supabase.from("orders").insert({
      full_name: parsed.data.full_name,
      phone: parsed.data.phone,
      location: parsed.data.location,
      items: items.map((i) => ({
        id: i.id,
        name: i.product.name,
        quantity: i.quantity,
        price: i.product.price,
      })),
      total,
      agreed: true,
    });
    setLoading(false);
    if (error) {
      toast.error(t("order.error"));
      return;
    }
    toast.success(t("order.success"));
    clear();
    onOpenChange(false);
    setForm({ full_name: "", phone: "", location: "" });
    setAgreed(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{t("order.title")}</DialogTitle>
          <DialogDescription>
            {t("cart.total")}: <span className="font-bold text-accent">{formatPrice(total, lang)}</span>
          </DialogDescription>
        </DialogHeader>
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
          <label className="flex items-start gap-2 cursor-pointer text-sm">
            <Checkbox checked={agreed} onCheckedChange={(c) => setAgreed(!!c)} className="mt-0.5" />
            <span className="leading-snug">
              {t("order.agree")} (
              <Link to="/offer" target="_blank" className="text-primary underline hover:text-accent">
                {t("order.offer")}
              </Link>
              )
            </span>
          </label>
          <Button type="submit" disabled={loading || !agreed} className="w-full h-11">
            {loading ? "..." : t("order.submit")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
