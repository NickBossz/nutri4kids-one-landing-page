import { createFileRoute } from "@tanstack/react-router";
import {
  HeartHandshake,
  School,
  Sparkles,
} from "lucide-react";

import { BenefitsSection } from "@/components/home/BenefitsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PartnerSchools } from "@/components/home/PartnerSchools";
import { ProductionGallery } from "@/components/home/ProductionGallery";
import { SchoolsPreview } from "@/components/home/SchoolsPreview";
import { TeamSection } from "@/components/home/TeamSection";
import { MenuDrawer } from "@/components/products/MenuDrawer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Nutri4Kids | Lanches infantis para famílias e escolas",
      },
      {
        name: "description",
        content:
          "Lanches infantis, kits e pedidos personalizados para famílias e escolas.",
      },
      {
        property: "og:title",
        content: "Nutri4Kids",
      },
      {
        property: "og:description",
        content:
          "Lanches infantis preparados para facilitar a rotina de famílias e escolas.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <> <div
      id="inicio"
      className="scroll-mt-24"
    > <HeroSection /> </div>

      ```
      <section
        id="sobre"
        className="scroll-mt-24 py-16 md:py-24"
      >
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative">
              <div className="overflow-hidden rounded-[2.5rem] border border-border bg-muted shadow-sm">
                <img
                  src="/images/bastidores/doces.jpeg"
                  alt="Produção de lanches da Nutri4Kids"
                  loading="lazy"
                  className="aspect-[4/3] h-full w-full object-cover"
                />
              </div>

              <div className="absolute -bottom-5 -right-3 hidden max-w-[240px] rounded-3xl border border-border bg-card p-5 shadow-lg sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <HeartHandshake
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>

                  <p className="text-sm font-semibold">
                    Cuidado presente em cada pedido.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Sobre a Nutri4Kids
              </p>

              <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold leading-tight sm:text-4xl">
                Alimentação infantil preparada com carinho, organização e
                propósito.
              </h2>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  A Nutri4Kids prepara lanches, kits e lancheiras para crianças,
                  famílias e escolas parceiras.
                </p>

                <p>
                  Cada pedido é planejado conforme a quantidade necessária, o
                  tipo de evento e a rotina de quem será atendido.
                </p>

                <p>
                  Nosso objetivo é facilitar o dia a dia das famílias e das
                  instituições, oferecendo uma experiência simples desde a
                  escolha dos produtos até a confirmação pelo WhatsApp.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-border bg-card p-5">
                  <Sparkles
                    className="h-6 w-6 text-primary"
                    aria-hidden="true"
                  />

                  <h3 className="mt-3 font-display font-bold">
                    Produção própria
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Preparação cuidadosa e acompanhamento de cada etapa.
                  </p>
                </div>

                <div className="rounded-3xl border border-border bg-card p-5">
                  <School
                    className="h-6 w-6 text-primary"
                    aria-hidden="true"
                  />

                  <h3 className="mt-3 font-display font-bold">
                    Atendimento personalizado
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Soluções adaptadas para famílias, eventos e escolas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <BenefitsSection />

        <ProductionGallery />
      </section>

      <section
        id="como-funciona"
        aria-label="Como funciona"
        className="scroll-mt-24"
      >
        <HowItWorks />
      </section>

      <FeaturedProducts />

      <section
        id="escolas"
        aria-label="Escolas parceiras"
        className="scroll-mt-24"
      >
        <PartnerSchools />

        <SchoolsPreview />
      </section>

      <section
        id="faq"
        aria-label="Perguntas frequentes"
        className="scroll-mt-24"
      >
        <FaqSection />
      </section>

      <TeamSection />

      <MenuDrawer />
    </>


  );
}
