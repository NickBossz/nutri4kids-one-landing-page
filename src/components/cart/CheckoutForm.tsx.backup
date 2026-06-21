import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  Check,
  LoaderCircle,
  MapPin,
  MessageCircle,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DELIVERY_CITY,
  DELIVERY_STATE,
  deliveryNeighborhoods,
  findDeliveryNeighborhood,
  getDeliveryFee,
  normalizeLocation,
} from "@/config/delivery";
import {
  findAddressByCep,
  formatCep,
  onlyNumbers,
} from "@/services/cep";
import { useCartStore } from "@/store/cart-store";
import { formatBRL } from "@/lib/currency";
import { formatPhone, isValidBrazilianPhone } from "@/lib/phone";
import {
  buildFamilyOrderMessage,
  buildWhatsappUrl,
  isWhatsappConfigured,
} from "@/lib/whatsapp";
import { generateOrderCode } from "@/lib/order-code";
import { track } from "@/lib/analytics";

const todayIso = () =>
  new Date().toISOString().slice(0, 10);

const schema = z
  .object({
    fulfillment: z.enum([
      "entrega",
      "retirada",
      "escola",
      "recorrente",
    ]),

    name: z
      .string()
      .trim()
      .min(2, "Informe seu nome")
      .max(120),

    phone: z
      .string()
      .trim()
      .min(1, "Informe o telefone")
      .refine(
        isValidBrazilianPhone,
        "Informe um telefone válido com DDD",
      ),

    email: z
      .string()
      .trim()
      .email("E-mail inválido")
      .max(120)
      .optional()
      .or(z.literal("")),

    cep: z
      .string()
      .trim()
      .refine(
        (value) =>
          !value || onlyNumbers(value).length === 8,
        "Informe um CEP válido",
      )
      .optional()
      .or(z.literal("")),

    street: z
      .string()
      .trim()
      .max(160)
      .optional()
      .or(z.literal("")),

    number: z
      .string()
      .trim()
      .max(20)
      .optional()
      .or(z.literal("")),

    complement: z
      .string()
      .trim()
      .max(120)
      .optional()
      .or(z.literal("")),

    district: z
      .string()
      .trim()
      .max(80)
      .optional()
      .or(z.literal("")),

    city: z
      .string()
      .trim()
      .max(80)
      .optional()
      .or(z.literal("")),

    reference: z
      .string()
      .trim()
      .max(160)
      .optional()
      .or(z.literal("")),

    schoolName: z
      .string()
      .trim()
      .max(120)
      .optional()
      .or(z.literal("")),

    date: z
      .string()
      .min(1, "Escolha uma data")
      .refine(
        (value) => value >= todayIso(),
        "Selecione uma data a partir de hoje",
      ),

    period: z.enum([
      "manha",
      "tarde",
      "horario",
    ]),

    time: z
      .string()
      .optional()
      .or(z.literal("")),

    childName: z
      .string()
      .max(80)
      .optional()
      .or(z.literal("")),

    ageRange: z
      .string()
      .max(40)
      .optional()
      .or(z.literal("")),

    restrictions: z
      .string()
      .max(400)
      .optional()
      .or(z.literal("")),

    notes: z
      .string()
      .max(600)
      .optional()
      .or(z.literal("")),

    packaging: z
      .string()
      .max(160)
      .optional()
      .or(z.literal("")),

    reviewConfirmed: z.literal(true, {
      errorMap: () => ({
        message: "Confirme a revisão",
      }),
    }),
  })
  .superRefine((values, context) => {
    const needsAddress =
      values.fulfillment === "entrega" ||
      values.fulfillment === "escola";

    if (needsAddress && !values.cep) {
      context.addIssue({
        path: ["cep"],
        code: "custom",
        message: "Informe o CEP da entrega",
      });
    }

    if (needsAddress && !values.street) {
      context.addIssue({
        path: ["street"],
        code: "custom",
        message: "Informe o endereço",
      });
    }

    if (needsAddress && !values.number) {
      context.addIssue({
        path: ["number"],
        code: "custom",
        message: "Informe o número",
      });
    }

    if (needsAddress && !values.district) {
      context.addIssue({
        path: ["district"],
        code: "custom",
        message: "Selecione um bairro atendido",
      });
    }

    if (
      needsAddress &&
      normalizeLocation(values.city ?? "") !==
        normalizeLocation(DELIVERY_CITY)
    ) {
      context.addIssue({
        path: ["city"],
        code: "custom",
        message: "Atendemos somente Uberlândia",
      });
    }

    if (
      values.fulfillment === "escola" &&
      !values.schoolName
    ) {
      context.addIssue({
        path: ["schoolName"],
        code: "custom",
        message: "Informe a escola",
      });
    }

    if (
      values.period === "horario" &&
      !values.time
    ) {
      context.addIssue({
        path: ["time"],
        code: "custom",
        message: "Informe o horário",
      });
    }
  });

type FormValues = z.infer<typeof schema>;

interface CheckoutFormProps {
  onBack: () => void;
}

export function CheckoutForm({
  onBack,
}: CheckoutFormProps) {
  const items = useCartStore((state) => state.items);

  const subtotal = useCartStore(
    (state) => state.getSubtotal(),
  );

  const deliveryFee = useCartStore(
    (state) => state.deliveryFee,
  );

  const deliveryDistrict = useCartStore(
    (state) => state.deliveryDistrict,
  );

  const setDelivery = useCartStore(
    (state) => state.setDelivery,
  );

  const clearDelivery = useCartStore(
    (state) => state.clearDelivery,
  );

  const setLastOrderCode = useCartStore(
    (state) => state.setLastOrderCode,
  );

  const clearCart = useCartStore(
    (state) => state.clearCart,
  );

  const lastOrderCode = useCartStore(
    (state) => state.lastOrderCode,
  );

  const close = useCartStore(
    (state) => state.close,
  );

  const [sent, setSent] = useState(
    Boolean(lastOrderCode),
  );

  const [lastUrl, setLastUrl] = useState<
    string | null
  >(null);

  const [isLoadingCep, setIsLoadingCep] =
    useState(false);

  const [cepMessage, setCepMessage] = useState<
    string | null
  >(null);

  const [cepError, setCepError] = useState<
    string | null
  >(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    clearErrors,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fulfillment: "entrega",
      period: "manha",
      date: todayIso(),
      city: DELIVERY_CITY,
      district: deliveryDistrict ?? "",
      reviewConfirmed:
        false as unknown as true,
    },
  });

  const fulfillment = watch("fulfillment");
  const period = watch("period");
  const district = watch("district");
  const reviewConfirmed = watch(
    "reviewConfirmed",
  );

  const showAddress =
    fulfillment === "entrega" ||
    fulfillment === "escola";

  const showSchool =
    fulfillment === "escola" ||
    fulfillment === "recorrente";

  const waConfigured =
    isWhatsappConfigured();

  const effectiveDeliveryFee =
    showAddress ? deliveryFee : 0;

  const total =
    subtotal + (effectiveDeliveryFee ?? 0);

  async function handleCepLookup() {
    const cep = getValues("cep") ?? "";

    if (onlyNumbers(cep).length !== 8) {
      setCepError(
        "Informe um CEP com 8 números.",
      );
      setCepMessage(null);
      clearDelivery();
      return;
    }

    try {
      setIsLoadingCep(true);
      setCepError(null);
      setCepMessage(null);

      const address =
        await findAddressByCep(cep);

      const isUberlandia =
        normalizeLocation(address.localidade) ===
          normalizeLocation(DELIVERY_CITY) &&
        address.uf.toUpperCase() ===
          DELIVERY_STATE;

      if (!isUberlandia) {
        setValue("street", "");
        setValue("district", "");
        setValue("city", "");
        clearDelivery();

        setCepError(
          "No momento, realizamos entregas somente em Uberlândia - MG.",
        );

        return;
      }

      setValue(
        "cep",
        formatCep(address.cep),
        {
          shouldValidate: true,
        },
      );

      setValue(
        "street",
        address.logradouro ?? "",
        {
          shouldValidate: true,
        },
      );

      setValue(
        "city",
        DELIVERY_CITY,
        {
          shouldValidate: true,
        },
      );

      const neighborhood =
        findDeliveryNeighborhood(
          address.bairro ?? "",
        );

      if (!neighborhood) {
        setValue("district", "");
        clearDelivery();

        setCepError(
          "O CEP pertence a Uberlândia, mas o bairro ainda não está na área de entrega.",
        );

        return;
      }

      setValue(
        "district",
        neighborhood.name,
        {
          shouldValidate: true,
        },
      );

      setDelivery(
        neighborhood.name,
        neighborhood.fee,
      );

      clearErrors([
        "cep",
        "street",
        "district",
        "city",
      ]);

      setCepMessage(
        `Entrega disponível em ${
          neighborhood.name
        }. Frete: ${formatBRL(
          neighborhood.fee,
        )}.`,
      );
    } catch (error) {
      setCepError(
        error instanceof Error
          ? error.message
          : "Não foi possível consultar o CEP.",
      );

      setCepMessage(null);
      clearDelivery();
    } finally {
      setIsLoadingCep(false);
    }
  }

  function handleDistrictChange(
    selectedDistrict: string,
  ) {
    const fee = getDeliveryFee(
      selectedDistrict,
    );

    setValue(
      "district",
      selectedDistrict,
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );

    if (fee === null) {
      clearDelivery();
      return;
    }

    setDelivery(
      selectedDistrict,
      fee,
    );

    setCepError(null);

    setCepMessage(
      `Frete para ${selectedDistrict}: ${formatBRL(
        fee,
      )}.`,
    );
  }

  function handleFulfillmentChange(
    value: FormValues["fulfillment"],
  ) {
    setValue(
      "fulfillment",
      value,
      {
        shouldValidate: true,
      },
    );

    setCepError(null);
    setCepMessage(null);

    if (
      value === "retirada" ||
      value === "recorrente"
    ) {
      clearDelivery();
    }
  }

  const onSubmit = (
    values: FormValues,
  ) => {
    track("checkout_started");

    const requiresDelivery =
      values.fulfillment === "entrega" ||
      values.fulfillment === "escola";

    if (
      requiresDelivery &&
      deliveryFee === null
    ) {
      toast.error(
        "Calcule o frete antes de continuar",
        {
          description:
            "Informe um CEP válido e selecione um bairro atendido.",
        },
      );

      return;
    }

    if (!waConfigured) {
      toast.error(
        "WhatsApp não configurado",
        {
          description:
            "Defina VITE_WHATSAPP_NUMBER no ambiente.",
        },
      );

      track("checkout_error", {
        reason:
          "whatsapp_not_configured",
      });

      return;
    }

    const code =
      generateOrderCode("PED");

    const message =
      buildFamilyOrderMessage({
        code,
        items,
        data: {
          ...values,
          email:
            values.email || undefined,
          deliveryFee:
            requiresDelivery
              ? deliveryFee ?? undefined
              : 0,
          reviewConfirmed: true,
        },
      });

    const url =
      buildWhatsappUrl(message);

    setLastOrderCode(code);
    setLastUrl(url);
    setSent(true);

    track(
      "whatsapp_order_clicked",
      { code },
    );

    window.open(
      url,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const orderSummary = useMemo(
    () => (
      <div className="rounded-2xl border border-border bg-muted/40 p-4">
        <h3 className="font-semibold">
          Resumo do pedido
        </h3>

        <div className="mt-3 space-y-2 text-sm">
          {items.map((item) => (
            <div
              key={`${item.productId}-${
                item.variationId ?? "default"
              }`}
              className="flex items-start justify-between gap-4"
            >
              <span className="text-muted-foreground">
                {item.quantity}x {item.name}
              </span>

              <span>
                {formatBRL(
                  item.unitPrice *
                    item.quantity,
                )}
              </span>
            </div>
          ))}

          <div className="border-t border-border pt-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Subtotal
              </span>

              <span>
                {formatBRL(subtotal)}
              </span>
            </div>

            <div className="mt-2 flex items-start justify-between gap-4">
              <div>
                <span className="text-muted-foreground">
                  Frete
                </span>

                {deliveryDistrict &&
                  showAddress && (
                    <p className="text-xs text-muted-foreground">
                      {deliveryDistrict}
                    </p>
                  )}
              </div>

              <span className="text-right">
                {!showAddress
                  ? "Sem frete"
                  : deliveryFee !== null
                    ? formatBRL(
                        deliveryFee,
                      )
                    : "Informe o CEP"}
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between border-t border-border pt-2 font-bold">
              <span>
                Total estimado
              </span>

              <span>
                {formatBRL(total)}
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    [
      deliveryDistrict,
      deliveryFee,
      items,
      showAddress,
      subtotal,
      total,
    ],
  );

  if (sent && lastOrderCode) {
    return (
      <div className="flex flex-1 flex-col overflow-y-auto p-5">
        <div className="my-auto text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <Check className="h-7 w-7" />
          </div>

          <h2 className="mt-4 text-xl font-bold">
            Pedido preparado
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Código {lastOrderCode}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Abrimos o WhatsApp em uma nova aba. Se a
            janela não abriu, clique no botão abaixo.
          </p>

          {lastUrl && (
            <Button
              asChild
              size="lg"
              variant="whatsapp"
              className="mt-5 w-full"
            >
              <a
                href={lastUrl}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                Abrir WhatsApp novamente
              </a>
            </Button>
          )}

          <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-4 text-left">
            <h3 className="font-semibold">
              E agora?
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Mantemos o carrinho salvo caso você
              precise revisar. Quando quiser começar
              um novo pedido, esvazie o carrinho.
            </p>
          </div>

          <div className="mt-5 grid gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={close}
            >
              Voltar ao site
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="text-destructive hover:text-destructive"
              onClick={() => {
                clearCart();
                toast.success(
                  "Carrinho limpo",
                );
                close();
              }}
            >
              <Trash2 className="h-4 w-4" />
              Limpar carrinho
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-h-0 flex-1 flex-col"
    >
      <div className="flex-1 space-y-5 overflow-y-auto p-5">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="-ml-2"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao carrinho
        </Button>

        {orderSummary}

        <section className="space-y-4">
          <h3 className="font-semibold">
            Tipo de pedido
          </h3>

          <Field
            label="Modalidade"
            required
            error={
              errors.fulfillment?.message
            }
          >
            <Select
              value={fulfillment}
              onValueChange={(value) =>
                handleFulfillmentChange(
                  value as FormValues["fulfillment"],
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="entrega">
                  Entrega
                </SelectItem>

                <SelectItem value="escola">
                  Entrega em escola
                </SelectItem>

                <SelectItem value="recorrente">
                  Pedido recorrente escolar
                </SelectItem>

                <SelectItem value="retirada">
                  Retirada
                </SelectItem>
              </SelectContent>
            </Select>
          </Field>

          {showSchool && (
            <Field
              label="Nome da escola"
              required={
                fulfillment === "escola"
              }
              error={
                errors.schoolName?.message
              }
            >
              <Input
                placeholder="Nome da instituição"
                {...register("schoolName")}
              />
            </Field>
          )}
        </section>

        <section className="space-y-4">
          <h3 className="font-semibold">
            Seus dados
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Nome"
              required
              error={errors.name?.message}
            >
              <Input
                autoComplete="name"
                placeholder="Seu nome"
                {...register("name")}
              />
            </Field>

            <Field
              label="Telefone"
              required
              error={
                errors.phone?.message
              }
            >
              <Input
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
            </Field>

            <Field
              label="E-mail"
              error={
                errors.email?.message
              }
              className="sm:col-span-2"
            >
              <Input
                type="email"
                autoComplete="email"
                placeholder="voce@email.com"
                {...register("email")}
              />
            </Field>
          </div>
        </section>

        {showAddress && (
          <section className="space-y-4">
            <div>
              <h3 className="font-semibold">
                Endereço de entrega
              </h3>

              <p className="mt-1 text-xs text-muted-foreground">
                Atendemos somente Uberlândia - MG.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="CEP"
                required
                error={
                  errors.cep?.message
                }
                className="sm:col-span-2"
              >
                <div className="flex gap-2">
                  <Input
                    inputMode="numeric"
                    autoComplete="postal-code"
                    placeholder="38400-000"
                    maxLength={9}
                    {...register("cep", {
                      onChange: (
                        event,
                      ) => {
                        const formatted =
                          formatCep(
                            event.target.value,
                          );

                        setValue(
                          "cep",
                          formatted,
                          {
                            shouldDirty: true,
                          },
                        );

                        setCepError(null);
                        setCepMessage(null);
                        clearDelivery();
                      },
                    })}
                    onBlur={() => {
                      const cep =
                        getValues(
                          "cep",
                        ) ?? "";

                      if (
                        onlyNumbers(cep)
                          .length === 8
                      ) {
                        void handleCepLookup();
                      }
                    }}
                  />

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      void handleCepLookup()
                    }
                    disabled={isLoadingCep}
                    className="shrink-0"
                  >
                    {isLoadingCep ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : (
                      <MapPin className="h-4 w-4" />
                    )}

                    <span className="hidden sm:inline">
                      Buscar
                    </span>
                  </Button>
                </div>
              </Field>

              <Field
                label="Cidade"
                required
                error={
                  errors.city?.message
                }
              >
                <Input
                  readOnly
                  className="bg-muted"
                  {...register("city")}
                />
              </Field>

              <Field
                label="Bairro"
                required
                error={
                  errors.district?.message
                }
              >
                <Select
                  value={district || ""}
                  onValueChange={
                    handleDistrictChange
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o bairro" />
                  </SelectTrigger>

                  <SelectContent>
                    {deliveryNeighborhoods.map(
                      (neighborhood) => (
                        <SelectItem
                          key={
                            neighborhood.name
                          }
                          value={
                            neighborhood.name
                          }
                        >
                          {neighborhood.name} —{" "}
                          {formatBRL(
                            neighborhood.fee,
                          )}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </Field>

              <Field
                label="Rua"
                required
                error={
                  errors.street?.message
                }
                className="sm:col-span-2"
              >
                <Input
                  autoComplete="street-address"
                  placeholder="Rua ou avenida"
                  {...register("street")}
                />
              </Field>

              <Field
                label="Número"
                required
                error={
                  errors.number?.message
                }
              >
                <Input
                  inputMode="numeric"
                  placeholder="123"
                  {...register("number")}
                />
              </Field>

              <Field
                label="Complemento"
                error={
                  errors.complement?.message
                }
              >
                <Input
                  placeholder="Apartamento, bloco..."
                  {...register("complement")}
                />
              </Field>

              <Field
                label="Ponto de referência"
                error={
                  errors.reference?.message
                }
                className="sm:col-span-2"
              >
                <Input
                  placeholder="Próximo a..."
                  {...register("reference")}
                />
              </Field>
            </div>

            {cepError && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                {cepError}
              </div>
            )}

            {cepMessage && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
                {cepMessage}
              </div>
            )}
          </section>
        )}

        <section className="space-y-4">
          <h3 className="font-semibold">
            Data e preferências
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Data desejada"
              required
              error={
                errors.date?.message
              }
            >
              <Input
                type="date"
                min={todayIso()}
                {...register("date")}
              />
            </Field>

            <Field
              label="Período"
              required
              error={
                errors.period?.message
              }
            >
              <Select
                value={period}
                onValueChange={(value) =>
                  setValue(
                    "period",
                    value as FormValues["period"],
                    {
                      shouldValidate: true,
                    },
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="manha">
                    Manhã
                  </SelectItem>

                  <SelectItem value="tarde">
                    Tarde
                  </SelectItem>

                  <SelectItem value="horario">
                    Horário específico
                  </SelectItem>
                </SelectContent>
              </Select>
            </Field>

            {period === "horario" && (
              <Field
                label="Horário"
                required
                error={
                  errors.time?.message
                }
              >
                <Input
                  type="time"
                  {...register("time")}
                />
              </Field>
            )}

            <Field
              label="Nome da criança"
              error={
                errors.childName?.message
              }
            >
              <Input
                placeholder="Opcional"
                {...register("childName")}
              />
            </Field>

            <Field
              label="Faixa etária"
              error={
                errors.ageRange?.message
              }
            >
              <Input
                placeholder="Ex.: 6 a 8 anos"
                {...register("ageRange")}
              />
            </Field>

            <Field
              label="Restrições ou cuidados"
              error={
                errors.restrictions?.message
              }
              className="sm:col-span-2"
            >
              <Textarea
                rows={3}
                placeholder="Alergias, intolerâncias ou outras informações importantes"
                {...register("restrictions")}
              />
            </Field>

            <Field
              label="Observações"
              error={
                errors.notes?.message
              }
              className="sm:col-span-2"
            >
              <Textarea
                rows={3}
                {...register("notes")}
              />
            </Field>

            <Field
              label="Necessidade de embalagem específica"
              error={
                errors.packaging?.message
              }
              className="sm:col-span-2"
            >
              <Input
                {...register("packaging")}
              />
            </Field>
          </div>
        </section>

        <div className="rounded-2xl border border-border bg-muted/40 p-3 text-xs leading-relaxed text-muted-foreground">
          A data, o horário e a disponibilidade serão
          confirmados pela equipe pelo WhatsApp.
        </div>

        <label className="flex items-start gap-3 rounded-2xl border border-border bg-card p-3 text-sm">
          <Checkbox
            checked={
              reviewConfirmed === true
            }
            onCheckedChange={(value) =>
              setValue(
                "reviewConfirmed",
                value === true
                  ? true
                  : (false as unknown as true),
                {
                  shouldValidate: true,
                },
              )
            }
            aria-invalid={Boolean(
              errors.reviewConfirmed,
            )}
          />

          <span>
            Confirmo que revisei as informações do
            pedido.
          </span>
        </label>

        {errors.reviewConfirmed && (
          <p className="text-xs text-destructive">
            {
              errors.reviewConfirmed
                .message as string
            }
          </p>
        )}
      </div>

      <div className="border-t border-border bg-card p-5">
        <Button
          type="submit"
          size="lg"
          variant="whatsapp"
          className="w-full"
          disabled={
            isSubmitting ||
            items.length === 0 ||
            !waConfigured
          }
        >
          <MessageCircle className="h-4 w-4" />

          {waConfigured
            ? "Enviar pedido pelo WhatsApp"
            : "WhatsApp não configurado"}
        </Button>
      </div>
    </form>
  );
}

interface FieldProps {
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

function Field({
  label,
  error,
  required,
  className,
  children,
}: FieldProps) {
  return (
    <div className={className}>
      <Label className="mb-1 inline-flex items-center gap-1">
        {label}

        {required && (
          <span
            aria-hidden="true"
            className="text-destructive"
          >
            *
          </span>
        )}
      </Label>

      <div>{children}</div>

      {error && (
        <p className="mt-1 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
