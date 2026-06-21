// Configuração centralizada da empresa.
// Substitua os campos marcados como [PLACEHOLDER] quando os dados reais forem fornecidos.

export const companyConfig = {
  name: "Lanchinho Feliz", // [PLACEHOLDER] — substituir pelo nome real
  tagline: "Alimentação feita com carinho para cada fase da infância",
  whatsapp:
    (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined) ?? "5534993340676",
  instagram: "", // [PLACEHOLDER]
  email: "", // [PLACEHOLDER]
  address: "Uberlândia — MG", // [PLACEHOLDER]
  serviceRegion: "Uberlândia e região", // [PLACEHOLDER]
  businessHours: "Seg a Sex • 8h às 18h", // [PLACEHOLDER]
  minimumOrder: "",
  deliveryNotice:
    "Produtos, valores, prazos e disponibilidade estão sujeitos à confirmação durante o atendimento.",
  announcementMessages: [
    "Entregas sob consulta na região.",
    "Atendemos famílias e escolas parceiras.",
    "Pedidos personalizados pelo WhatsApp.",
  ],
} as const;

export type AudienceMode = "family" | "school";
