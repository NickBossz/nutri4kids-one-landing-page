import { ArrowRight, ShoppingBasket } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

export function FinalCTA() {
  return (
    <section className="container-page py-20">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-[var(--brand-primary)] p-8 text-primary-foreground sm:p-12">
        <div
          className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-[var(--brand-accent)]/40 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="absolute -bottom-16 left-8 h-56 w-56 rounded-full bg-[var(--brand-secondary)]/40 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/75">
              Pronto para escolher?
            </p>

            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
              Monte seu pedido em poucos minutos.
            </h2>

            <p className="mt-4 max-w-xl text-primary-foreground/85">
              Escolha os produtos, ajuste as quantidades e envie todas as
              informações organizadas para confirmação.
            </p>

            <Button
              asChild
              size="xl"
              variant="secondary"
              className="mt-7"
              onClick={() =>
                track("final_cta_clicked", {
                  target: "produtos",
                })
              }
            >
              <Link to="/produtos">
                <ShoppingBasket aria-hidden="true" />
                Começar meu pedido
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <img
            src="https://images.unsplash.com/photo-1495195134817-aeb325a55b65?auto=format&fit=crop&w=900&q=70"
            alt="Seleção de alimentos preparados para um lanche"
            className="hidden h-full max-h-[320px] w-full rounded-3xl object-cover lg:block"
          />
        </div>
      </div>
    </section>
  );
}