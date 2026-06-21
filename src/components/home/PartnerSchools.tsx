import { useState } from "react";
import { Building2, School } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type PartnerSchool = {
  name: string;
  logo?: string;
  description: string;
  partnership: string;
};

const PARTNER_SCHOOLS: PartnerSchool[] = [
{
    name: "Maple Bear",
    logo: "/images/escolas/maplebear.png",
    description:
    "Escola bilíngue baseada na metodologia educacional canadense, com ensino da Educação Infantil ao Ensino Médio.",
    partnership:
    "Parceira da Nutri4Kids no fornecimento de lanches para a rotina e eventos escolares.",
},
{
    name: "Colégio Nacional",
    logo: "/images/escolas/nacional.jpg",
    description:
    "Instituição tradicional de Uberlândia que une acolhimento, inovação e formação completa dos estudantes.",
    partnership:
    "A parceria oferece lanches planejados conforme as necessidades e atividades da escola.",
},
{
    name: "Navegantes",
    logo: "/images/escolas/navegantes.jpg",
    description:
    "Escola que valoriza uma educação humana, investigativa e conectada ao desenvolvimento de cada criança.",
    partnership:
    "A Nutri4Kids participa de momentos especiais e atividades da comunidade escolar.",
},
{
    name: "TECHERS",
    logo: "/images/escolas/techers.jpg",
    description:
    "Escola de tecnologia com cursos de programação, robótica, informática, design e projetos maker.",
    partnership:
    "A parceria leva opções de lanches para alunos durante cursos, atividades e eventos.",
},
];


export function PartnerSchools() {
  const [selectedSchool, setSelectedSchool] =
    useState<PartnerSchool | null>(null);

  return (
    <>
      <section className="py-16 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
              Escolas parceiras
            </p>

            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Instituições que confiam no nosso trabalho
            </h2>

            <p className="mt-4 leading-relaxed text-muted-foreground">
              Parcerias construídas com organização, cuidado e
              atendimento próximo às necessidades de cada escola.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">
            {PARTNER_SCHOOLS.map((school) => (
              <button
                key={school.name}
                type="button"
                onClick={() => setSelectedSchool(school)}
                aria-label={`Ver informações sobre ${school.name}`}
                className="
                  group flex min-w-0 flex-col items-center
                  rounded-2xl p-2
                  transition-transform duration-300
                  hover:-translate-y-1
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-primary
                  focus-visible:ring-offset-4
                "
              >
                <div
                  className="
                    relative flex aspect-[4/3] w-full
                    items-center justify-center
                    overflow-hidden rounded-xl
                  "
                >
                  {school.logo ? (
                    <img
                      src={school.logo}
                      alt={`Logo da ${school.name}`}
                      loading="lazy"
                      className="
                        h-full w-full rounded-xl
                        object-contain
                        transition-transform duration-300
                        group-hover:scale-[1.04]
                      "
                    />
                  ) : (
                    <School
                      aria-hidden="true"
                      className="h-14 w-14 text-primary"
                    />
                  )}

                  <span
                    aria-hidden="true"
                    className="
                      absolute inset-0 rounded-xl
                      ring-1 ring-inset ring-foreground/5
                      transition-colors duration-300
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
                  {school.name}
                </h3>

                <p className="mt-1 text-xs text-muted-foreground">
                  Clique para conhecer
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Dialog
        open={selectedSchool !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedSchool(null);
          }
        }}
      >
        <DialogContent className="max-w-md overflow-hidden rounded-3xl p-0">
          {selectedSchool && (
            <>
              <div className="px-6 pb-2 pt-8">
                <div className="mx-auto flex h-36 w-full items-center justify-center">
                  {selectedSchool.logo ? (
                    <img
                      src={selectedSchool.logo}
                      alt={`Logo da ${selectedSchool.name}`}
                      className="h-full w-full rounded-xl object-contain"
                    />
                  ) : (
                    <School
                      aria-hidden="true"
                      className="h-20 w-20 text-primary"
                    />
                  )}
                </div>
              </div>

              <div className="px-6 pb-7 pt-4">
                <DialogHeader className="text-left">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Building2
                      aria-hidden="true"
                      className="h-5 w-5"
                    />
                  </div>

                  <DialogTitle className="font-display text-2xl">
                    {selectedSchool.name}
                  </DialogTitle>

                  <DialogDescription className="pt-2 text-sm leading-relaxed">
                    {selectedSchool.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-5 rounded-2xl bg-muted/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    Sobre a parceria
                  </p>

                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {selectedSchool.partnership}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}