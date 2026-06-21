import { Link } from "@tanstack/react-router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import { getFeaturedProducts } from "@/data/products";

export function FeaturedProducts() {
  const items = getFeaturedProducts();
  return (
    <section className="container-page py-16 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Em destaque
          </p>
          <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
            Produtos que as crianças amam
          </h2>
        </div>
        <Button asChild variant="outline">
          <Link to="/produtos">Ver catálogo completo</Link>
        </Button>
      </div>

      <Carousel
        opts={{ align: "start", loop: false }}
        className="mt-8"
        aria-label="Produtos em destaque"
      >
        <CarouselContent className="-ml-4">
          {items.map((p) => (
            <CarouselItem
              key={p.id}
              className="basis-[85%] pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <ProductCard product={p} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:inline-flex" />
        <CarouselNext className="hidden md:inline-flex" />
      </Carousel>
    </section>
  );
}
