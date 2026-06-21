import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatBRL } from "@/lib/currency";
import type { Product } from "@/types";
import { PRODUCT_TAG_LABELS } from "@/types";
import { useCartStore } from "@/store/cart-store";
import { track } from "@/lib/analytics";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    if (product.price === null) {
      toast.info("Este item tem valor sob consulta — fale conosco pelo WhatsApp.");
      return;
    }
    addItem({
      productId: product.id,
      quantity: 1,
      unitPrice: product.price,
      name: product.name,
      image: product.images[0],
      slug: product.slug,
    });
    track("product_added_to_cart", { id: product.id });
    toast.success("Adicionado ao carrinho", { description: product.name });
  };

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]"
    >
      <Link
        to="/produtos/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-[4/3] overflow-hidden bg-muted"
        aria-label={`Ver detalhes de ${product.name}`}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.placeholder && (
          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Placeholder
          </span>
        )}
        {product.leadTimeHours && (
          <span className="absolute right-3 top-3 rounded-full bg-background/90 px-2 py-0.5 text-[10px] font-medium text-foreground">
            Pedido com {product.leadTimeHours}h de antecedência
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {product.category}
          </p>
          <h3 className="mt-0.5 truncate font-display text-lg font-bold">
            <Link
              to="/produtos/$slug"
              params={{ slug: product.slug }}
              className="hover:text-primary"
            >
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {product.shortDescription}
          </p>
        </div>

        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {product.tags.slice(0, 3).map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="border border-border bg-accent text-[10px] font-medium"
              >
                {PRODUCT_TAG_LABELS[t]}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div>
            <p className="text-xs text-muted-foreground">{product.unit}</p>
            <p className="font-display text-xl font-extrabold text-foreground">
              {product.priceLabel ?? formatBRL(product.price)}
            </p>
          </div>
          <Button
            size="sm"
            variant="hero"
            onClick={handleAdd}
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            <Plus /> Adicionar
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
