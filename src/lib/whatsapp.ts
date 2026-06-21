import { companyConfig } from "@/config/company";
import type { CartItem, CheckoutData } from "@/types";

import { formatBRL } from "./currency";
import { describeOrigin } from "./utm";

export function isWhatsappConfigured(): boolean {
  return Boolean(
    companyConfig.whatsapp &&
      /^\d{10,15}$/.test(companyConfig.whatsapp),
  );
}

function line(
  label: string,
  value?: string | null,
): string {
  if (!value) return "";
  return `${label} ${value}`;
}

export function buildFamilyOrderMessage(args: {
  code: string;
  items: CartItem[];
  data: CheckoutData;
}): string {
  const { code, items, data } = args;

  const subtotal = items.reduce(
    (total, item) =>
      total + item.unitPrice * item.quantity,
    0,
  );

  const hasDelivery =
    data.fulfillment === "entrega" ||
    data.fulfillment === "escola";

  const deliveryFee = hasDelivery
    ? data.deliveryFee ?? 0
    : 0;

  const total = subtotal + deliveryFee;
  const origin = describeOrigin("family");

  const productLines = items
    .map(
      (item) =>
        `• ${item.quantity}x ${item.name}${
          item.variationName
            ? ` (${item.variationName})`
            : ""
        } — ${formatBRL(
          item.unitPrice * item.quantity,
        )}`,
    )
    .join("\n");

  const periodLabel =
    data.period === "manha"
      ? "Manhã"
      : data.period === "tarde"
        ? "Tarde"
        : data.time || "A combinar";

  const freightLine = hasDelivery
    ? data.deliveryFee !== undefined
      ? `🚚 Frete para ${
          data.district ?? "bairro informado"
        }: ${formatBRL(data.deliveryFee)}`
      : "🚚 Frete: a confirmar"
    : "🚚 Frete: não se aplica";

  const totalLine =
    hasDelivery && data.deliveryFee === undefined
      ? "💰 Total final: a confirmar"
      : `💰 Total estimado: ${formatBRL(total)}`;

  return [
    "Olá! Gostaria de realizar um pedido.",
    "",
    `🧾 Pedido: ${code}`,
    `👤 Cliente: ${data.name}`,
    `📞 Telefone: ${data.phone}`,
    data.email ? `✉️ E-mail: ${data.email}` : "",
    "",
    "🛍️ PRODUTOS",
    productLines,
    "",
    `💵 Subtotal: ${formatBRL(subtotal)}`,
    freightLine,
    totalLine,
    "",
    "📍 ENTREGA",
    `Modalidade: ${labelFulfillment(
      data.fulfillment,
    )}`,
    line(
      "Endereço:",
      data.street
        ? `${data.street}, ${data.number ?? "s/n"}`
        : null,
    ),
    line(
      "Bairro/Cidade:",
      [data.district, data.city]
        .filter(Boolean)
        .join(" — ") || null,
    ),
    line("Complemento:", data.complement),
    line("Referência:", data.reference),
    line("CEP:", data.cep),
    "",
    `📅 Data desejada: ${data.date}`,
    `⏰ Horário desejado: ${periodLabel}`,
    "",
    "⚠️ Restrições ou cuidados:",
    data.restrictions || "—",
    "",
    "📝 Observações:",
    data.notes || "—",
    "",
    `Referência interna: ${code}`,
    `Origem: ${origin}`,
    "Modalidade: Família",
    "",
    "Aguardo a confirmação de disponibilidade e horário.",
  ]
    .filter((item) => item !== "")
    .join("\n");
}

export function buildSchoolMessage(args: {
  code: string;
  schoolName: string;
  responsibleName: string;
  phone: string;
  childrenCount?: string;
  frequency?: string;
  region?: string;
  needs?: string;
  restrictions?: string;
}): string {
  const origin = describeOrigin("school");

  return [
    "Olá! Represento uma escola e gostaria de conversar sobre uma parceria.",
    "",
    `🏫 Escola: ${args.schoolName}`,
    `👤 Responsável: ${args.responsibleName}`,
    `📞 Telefone: ${args.phone}`,
    args.childrenCount
      ? `👧 Número aproximado de crianças: ${args.childrenCount}`
      : "",
    args.frequency
      ? `📅 Frequência desejada: ${args.frequency}`
      : "",
    args.region ? `📍 Região: ${args.region}` : "",
    "",
    "Necessidade principal:",
    args.needs || "—",
    "",
    "Restrições ou informações importantes:",
    args.restrictions || "—",
    "",
    `Referência interna: ${args.code}`,
    `Origem: ${origin}`,
    "Modalidade: Escola",
  ]
    .filter(Boolean)
    .join("\n");
}

function labelFulfillment(
  fulfillment: CheckoutData["fulfillment"],
): string {
  switch (fulfillment) {
    case "entrega":
      return "Entrega";
    case "retirada":
      return "Retirada";
    case "escola":
      return "Entrega em escola";
    case "recorrente":
      return "Pedido recorrente escolar";
  }
}

export function buildWhatsappUrl(
  message: string,
): string {
  const number = companyConfig.whatsapp;
  return `https://wa.me/${number}?text=${encodeURIComponent(
    message,
  )}`;
}
