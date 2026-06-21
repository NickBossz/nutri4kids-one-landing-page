import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Sparkles, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { companyConfig } from "@/config/company";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      {
        title: `Sobre nós — ${companyConfig.name}`,
      },
      {
        name: "description",
        content:
          "Conheça a história, os valores e o cuidado por trás dos nossos lanches e refeições infantis.",
      },
      {
        property: "og:title",
        content: `Sobre nós — ${companyConfig.name}`,
      },
      {
        property: "og:description",
        content:
          "Alimentação infantil preparada com carinho para famílias e escolas.",
      },
      {
        property: "og:url",
        content: "/sobre",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "/sobre",
      },
    ],
  }),

  component: SobrePage,
});

const values = [
  {
    icon: Heart,
    title: "Cuidado",
    text: "Cada pedido é preparado com atenção, desde a escolha dos ingredientes até a embalagem.",
  },
  {
    icon: Sparkles,
    title: "Apresentação",
    text: "Criamos refeições bonitas, atrativas e pensadas especialmente para as crianças.",
  },
  {
    icon: Users,
    title: "Proximidade",
    text: "Mantemos uma comunicação próxima com famílias e escolas durante todo o atendimento.",
  },
];

function SobrePage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-page py-14 md:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Sobre nós
              </span>

              <h1 className="mt-3 max-w-xl font-display text-4xl font-bold text-balance md:text-5xl">
                Da nossa cozinha para o dia das crianças
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Somos uma empresa dedicada à alimentação infantil,
                preparando lanches, lancheiras e refeições pensadas para
                crianças, famílias e escolas parceiras.
              </p>

              <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                Nosso objetivo é tornar a rotina mais prática para quem cuida e
                transformar cada refeição em um momento saboroso, organizado e
                especial para as crianças.
              </p>

              <Button asChild variant="hero" size="lg" className="mt-7">
                <Link to="/produtos">Conhecer os produtos</Link>
              </Button>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-4 -z-10 rounded-[2rem] bg-primary/10"
              />

              <img
                src="/images/gallery-4.jpg"
                alt="Preparação de lanches e lancheiras infantis"
                loading="lazy"
                className="aspect-[4/5] w-full rounded-3xl border border-border object-cover shadow-[var(--shadow-card)]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Nossos valores"
            title="O que guia o nosso trabalho"
            description="Princípios que aparecem no preparo, no atendimento e em cada detalhe dos nossos pedidos."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <h2 className="mt-5 font-display text-xl font-bold">
                    {value.title}
                  </h2>

                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-16 md:py-20">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Nossa equipe"
            title="Quem prepara cada pedido"
            description="Pessoas que cuidam para que cada alimento seja preparado, organizado e entregue com atenção."
          />

          <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((member) => (
              <article
                key={member}
                className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]"
              >
                <div className="grid aspect-square place-items-center bg-muted">
                  <Users
                    className="h-12 w-12 text-muted-foreground/40"
                    aria-hidden="true"
                  />
                </div>

                <div className="p-5 text-center">
                  <h2 className="font-display text-lg font-bold">
                    Integrante da equipe
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Espaço reservado para foto, nome e função.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page">
          <div className="rounded-3xl bg-primary px-6 py-10 text-center text-primary-foreground md:px-12">
            <h2 className="font-display text-3xl font-bold">
              Conheça nossos lanches e lancheiras
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-primary-foreground/80">
              Veja as opções disponíveis e monte um pedido pensado para a
              rotina da sua família ou escola.
            </p>

            <Button
              asChild
              variant="secondary"
              size="lg"
              className="mt-6"
            >
              <Link to="/produtos">Ver produtos</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment =
    align === "center"
      ? "mx-auto max-w-2xl text-center"
      : "max-w-2xl";

  return (
    <header className={alignment}>
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </span>

      <h2 className="mt-3 font-display text-3xl font-bold text-balance md:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mt-3 leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </header>
  );
}