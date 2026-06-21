// Configuração centralizada da empresa.
// Edite os campos abaixo quando quiser alterar os dados exibidos no site.

export const companyConfig = {
  name: "Nutri4Kids",
  tagline: "Alimentação feita com carinho para cada fase da infância",
  whatsapp:
    (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined) ??
    "5534993340676",
  instagram: "",
  email: "",
  address: "Uberlândia — MG",
  serviceRegion: "Uberlândia e região",
  businessHours: "Seg a Sex • 8h às 18h",
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
