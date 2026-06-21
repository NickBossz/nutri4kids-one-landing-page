import { createFileRoute } from "@tanstack/react-router";

import { BenefitsSection } from "@/components/home/BenefitsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { FinalCTA } from "@/components/home/FinalCTA";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PartnerSchools } from "@/components/home/PartnerSchools";
import { ProductionGallery } from "@/components/home/ProductionGallery";
import { SchoolsPreview } from "@/components/home/SchoolsPreview";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Nutri4Kids | Lanches infantis para famílias e escolas",
      },
      {
        name: "description",
        content:
          "Lanches infantis, kits e pedidos personalizados para famílias e escolas.",
      },
      {
        property: "og:title",
        content: "Nutri4Kids",
      },
      {
        property: "og:description",
        content:
          "Lanches infantis preparados para facilitar a rotina de famílias e escolas.",
      },
    ],
  }),

  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroSection />

      <BenefitsSection />

      <HowItWorks />

      <FeaturedProducts />

      <ProductionGallery />

      <PartnerSchools />

      <SchoolsPreview />

      <FaqSection />

      <FinalCTA />
    </>
  );
}