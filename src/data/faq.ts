export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "Como faço um pedido?",
    answer:
      "Escolha os produtos no catálogo, adicione ao carrinho, preencha os dados de entrega e finalize. Ao confirmar, geramos uma mensagem organizada e abrimos o WhatsApp da equipe para você enviar.",
  },
  {
    question: "Existe quantidade mínima?",
    answer:
      "A quantidade mínima depende do tipo de pedido e da região. Combinamos individualmente durante o atendimento pelo WhatsApp.",
  },
  {
    question: "Qual é o prazo de produção?",
    answer:
      "A maioria dos itens é preparada com 24h de antecedência. Kits, festas e fornecimento escolar exigem prazos maiores e são acordados no atendimento.",
  },
  {
    question: "Como funciona a entrega?",
    answer:
      "Realizamos entregas combinadas em nossa região de atendimento. O valor do frete é confirmado pela equipe após avaliarmos endereço e horário.",
  },
  {
    question: "Posso solicitar adaptações?",
    answer:
      "Sim. Informe restrições, preferências e observações no momento do pedido. Avaliamos cada caso e confirmamos a possibilidade no atendimento.",
  },
  {
    question: "Vocês atendem escolas?",
    answer:
      "Sim. Atendemos escolas parceiras com planejamento de quantidades, frequência e adaptação de cardápios. Solicite uma conversa pela página Para escolas.",
  },
  {
    question: "Como os valores são confirmados?",
    answer:
      "O subtotal exibido no carrinho é estimado. O valor final, incluindo frete e ajustes, é confirmado pela equipe durante o atendimento pelo WhatsApp.",
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer:
      "As formas de pagamento aceitas são confirmadas pela equipe durante o atendimento. [Substituir por informação oficial da empresa.]",
  },
];
