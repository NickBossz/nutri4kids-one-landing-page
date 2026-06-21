import { createFileRoute } from "@tanstack/react-router";
import { FaqSection } from "@/components/home/FaqSection";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Lanchinho Feliz" },
      {
        name: "description",
        content: "Tire suas dúvidas sobre pedidos, entregas, prazos e parcerias escolares.",
      },
      { property: "og:title", content: "FAQ — Lanchinho Feliz" },
      { property: "og:description", content: "Respostas para as perguntas mais comuns." },
    ],
  }),
  component: () => (
    <div className="pt-6">
      <FaqSection />
    </div>
  ),
});
