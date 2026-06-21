import {
  ArrowRight,
  CalendarDays,
  School,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import {
  buildWhatsappUrl,
  isWhatsappConfigured,
} from "@/lib/whatsapp";

const BENEFITS = [
  {
    icon: CalendarDays,
    title: "Fornecimento planejado",
    description:
      "Pedidos pontuais ou recorrentes de acordo com a rotina da instituição.",
  },
  {
    icon: Users,
    title: "Quantidades personalizadas",
    description:
      "Planejamento conforme o número de crianças, turmas, turnos e eventos.",
  },
  {
    icon: School,
    title: "Atendimento para escolas",
    description:
      "Uma proposta construída de acordo com a necessidade de cada instituição.",
  },
];

export function SchoolsPreview() {
  const whatsappUrl = isWhatsappConfigured()
    ? buildWhatsappUrl(
        "Olá! Gostaria de conhecer as soluções da Nutri4Kids para escolas.",
      )
    : undefined;

  return (
    <section className="border-y border-border bg-muted/30 py-16 md:py-20">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Para escolas
            </p>

            <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
              Uma solução pensada para a rotina escolar
            </h2>

            <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
              A Nutri4Kids também atende instituições com planejamento de
              quantidades, frequência de fornecimento e opções adaptadas à
              realidade de cada escola.
            </p>

            {whatsappUrl && (
              <Button asChild size="lg" className="mt-7">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track("schools_preview_clicked", {
                      target: "whatsapp",
                    })
                  }
                >
                  Conhecer a solução para escolas
                  <ArrowRight aria-hidden="true" />
                </a>
              </Button>
            )}
          </div>

          <div className="grid gap-4">
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={benefit.title}
                  className="flex gap-4 rounded-3xl border border-border bg-background p-5 shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-1"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>

                  <div>
                    <h3 className="font-display text-lg font-bold">
                      {benefit.title}
                    </h3>

                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
