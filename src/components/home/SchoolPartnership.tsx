import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  buildSchoolMessage,
  buildWhatsappUrl,
  isWhatsappConfigured,
} from "@/lib/whatsapp";
import { generateOrderCode } from "@/lib/order-code";
import { track } from "@/lib/analytics";
import {
  formatPhone,
  isValidBrazilianPhone,
} from "@/lib/phone";

const schema = z.object({
  schoolName: z
    .string()
    .trim()
    .min(2, "Informe o nome da escola")
    .max(120),

  responsibleName: z
    .string()
    .trim()
    .min(2, "Informe o responsável")
    .max(120),

  phone: z
    .string()
    .trim()
    .min(1, "Informe o telefone")
    .refine(
      isValidBrazilianPhone,
      "Informe um telefone válido com DDD",
    ),

  childrenCount: z
    .string()
    .trim()
    .max(20)
    .optional()
    .or(z.literal("")),
});

type Values = z.infer<typeof schema>;

export function SchoolPartnership() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      schoolName: "",
      responsibleName: "",
      phone: "",
      childrenCount: "",
    },
  });

  const onSubmit = (values: Values) => {
    if (!isWhatsappConfigured()) {
      toast.error("WhatsApp não configurado");
      return;
    }

    const code = generateOrderCode("PAR");

    const url = buildWhatsappUrl(
      buildSchoolMessage({
        code,
        schoolName: values.schoolName,
        responsibleName: values.responsibleName,
        phone: values.phone,
        childrenCount:
          values.childrenCount || undefined,
      }),
    );

    track("school_contact_clicked", { code });

    window.open(
      url,
      "_blank",
      "noopener,noreferrer",
    );

    setSent(true);
  };

  return (
    <section className="section-padding bg-muted/40">
      <div className="container-page grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
            Para escolas
          </p>

          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Uma parceria que vai além do lanche.
          </h2>

          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            Atendemos escolas com planejamento de quantidade,
            possibilidade de frequência recorrente e comunicação
            próxima com a instituição. Adaptamos cardápios conforme
            a operação e a realidade da escola.
          </p>

          <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
            <li className="rounded-2xl border border-border bg-background p-4">
              Planejamento por turma e por turno
            </li>

            <li className="rounded-2xl border border-border bg-background p-4">
              Cardápios adaptáveis
            </li>

            <li className="rounded-2xl border border-border bg-background p-4">
              Frequência semanal ou pontual
            </li>

            <li className="rounded-2xl border border-border bg-background p-4">
              Comunicação direta com a coordenação
            </li>
          </ul>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-3xl border border-border bg-background p-5 shadow-sm sm:p-6"
        >
          <h3 className="font-display text-xl font-bold">
            Solicitar uma conversa
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Preencha e enviaremos uma mensagem pronta no WhatsApp.
          </p>

          <div className="mt-5 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="schoolName">
                Nome da escola
              </Label>

              <Input
                id="schoolName"
                autoComplete="organization"
                placeholder="Nome da instituição"
                aria-invalid={Boolean(errors.schoolName)}
                {...register("schoolName")}
              />

              {errors.schoolName && (
                <p className="text-sm text-destructive">
                  {errors.schoolName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsibleName">
                Nome do responsável
              </Label>

              <Input
                id="responsibleName"
                autoComplete="name"
                placeholder="Seu nome"
                aria-invalid={Boolean(errors.responsibleName)}
                {...register("responsibleName")}
              />

              {errors.responsibleName && (
                <p className="text-sm text-destructive">
                  {errors.responsibleName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="schoolPhone">
                Telefone
              </Label>

              <Input
                id="schoolPhone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="(34) 99999-9999"
                maxLength={15}
                aria-invalid={Boolean(errors.phone)}
                {...register("phone", {
                  onChange: (event) => {
                    setValue(
                      "phone",
                      formatPhone(event.target.value),
                      {
                        shouldDirty: true,
                        shouldValidate: false,
                      },
                    );
                  },
                })}
              />

              {errors.phone && (
                <p className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="childrenCount">
                Nº aproximado de crianças
              </Label>

              <Input
                id="childrenCount"
                inputMode="numeric"
                placeholder="Ex.: 120"
                {...register("childrenCount")}
              />
            </div>

            <Button
              type="submit"
              variant="whatsapp"
              className="w-full"
              disabled={isSubmitting}
            >
              <MessageCircle className="h-4 w-4" />
              Solicitar conversa
            </Button>

            {sent && (
              <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
                Mensagem aberta no WhatsApp. Caso a janela não tenha
                aparecido, verifique seu navegador.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
