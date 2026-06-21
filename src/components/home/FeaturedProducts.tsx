import { ArrowRight } from "lucide-react";

import { openMenuDrawer } from "@/components/products/MenuDrawer";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getFeaturedProducts } from "@/data/products";

export function FeaturedProducts() {
  const items = getFeaturedProducts();

  return (
    <section
      id="produtos"
      className="scroll-mt-24 py-16 md:py-24"
      aria-labelledby="featured-products-title"
    >
      <div className="container-page">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Em destaque
            </p>

            <h2
              id="featured-products-title"
              className="mt-2 max-w-2xl font-display text-3xl font-bold leading-tight sm:text-4xl"
            >
              Produtos que as crianças amam
            </h2>

            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              Conheça alguns dos produtos mais pedidos da Nutri4Kids.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={openMenuDrawer}
            className="w-fit rounded-full"
          >
            Ver cardápio completo
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {items.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-4 sm:basis-1/2 lg:basis-1/3"
              >
                <div className="h-full py-1">
                  <ProductCard product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-8 flex justify-end gap-2">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
