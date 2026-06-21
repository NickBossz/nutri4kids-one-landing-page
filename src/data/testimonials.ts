export interface Testimonial {
  name: string;
  role: string;
  message: string;
  placeholder?: boolean;
}

// Todos os depoimentos abaixo são placeholders — substituir por mensagens reais com autorização.
export const testimonials: Testimonial[] = [
  {
    name: "Mariana, mãe da Alice",
    role: "Família — Bairro Santa Mônica",
    message:
      "Espaço reservado para depoimento real. Substituir por mensagem autorizada da família.",
    placeholder: true,
  },
  {
    name: "Coord. Pedagógica — Escola Exemplo",
    role: "Escola parceira",
    message:
      "Espaço reservado para depoimento institucional. Substituir por feedback real autorizado.",
    placeholder: true,
  },
  {
    name: "Pedro, pai do Bento",
    role: "Família — passeio escolar",
    message:
      "Espaço reservado para depoimento real. Substituir por mensagem autorizada da família.",
    placeholder: true,
  },
];
