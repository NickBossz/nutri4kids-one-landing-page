import { ChevronDown, School, ShoppingBasket } from "lucide-react";
import { motion } from "framer-motion";

import { openMenuDrawer } from "@/components/products/MenuDrawer";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

function scrollToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/bastidores/doces.jpeg"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/60" />
      </div>

      <div className="container-page grid min-h-[78vh] items-center gap-12 py-16 md:min-h-[82vh] md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          <span className="inline-flex items-center rounded-full border border-border bg-card/85 px-4 py-2 text-xs font-semibold text-muted-foreground backdrop-blur">
            Produção própria para famílias e escolas
          </span>

          <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
            Lanches infantis feitos para facilitar{" "}
            <span className="text-primary">a sua rotina.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Escolha produtos individuais, kits e opções personalizadas para
            crianças, famílias, festas e escolas parceiras.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              type="button"
              size="xl"
              variant="hero"
              onClick={() => {
                track("hero_primary_cta_clicked", {
                  target: "produtos",
                });
                openMenuDrawer();
              }}
            >
              <ShoppingBasket aria-hidden="true" />
              Ver cardápio
            </Button>

            <Button
              type="button"
              size="xl"
              variant="outline"
              onClick={() => {
                track("hero_secondary_cta_clicked", {
                  target: "escolas",
                });
                scrollToSection("escolas");
              }}
            >
              <School aria-hidden="true" />
              Sou de uma escola
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full bg-primary"
                aria-hidden="true"
              />
              Produção própria
            </li>
            <li className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full bg-primary"
                aria-hidden="true"
              />
              Pedidos personalizados
            </li>
            <li className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full bg-primary"
                aria-hidden="true"
              />
              Atendimento para escolas
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
            delay: 0.1,
          }}
          className="relative hidden lg:block"
        >
          <div
            className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-primary/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-10 -right-8 h-48 w-48 rounded-full bg-secondary/30 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-[var(--shadow-soft)]">
            <img
              src="/images/bastidores/cupcake de beterraba.jpeg"
              alt="Cupcakes de beterraba preparados pela Nutri4Kids"
              className="h-full w-full object-cover"
            />

            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-background/90 p-5 shadow-lg backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Escolha do seu jeito
              </p>
              <p className="mt-2 font-display text-lg font-bold text-foreground">
                Produtos individuais, kits e pedidos para escolas.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <button
        type="button"
        onClick={() => scrollToSection("sobre")}
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary md:inline-flex"
      >
        Conhecer
        <ChevronDown
          className="h-4 w-4 animate-bounce"
          aria-hidden="true"
        />
      </button>
    </section>
  );
}
