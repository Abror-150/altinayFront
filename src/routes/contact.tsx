import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Aloqa — Gilam & Kigiz" },
      { name: "description", content: "Biz bilan bog'laning. Telefon, manzil va xabar yuborish." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(7).max(30),
  message: z.string().trim().min(2).max(1000),
});

function ContactPage() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Error");
      return;
    }
    toast.success(t("contact.sent"));
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 text-center animate-fade-up">{t("contact.title")}</h1>
      <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={submit} className="rounded-3xl bg-card border border-border p-6 md:p-8 space-y-4">
          <div>
            <Label htmlFor="name">{t("contact.name")}</Label>
            <Input id="name" maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div>
            <Label htmlFor="phone">{t("contact.phone")}</Label>
            <Input id="phone" type="tel" maxLength={30} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
          </div>
          <div>
            <Label htmlFor="message">{t("contact.message")}</Label>
            <Textarea id="message" rows={5} maxLength={1000} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
          </div>
          <Button type="submit" className="w-full h-11 shadow-[var(--shadow-warm)]">{t("contact.send")}</Button>
        </form>

        <div className="space-y-4">
          <div className="rounded-2xl bg-secondary/50 border border-border p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">{t("contact.phone")}</div>
              <div className="font-semibold">+998 90 123 45 67</div>
            </div>
          </div>
          <div className="rounded-2xl bg-secondary/50 border border-border p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="font-semibold">info@gilam-kigiz.uz</div>
            </div>
          </div>
          <div className="rounded-2xl bg-secondary/50 border border-border p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">{t("contact.address")}</div>
              <div className="font-semibold">{t("contact.address.val")}</div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border h-56">
            <iframe
              title="map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=69.2,41.28,69.32,41.34&layer=mapnik"
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
