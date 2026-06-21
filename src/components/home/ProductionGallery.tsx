import { Eye } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PRODUCTION_IMAGES = [
  {
    src: "/images/bastidores/biscoito de aveia.jpeg",
    title: "Biscoito de aveia",
    alt: "Biscoitos de aveia preparados para os lanches",
    description:
      "Biscoitos preparados para compor lanches individuais, kits e pedidos escolares. Uma opção prática para diferentes momentos da rotina.",
  },
  {
    src: "/images/bastidores/biscoito.jpeg",
    title: "Biscoitos artesanais",
    alt: "Biscoitos preparados artesanalmente",
    description:
      "Produção feita em pequenas etapas, com atenção ao formato, ao preparo e à organização antes da embalagem.",
  },
  {
    src: "/images/bastidores/bolachas.jpeg",
    title: "Bolachas",
    alt: "Bolachas prontas para serem servidas",
    description:
      "Bolachas organizadas para pedidos de famílias, eventos e escolas parceiras.",
  },
  {
    src: "/images/bastidores/cupcake de beterraba.jpeg",
    title: "Cupcake de beterraba",
    alt: "Cupcakes de beterraba preparados para as crianças",
    description:
      "Uma opção colorida e criativa, preparada para tornar o lanche infantil mais interessante.",
  },
  {
    src: "/images/bastidores/doce.jpeg",
    title: "Doce artesanal",
    alt: "Doce produzido na cozinha",
    description:
      "Produção de doces para complementar kits, festas e pedidos personalizados.",
  },
  {
    src: "/images/bastidores/doces.jpeg",
    title: "Seleção de doces",
    alt: "Doces preparados para os pedidos",
    description:
      "Variedade de doces preparados e organizados conforme a quantidade e a ocasião do pedido.",
  },
  {
    src: "/images/bastidores/hamburguer.jpeg",
    title: "Hambúrguer",
    alt: "Hambúrguer preparado para o lanche",
    description:
      "Hambúrguer preparado para compor lanches completos e opções personalizadas.",
  },
  {
    src: "/images/bastidores/mini pizza.jpeg",
    title: "Mini pizza",
    alt: "Mini pizzas prontas para entrega",
    description:
      "Mini pizzas produzidas em tamanho infantil, indicadas para festas, passeios e pedidos escolares.",
  },
  {
    src: "/images/bastidores/pao.jpeg",
    title: "Pães artesanais",
    alt: "Pães preparados artesanalmente",
    description:
      "Pães preparados para diferentes combinações do cardápio, como sanduíches e kits.",
  },
  {
    src: "/images/bastidores/risole de abobora.jpeg",
    title: "Risole de abóbora",
    alt: "Risoles de abóbora preparados para os pedidos",
    description:
      "Uma das opções mais procuradas do cardápio, preparada para pedidos individuais, kits e eventos.",
  },
];

export function ProductionGallery() {
  return (
    <section className="container-page py-16 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Bastidores
        </p>

        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          Da nossa cozinha para a sua rotina
        </h2>

        <p className="mt-3 text-muted-foreground">
          Clique em uma imagem para conhecer melhor cada produto e parte da
          nossa produção.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {PRODUCTION_IMAGES.map((image, index) => (
          <Dialog key={image.src}>
            <DialogTrigger asChild>
              <button
                type="button"
                className={[
                  "group relative overflow-hidden rounded-3xl border border-border bg-card text-left shadow-[var(--shadow-card)]",
                  index === 0
                    ? "col-span-2 row-span-2"
                    : "",
                ].join(" ")}
                aria-label={`Ver detalhes sobre ${image.title}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className={[
                    "w-full object-cover transition duration-500 group-hover:scale-105",
                    index === 0
                      ? "aspect-square h-full"
                      : "aspect-square",
                  ].join(" ")}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white">
                  <div>
                    <p className="font-display text-sm font-bold sm:text-base">
                      {image.title}
                    </p>

                    <p className="mt-1 hidden text-xs text-white/80 sm:block">
                      Clique para conhecer
                    </p>
                  </div>

                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/20 backdrop-blur">
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </button>
            </DialogTrigger>

            <DialogContent className="max-w-3xl overflow-hidden p-0">
              <div className="grid md:grid-cols-[1.1fr_0.9fr]">
                <div className="min-h-[280px] bg-muted">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full max-h-[520px] w-full object-cover"
                  />
                </div>

                <DialogHeader className="flex justify-center p-6 text-left sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Bastidores da produção
                  </p>

                  <DialogTitle className="mt-2 font-display text-2xl font-bold">
                    {image.title}
                  </DialogTitle>

                  <DialogDescription className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {image.description}
                  </DialogDescription>

                  <p className="mt-5 rounded-2xl bg-muted p-4 text-xs leading-relaxed text-muted-foreground">
                    Ingredientes, disponibilidade e possíveis alergênicos devem
                    ser confirmados no cardápio ou durante o atendimento.
                  </p>
                </DialogHeader>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
}