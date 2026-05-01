import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border bg-secondary/30 mt-20">
      <div className="h-2 pattern-border" />
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-display font-bold">
              G
            </div>
            <span className="font-display font-bold text-lg">Gilam &amp; Kigiz</span>
          </div>
          <p className="text-sm text-muted-foreground">{t("footer.tagline")}</p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">{t("nav.products")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/products" className="hover:text-primary">{t("nav.products")}</Link></li>
            <li><Link to="/about" className="hover:text-primary">{t("nav.about")}</Link></li>
            <li><Link to="/faq" className="hover:text-primary">{t("nav.faq")}</Link></li>
            <li><Link to="/contact" className="hover:text-primary">{t("nav.contact")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">{t("contact.info")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>+998 90 123 45 67</li>
            <li>info@gilam-kigiz.uz</li>
            <li>{t("contact.address.val")}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Gilam &amp; Kigiz. {t("footer.rights")}.
      </div>
    </footer>
  );
}
