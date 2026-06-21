import { Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className="border-y border-border bg-card/60 py-16">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Depoimentos
          </p>
          <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
            Famílias e escolas que confiam no nosso trabalho
          </h2>
          <p className="mt-3 text-xs text-muted-foreground">
            * Espaços reservados — substituir por depoimentos reais autorizados.
          </p>
        </div>
        <Carousel opts={{ align: "start", loop: true }} className="mx-auto mt-8 max-w-5xl">
          <CarouselContent>
            {testimonials.map((t, i) => (
              <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/2">
                <figure className="h-full rounded-3xl border border-dashed border-border bg-background p-6">
                  <Quote className="h-6 w-6 text-primary" aria-hidden="true" />
                  <blockquote className="mt-3 text-base text-foreground">
                    “{t.message}”
                  </blockquote>
                  <figcaption className="mt-4 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{t.name}</span> · {t.role}
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
