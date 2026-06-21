import { motion } from "framer-motion";
import { Clock3, Plus } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatBRL } from "@/lib/currency";
import { track } from "@/lib/analytics";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types";
import { PRODUCT_TAG_LABELS } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    if (product.price === null) {
      toast.info("Este item tem valor sob consulta.", {
        description: "Entre em contato conosco pelo WhatsApp.",
      });

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

    track("product_added_to_cart", {
      id: product.id,
    });

    toast.success("Adicionado ao carrinho", {
      description: product.name,
    });
  };

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 12,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.35,
      }}
      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative overflow-hidden bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="aspect-[4/3] h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute left-3 top-3 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-2">
          {product.placeholder && (
            <Badge variant="secondary">Placeholder</Badge>
          )}

          {product.popular && (
            <Badge className="shadow-sm">Mais pedido</Badge>
          )}
        </div>

        {product.leadTimeHours && (
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex w-fit items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur">
              <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
              Pedido com {product.leadTimeHours}h de antecedência
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          {product.category}
        </p>

        <h3 className="mt-2 font-display text-xl font-bold leading-tight">
          {product.name}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {product.shortDescription}
        </p>

        {product.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {product.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="rounded-full text-[11px]"
              >
                {PRODUCT_TAG_LABELS[tag]}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <div>
            <p className="text-xs text-muted-foreground">
              {product.unit}
            </p>

            <p className="mt-0.5 font-display text-xl font-bold text-foreground">
              {product.priceLabel ?? formatBRL(product.price)}
            </p>
          </div>

          <Button
            type="button"
            size="sm"
            disabled={!product.available}
            onClick={handleAdd}
            className="shrink-0 rounded-full"
          >
            <Plus className="mr-1 h-4 w-4" aria-hidden="true" />
            Adicionar
          </Button>
        </div>
      </div>
    </motion.article>
  );
}