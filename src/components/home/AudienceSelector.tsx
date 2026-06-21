import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Home, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function AudienceSelector() {
  const audience = useCartStore((s) => s.audience);
  const setAudience = useCartStore((s) => s.setAudience);

  const options = [
    {
      id: "family" as const,
      icon: Home,
      title: "Quero comprar para minha família",
      desc: "Lancheiras, kits e opções práticas para o dia a dia das crianças.",
    },
    {
      id: "school" as const,
      icon: School,
      title: "Represento uma escola",
      desc: "Parceria, fornecimento recorrente e adaptação de cardápios.",
    },
  ];

  return (
    <section id="jornada" className="container-page py-16 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Como podemos ajudar?
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          Escolha o caminho que faz sentido para você
        </h2>
      </div>

      <div
        role="tablist"
        aria-label="Selecionar tipo de cliente"
        className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2"
      >
        {options.map((o) => {
          const active = audience === o.id;
          const Icon = o.icon;
          return (
            <button
              key={o.id}
              role="tab"
              aria-selected={active}
              onClick={() => {
                setAudience(o.id);
                track(
                  o.id === "family" ? "audience_family_selected" : "audience_school_selected",
                );
              }}
              className={cn(
                "group rounded-3xl border bg-card p-6 text-left transition-all",
                active
                  ? "border-primary shadow-[var(--shadow-soft)] ring-2 ring-primary/20"
                  : "border-border hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]",
              )}
            >
              <div className="flex items-start gap-4">
                <span
                  className={cn(
                    "grid h-12 w-12 shrink-0 place-items-center rounded-2xl",
                    active ? "bg-primary text-primary-foreground" : "bg-accent text-primary",
                  )}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-bold">{o.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{o.desc}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={audience}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-3 text-center"
        >
          {audience === "family" ? (
            <>
              <p className="text-muted-foreground">
                Monte sua lancheira, escolha kits e combine entregas pelo WhatsApp.
              </p>
              <Button asChild size="lg" variant="hero">
                <Link to="/produtos">Ver produtos para famílias</Link>
              </Button>
            </>
          ) : (
            <>
              <p className="text-muted-foreground">
                Conheça nossa proposta de fornecimento e solicite uma conversa.
              </p>
              <Button asChild size="lg" variant="hero">
                <Link to="/escolas">Conhecer parceria escolar</Link>
              </Button>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
