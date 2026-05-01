import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";
import { useI18n, formatPrice } from "@/lib/i18n";

export function ProductCard({ product }: { product: Product }) {
  const { lang } = useI18n();
  return (
    <Link
      to="/products/$id"
      params={{ id: product.id }}
      className="group block rounded-2xl overflow-hidden bg-card border border-border hover:shadow-[var(--shadow-warm)] hover:-translate-y-1 transition-all duration-300"
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name[lang]}
          loading="lazy"
          width={1024}
          height={1024}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <h3 className="font-display font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
          {product.name[lang]}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.description[lang]}</p>
        <div className="text-accent font-bold text-lg">{formatPrice(product.price, lang)}</div>
      </div>
    </Link>
  );
}
