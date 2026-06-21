import { Link } from "@tanstack/react-router";
import {
  Clock,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";

import { Logo } from "@/components/shared/Logo";
import { companyConfig } from "@/config/company";
import {
  buildWhatsappUrl,
  isWhatsappConfigured,
} from "@/lib/whatsapp";

const FOOTER_NAVIGATION = [
  {
    to: "/" as const,
    label: "Início",
  },
  {
    to: "/produtos" as const,
    label: "Cardápio",
  },
  {
    to: "/escolas" as const,
    label: "Para escolas",
  },
  {
    to: "/sobre" as const,
    label: "Sobre nós",
  },
];

export function Footer() {
  const whatsappUrl = isWhatsappConfigured()
    ? buildWhatsappUrl(
        "Olá! Gostaria de tirar uma dúvida sobre a Nutri4Kids.",
      )
    : undefined;

  return (
    <footer className="border-t border-border bg-card">
      <div className="container-page grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr]">
        <div>
          <Logo />

          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Lanches infantis, kits e soluções personalizadas para famílias e
            escolas.
          </p>

          {companyConfig.deliveryNotice && (
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {companyConfig.deliveryNotice}
            </p>
          )}
        </div>

        <div>
          <h2 className="font-display text-lg font-bold">
            Navegação
          </h2>

          <nav
            aria-label="Navegação do rodapé"
            className="mt-4 flex flex-col items-start gap-3"
          >
            {FOOTER_NAVIGATION.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}

            <Link
              to="/politica-de-privacidade"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Política de privacidade
            </Link>
          </nav>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold">
            Atendimento
          </h2>

          <ul className="mt-4 space-y-4 text-sm text-muted-foreground">
            {whatsappUrl && (
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 transition-colors hover:text-primary"
                >
                  <MessageCircle
                    className="mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />

                  Falar pelo WhatsApp
                </a>
              </li>
            )}

            {companyConfig.instagram && (
              <li>
                <a
                  href={companyConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 transition-colors hover:text-primary"
                >
                  <Instagram
                    className="mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />

                  Instagram
                </a>
              </li>
            )}

            {companyConfig.email && (
              <li>
                <a
                  href={`mailto:${companyConfig.email}`}
                  className="flex items-start gap-3 transition-colors hover:text-primary"
                >
                  <Mail
                    className="mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />

                  {companyConfig.email}
                </a>
              </li>
            )}

            {companyConfig.serviceRegion && (
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0"
                  aria-hidden="true"
                />

                {companyConfig.serviceRegion}
              </li>
            )}

            {companyConfig.businessHours && (
              <li className="flex items-start gap-3">
                <Clock
                  className="mt-0.5 h-4 w-4 shrink-0"
                  aria-hidden="true"
                />

                {companyConfig.businessHours}
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-3 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {companyConfig.name}. Todos os direitos
            reservados.
          </p>

          <p>
            Lanches preparados para famílias e escolas.
          </p>
        </div>
      </div>
    </footer>
  );
}