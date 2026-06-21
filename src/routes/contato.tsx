import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { companyConfig } from "@/config/company";
import { buildWhatsappUrl, isWhatsappConfigured } from "@/lib/whatsapp";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Lanchinho Feliz" },
      {
        name: "description",
        content: "Fale com a nossa equipe pelo WhatsApp para tirar dúvidas ou fazer um pedido.",
      },
      { property: "og:title", content: "Contato — Lanchinho Feliz" },
      { property: "og:description", content: "Atendemos pelo WhatsApp em horário comercial." },
    ],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  const waUrl = isWhatsappConfigured()
    ? buildWhatsappUrl("Olá! Gostaria de mais informações.")
    : undefined;

  return (
    <div className="container-page py-12 md:py-16">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Contato
        </p>
        <h1 className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">
          Vamos conversar
        </h1>
        <p className="mt-3 text-muted-foreground">
          Atendemos preferencialmente pelo WhatsApp para confirmar pedidos,
          esclarecer dúvidas e combinar entregas.
        </p>
      </header>

      <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-2">
        <InfoCard icon={MapPin} title="Região de atendimento" value={companyConfig.serviceRegion} />
        <InfoCard icon={Clock} title="Horário" value={companyConfig.businessHours} />
        {companyConfig.email && (
          <InfoCard icon={Mail} title="E-mail" value={companyConfig.email} />
        )}
        <InfoCard
          icon={MessageCircle}
          title="WhatsApp"
          value={
            isWhatsappConfigured()
              ? formatPhone(companyConfig.whatsapp)
              : "Não configurado"
          }
        />
      </div>

      {waUrl && (
        <div className="mt-10 text-center">
          <Button asChild size="xl" variant="whatsapp">
            <a href={waUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden="true" /> Iniciar conversa no WhatsApp
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  value,
}: {
  icon: typeof MapPin;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h2 className="mt-3 font-display text-base font-bold">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{value || "—"}</p>
    </div>
  );
}

function formatPhone(raw: string): string {
  if (!raw) return "";
  const d = raw.replace(/\D/g, "");
  if (d.length < 12) return raw;
  const country = d.slice(0, 2);
  const area = d.slice(2, 4);
  const rest = d.slice(4);
  const first = rest.slice(0, rest.length - 4);
  const last = rest.slice(-4);
  return `+${country} (${area}) ${first}-${last}`;
}
