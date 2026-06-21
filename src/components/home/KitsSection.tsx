import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

interface KitTile {
  title: string;
  desc: string;
  image: string;
}

const KITS: KitTile[] = [
  {
    title: "Kit para escola",
    desc: "Combinações para abastecer a rotina escolar com leveza.",
    image:
      "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=900&q=70",
  },
  {
    title: "Kit para passeio",
    desc: "Lanches resistentes para excursões e passeios em família.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=70",
  },
  {
    title: "Kit para festa",
    desc: "Mini sanduíches, salgadinhos e doces para celebrar.",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=70",
  },
];

export function KitsSection() {
  return (
    <section className="container-page py-16 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Lancheiras e kits
          </p>
          <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
            Combinações prontas para cada ocasião
          </h2>
        </div>
        <Button asChild variant="outline">
          <Link to="/produtos">Explorar todos</Link>
        </Button>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {KITS.map((k) => (
          <article
            key={k.title}
            className="group overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={k.image}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <h3 className="font-display text-xl font-bold">{k.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{k.desc}</p>
              <Button asChild variant="ghost" className="mt-3 px-0 text-primary hover:bg-transparent">
                <Link to="/produtos">Ver opções →</Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
