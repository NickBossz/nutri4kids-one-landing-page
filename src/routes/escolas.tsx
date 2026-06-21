import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarDays,
  Check,
  ClipboardList,
  MessageCircle,
  School,
} from "lucide-react";

import { SchoolPartnership } from "@/components/home/SchoolPartnership";
import { SchoolsGalleryCarousel } from "@/components/schools/SchoolsGalleryCarousel";
import { PartnerCompanies } from "@/components/shared/PartnerCompanies";

export const Route = createFileRoute("/escolas")({
  head: () => ({
    meta: [
      {
        title: "Parceria para escolas | Nutri4Kids",
      },
      {
        name: "description",
        content:
          "Fornecimento de lanches para escolas, eventos e ações especiais, com planejamento de quantidades e atendimento personalizado.",
      },
      {
        property: "og:title",
        content: "Parceria para escolas | Nutri4Kids",
      },
      {
        property: "og:description",
        content:
          "Uma solução planejada para a rotina e as necessidades de cada escola.",
      },
    ],
  }),

  component: SchoolsPage,
});

const BENEFITS = [
  "Planejamento de quantidades por turma e turno",
  "Pedidos recorrentes ou pontuais",
  "Soluções para eventos e datas especiais",
  "Cardápios adaptáveis à necessidade da instituição",
  "Comunicação próxima com a coordenação",
];

const STEPS = [
  {
    icon: ClipboardList,
    title: "Conte sobre a escola",
    description:
      "Informe o número de crianças, os turnos, a frequência e o objetivo da parceria.",
  },
  {
    icon: CalendarDays,
    title: "Planejamos a proposta",
    description:
      "Organizamos produtos, quantidades e frequência de atendimento conforme a necessidade.",
  },
  {
    icon: MessageCircle,
    title: "Confirmamos os detalhes",
    description:
      "A proposta é alinhada diretamente com o responsável pela instituição.",
  },
];

function SchoolsPage() {
  return (
    <>
      <section className="border-b border-border bg-muted/30 py-16 md:py-24">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-primary">
              <School className="h-4 w-4" aria-hidden="true" />
              Parceria escolar
            </span>

            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              Uma parceria que vai além do lanche
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Atendemos escolas com propostas personalizadas conforme o número
              de crianças, a frequência e a rotina da instituição.
            </p>

            <ul className="mt-8 space-y-3">
              {BENEFITS.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>

                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <SchoolsGalleryCarousel />
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Como funciona a parceria
          </p>

          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Um processo simples e personalizado
          </h2>

          <p className="mt-3 text-muted-foreground">
            Conhecemos a realidade da instituição antes de preparar a proposta.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
          {STEPS.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.title}
                className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>

                <h3 className="mt-5 font-display text-lg font-bold">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-border bg-card/60 py-16 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              O que podemos atender
            </p>

            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Soluções para diferentes momentos da escola
            </h2>

            <p className="mt-3 text-muted-foreground">
              A proposta pode ser adaptada conforme a frequência, o número de
              crianças e o tipo de evento ou rotina da instituição.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
            <article className="rounded-3xl border border-border bg-background p-6 shadow-[var(--shadow-card)]">
              <h3 className="font-display text-lg font-bold">
                Fornecimento recorrente
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Planejamento de lanches para dias específicos da semana ou
                períodos definidos pela escola.
              </p>
            </article>

            <article className="rounded-3xl border border-border bg-background p-6 shadow-[var(--shadow-card)]">
              <h3 className="font-display text-lg font-bold">
                Eventos e datas especiais
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Opções para festas, reuniões, comemorações e ações promovidas
                pela instituição.
              </p>
            </article>

            <article className="rounded-3xl border border-border bg-background p-6 shadow-[var(--shadow-card)]">
              <h3 className="font-display text-lg font-bold">
                Pedidos por turma
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Quantidades organizadas conforme turmas, turnos e número
                aproximado de crianças.
              </p>
            </article>
          </div>
        </div>
      </section>

      <SchoolPartnership />
    </>
  );
}