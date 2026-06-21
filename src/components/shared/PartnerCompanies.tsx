import { useState } from "react";
import { Building2, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type PartnerCompany = {
  id: string;
  name: string;
  logo: string;
  description: string;
  partnership?: string;
};

const PARTNER_COMPANIES: PartnerCompany[] = [
  {
    id: "empresa-1",
    name: "Nome da escola 1",
    logo: "/images/escolas/escola-1.png",
    description:
      "Escola parceira atendida pela Nutri4Kids com lanches preparados para diferentes momentos da rotina escolar.",
    partnership:
      "Fornecimento de lanches para eventos, reuniões e ações especiais.",
  },
  {
    id: "empresa-2",
    name: "Nome da escola 2",
    logo: "/images/escolas/escola-2.png",
    description:
      "Instituição parceira que conta com opções de lanches organizadas conforme a quantidade de alunos e o tipo de ocasião.",
    partnership:
      "Atendimento personalizado conforme a necessidade da instituição.",
  },
  {
    id: "empresa-3",
    name: "Nome da escola 3",
    logo: "/images/escolas/escola-3.png",
    description:
      "Parceria voltada ao fornecimento de produtos preparados com cuidado para crianças, responsáveis e colaboradores.",
    partnership:
      "Pedidos planejados para turmas, eventos e datas comemorativas.",
  },
];

export function PartnerCompanies() {
  const [selectedCompany, setSelectedCompany] =
    useState<PartnerCompany | null>(null);

  return (
    <>
      <section className="py-16 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Quem confia em nosso trabalho
            </p>

            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Empresas e escolas parceiras
            </h2>

            <p className="mt-3 text-muted-foreground">
              Conheça algumas instituições que fazem parte da nossa
              história. Clique em uma logo para saber mais.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {PARTNER_COMPANIES.map((company) => (
              <button
                key={company.id}
                type="button"
                onClick={() => setSelectedCompany(company)}
                className="
                  group flex min-w-0 flex-col items-center
                  focus-visible:outline-none
                "
                aria-label={`Conhecer a parceria com ${company.name}`}
              >
                <div
                  className="
                    relative flex aspect-[4/3] w-full
                    items-center justify-center overflow-hidden
                    rounded-xl transition-all duration-300
                    group-hover:-translate-y-1
                    group-focus-visible:ring-2
                    group-focus-visible:ring-primary
                    group-focus-visible:ring-offset-4
                  "
                >
                  <img
                    src={company.logo}
                    alt={`Logo da ${company.name}`}
                    loading="lazy"
                    className="
                      h-full w-full rounded-xl object-contain
                      transition-transform duration-300
                      group-hover:scale-[1.03]
                    "
                  />

                  <div
                    aria-hidden="true"
                    className="
                      absolute inset-0 rounded-xl
                      ring-1 ring-inset ring-foreground/5
                      transition-colors
                      group-hover:ring-primary/25
                    "
                  />
                </div>

                <h3
                  className="
                    mt-3 text-center text-sm font-semibold
                    text-foreground transition-colors
                    group-hover:text-primary sm:text-base
                  "
                >
                  {company.name}
                </h3>

                <span className="mt-1 text-xs text-muted-foreground">
                  Clique para conhecer
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Dialog
        open={Boolean(selectedCompany)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedCompany(null);
          }
        }}
      >
        <DialogContent className="max-w-md rounded-3xl p-0">
          {selectedCompany && (
            <div className="overflow-hidden rounded-3xl">
              <div className="relative px-6 pb-2 pt-8">
                <div className="mx-auto flex h-36 w-full items-center justify-center">
                  <img
                    src={selectedCompany.logo}
                    alt={`Logo da ${selectedCompany.name}`}
                    className="h-full w-full rounded-xl object-contain"
                  />
                </div>
              </div>

              <div className="px-6 pb-7 pt-4">
                <DialogHeader className="text-left">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Building2
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>

                  <DialogTitle className="font-display text-2xl">
                    {selectedCompany.name}
                  </DialogTitle>

                  <DialogDescription className="pt-2 text-sm leading-relaxed">
                    {selectedCompany.description}
                  </DialogDescription>
                </DialogHeader>

                {selectedCompany.partnership && (
                  <div className="mt-5 rounded-2xl bg-muted/60 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                      Sobre a parceria
                    </p>

                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {selectedCompany.partnership}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}