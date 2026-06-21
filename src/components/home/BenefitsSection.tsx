import { Heart, Leaf, School } from "lucide-react";

const BENEFITS = [
  {
    icon: Heart,
    title: "Produção própria",
    desc: "Cada produto é preparado com atenção desde os ingredientes até a organização do pedido.",
  },
  {
    icon: Leaf,
    title: "Cardápio pensado para crianças",
    desc: "Sabores conhecidos apresentados em opções criativas para diferentes momentos da rotina.",
  },
  {
    icon: School,
    title: "Para famílias e escolas",
    desc: "Atendemos pedidos pontuais, kits personalizados e parcerias recorrentes com instituições.",
  },
];

export function BenefitsSection() {
  return (
    <section
      id="diferenciais"
      className="scroll-mt-24 border-y border-border bg-card/60 py-16"
    >
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Nossos diferenciais
          </p>

          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Por que escolher a Nutri4Kids?
          </h2>

          <p className="mt-3 text-muted-foreground">
            Uma experiência pensada para deixar a escolha do lanche mais simples
            para responsáveis, crianças e escolas.
          </p>
        </div>

        <ul className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <li
                key={benefit.title}
                className="group rounded-3xl border border-border bg-background p-6 shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>

                <h3 className="mt-4 font-display text-lg font-bold">
                  {benefit.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {benefit.desc}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}