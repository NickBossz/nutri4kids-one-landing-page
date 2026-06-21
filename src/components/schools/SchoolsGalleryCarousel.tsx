import { useCallback, useEffect, useState } from "react";

import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const SCHOOL_IMAGES = [
  {
    src: "/images/bastidores/bolachas.jpeg",
    alt: "Bolachas preparadas pela Nutri4Kids",
    title: "Produção organizada",
    description:
      "Produtos preparados e separados conforme a quantidade de cada pedido.",
  },
  {
    src: "/images/bastidores/cupcake de beterraba.jpeg",
    alt: "Cupcakes de beterraba preparados pela Nutri4Kids",
    title: "Opções criativas",
    description:
      "Lanches pensados para tornar a alimentação infantil mais atrativa.",
  },
  {
    src: "/images/bastidores/risole de abobora.jpeg",
    alt: "Risoles de abóbora preparados pela Nutri4Kids",
    title: "Variedade no cardápio",
    description:
      "Opções doces e salgadas para diferentes rotinas e ocasiões.",
  },
  {
    src: "/images/bastidores/mini pizza.jpeg",
    alt: "Mini pizzas preparadas pela Nutri4Kids",
    title: "Pedidos personalizados",
    description:
      "Quantidades adaptadas para turmas, eventos e datas especiais.",
  },
  {
    src: "/images/bastidores/biscoito de aveia.jpeg",
    alt: "Biscoitos de aveia preparados pela Nutri4Kids",
    title: "Cuidado em cada etapa",
    description:
      "Do preparo até a embalagem, cada pedido recebe atenção especial.",
  },
  {
    src: "/images/bastidores/doces.jpeg",
    alt: "Seleção de doces preparados pela Nutri4Kids",
    title: "Soluções para escolas",
    description:
      "Fornecimento planejado de acordo com o número de crianças e a frequência.",
  },
];

export function SchoolsGalleryCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const updateCurrentSlide = useCallback(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) {
      return;
    }

    updateCurrentSlide();

    api.on("select", updateCurrentSlide);
    api.on("reInit", updateCurrentSlide);

    return () => {
      api.off("select", updateCurrentSlide);
      api.off("reInit", updateCurrentSlide);
    };
  }, [api, updateCurrentSlide]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = window.setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 4500);

    return () => {
      window.clearInterval(interval);
    };
  }, [api]);

  return (
    <div className="relative">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {SCHOOL_IMAGES.map((image) => (
            <CarouselItem key={image.src}>
              <article className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-[var(--shadow-soft)]">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="aspect-[4/3] w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                  <p className="font-display text-xl font-bold sm:text-2xl">
                    {image.title}
                  </p>

                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85">
                    {image.description}
                  </p>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4 border-white/30 bg-background/85 hover:bg-background" />

        <CarouselNext className="right-4 border-white/30 bg-background/85 hover:bg-background" />
      </Carousel>

      <div
        className="mt-4 flex justify-center gap-2"
        aria-label="Selecionar imagem do carrossel"
      >
        {SCHOOL_IMAGES.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => api?.scrollTo(index)}
            aria-label={`Ir para a imagem ${index + 1}`}
            aria-current={current === index ? "true" : undefined}
            className={cn(
              "h-2.5 rounded-full transition-all",
              current === index
                ? "w-8 bg-primary"
                : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50",
            )}
          />
        ))}
      </div>
    </div>
  );
}