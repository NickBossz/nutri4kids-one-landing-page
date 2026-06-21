import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/products/ProductCard";
import { getProductBySlug, products } from "@/data/products";
import { formatBRL } from "@/lib/currency";
import { PRODUCT_TAG_LABELS } from "@/types";
import { useCartStore } from "@/store/cart-store";
import { track } from "@/lib/analytics";
import { toast } from "sonner";

export const Route = createFileRoute("/produtos/$slug")({
  head: ({ params }) => {
    const product = getProductBySlug(params.slug);
    const title = product ? `${product.name} — Lanchinho Feliz` : "Produto — Lanchinho Feliz";
    const desc = product?.shortDescription ?? "Detalhes do produto.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(product?.images[0] ? [{ property: "og:image", content: product.images[0] }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  notFoundComponent: () => (
    <div className="container-page py-20 text-center">
      <h1 className="font-display text-3xl font-bold">Produto não encontrado</h1>
      <p className="mt-2 text-muted-foreground">
        O item que você procura pode ter sido removido.
      </p>
      <Button asChild className="mt-6">
        <Link to="/produtos">Voltar ao catálogo</Link>
      </Button>
    </div>
  ),
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { product } = Route.useLoaderData() as { product: import("@/types").Product };
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const open = useCartStore((s) => s.open);
  const navigate = useNavigate();

  useEffect(() => {
    track("product_viewed", { id: product.id });
  }, [product.id]);

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  const handleAdd = () => {
    if (product.price === null) {
      toast.info("Este item tem valor sob consulta — fale conosco pelo WhatsApp.");
      return;
    }
    addItem({
      productId: product.id,
      quantity: qty,
      unitPrice: product.price,
      name: product.name,
      image: product.images[0],
      slug: product.slug,
    });
    track("product_added_to_cart", { id: product.id, qty });
    toast.success(`${qty}x ${product.name} adicionado`);
    open();
  };

  return (
    <div className="container-page py-8 md:py-12">
      <Button
        variant="ghost"
        size="sm"
        className="mb-4 text-muted-foreground"
        onClick={() => navigate({ to: "/produtos" })}
      >
        <ChevronLeft className="h-4 w-4" /> Voltar para produtos
      </Button>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-3xl border border-border bg-card">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="aspect-square w-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setActiveImage(i)}
                  className={`overflow-hidden rounded-xl border ${
                    i === activeImage ? "border-primary" : "border-border"
                  }`}
                  aria-label={`Imagem ${i + 1}`}
                >
                  <img src={src} alt="" className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {product.category}
          </p>
          <h1 className="mt-1 font-display text-3xl font-extrabold sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-3 text-base text-muted-foreground">{product.description}</p>

          {product.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <Badge key={t} variant="secondary" className="border border-border bg-accent">
                  {PRODUCT_TAG_LABELS[t]}
                </Badge>
              ))}
            </div>
          )}

          <div className="mt-6 flex items-end gap-4">
            <div>
              <p className="text-xs text-muted-foreground">{product.unit}</p>
              <p className="font-display text-3xl font-extrabold">
                {product.priceLabel ?? formatBRL(product.price)}
              </p>
            </div>
            {product.leadTimeHours && (
              <p className="text-xs text-muted-foreground">
                Pedido com {product.leadTimeHours}h de antecedência
              </p>
            )}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-border">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Diminuir quantidade"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-9 text-center text-base font-bold" aria-live="polite">
                {qty}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQty((q) => Math.min(99, q + 1))}
                aria-label="Aumentar quantidade"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button size="lg" variant="hero" onClick={handleAdd}>
              <ShoppingBag /> Adicionar ao carrinho
            </Button>
          </div>

          <p className="mt-4 rounded-2xl border border-dashed border-border bg-muted/40 p-3 text-xs text-muted-foreground">
            Informações e disponibilidade serão confirmadas durante o atendimento.
          </p>

          <Separator className="my-8" />

          <dl className="grid gap-5 sm:grid-cols-2">
            {product.ingredients && (
              <Info title="Ingredientes">{product.ingredients.join(", ")}</Info>
            )}
            {product.allergens && product.allergens.length > 0 && (
              <Info title="Possíveis alergênicos">{product.allergens.join(", ")}</Info>
            )}
            {product.conservation && <Info title="Conservação">{product.conservation}</Info>}
            {product.validity && <Info title="Validade">{product.validity}</Info>}
            {product.servingTip && <Info title="Sugestão de consumo">{product.servingTip}</Info>}
          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold">Você também pode gostar</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <ProductCard key={r.id} product={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Info({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </dt>
      <dd className="mt-1 text-sm text-foreground">{children}</dd>
    </div>
  );
}
