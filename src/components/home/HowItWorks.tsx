import {
  CheckCircle2,
  ClipboardList,
  ShoppingBasket,
} from "lucide-react";

const STEPS = [
  {
    n: 1,
    icon: ShoppingBasket,
    title: "Escolha seus lanches",
    desc: "Navegue pelo cardápio, adicione os produtos e ajuste as quantidades.",
  },
  {
    n: 2,
    icon: ClipboardList,
    title: "Informe os detalhes",
    desc: "Preencha data, horário, forma de entrega e observações importantes.",
  },
  {
    n: 3,
    icon: CheckCircle2,
    title: "Confirme o pedido",
    desc: "Enviamos o resumo organizado pelo WhatsApp para confirmar disponibilidade e pagamento.",
  },
];

export function HowItWorks() {
  return (
    <section className="container-page py-16 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Como funciona
        </p>

        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          Seu pedido em três etapas
        </h2>

        <p className="mt-3 text-muted-foreground">
          Você escolhe com calma no site e entra no WhatsApp apenas para
          finalizar.
        </p>
      </div>

      <ol className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
        {STEPS.map((step) => {
          const Icon = step.icon;

          return (
            <li
              key={step.n}
              className="relative rounded-3xl border border-border bg-card p-6 pt-8 shadow-[var(--shadow-card)]"
            >
              <span
                aria-hidden="true"
                className="absolute -top-5 left-6 grid h-11 w-11 place-items-center rounded-full bg-primary font-display text-lg font-extrabold text-primary-foreground shadow-md"
              >
                {step.n}
              </span>

              <span className="mt-2 grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>

              <h3 className="mt-5 font-display text-xl font-bold">
                {step.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.desc}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}