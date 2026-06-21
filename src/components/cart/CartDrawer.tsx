import { useState } from "react";
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";
import { formatBRL } from "@/lib/currency";
import { useIsMobile } from "@/hooks/use-mobile";

import { CheckoutForm } from "./CheckoutForm";

export function CartDrawer() {
  const isOpen = useCartStore((state) => state.isOpen);
  const close = useCartStore((state) => state.close);
  const items = useCartStore((state) => state.items);
  const increase = useCartStore((state) => state.increase);
  const decrease = useCartStore((state) => state.decrease);
  const removeItem = useCartStore(
    (state) => state.removeItem,
  );

  const subtotal = useCartStore(
    (state) => state.getSubtotal(),
  );

  const deliveryFee = useCartStore(
    (state) => state.deliveryFee,
  );

  const deliveryDistrict = useCartStore(
    (state) => state.deliveryDistrict,
  );

  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [step, setStep] = useState<
    "cart" | "checkout"
  >("cart");

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      close();

      window.setTimeout(() => {
        setStep("cart");
      }, 200);
    }
  };

  const side = isMobile ? "bottom" : "right";

  const itemCount = items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const total =
    subtotal + (deliveryFee ?? 0);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={handleOpenChange}
    >
      <SheetContent
        side={side}
        className={
          isMobile
            ? "flex max-h-[92dvh] flex-col rounded-t-3xl p-0"
            : "flex w-full flex-col p-0 sm:max-w-lg"
        }
      >
        <SheetHeader className="border-b border-border px-5 py-4 text-left">
          <SheetTitle>
            {step === "cart"
              ? "Seu pedido"
              : "Finalizar pedido"}
          </SheetTitle>

          <SheetDescription>
            {items.length === 0
              ? "Nenhum item adicionado ainda"
              : `${itemCount} item${
                  itemCount === 1 ? "" : "s"
                } no carrinho`}
          </SheetDescription>
        </SheetHeader>

        {step === "cart" ? (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex min-h-64 flex-col items-center justify-center text-center">
                  <div className="mb-4 rounded-full bg-muted p-4">
                    <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                  </div>

                  <h3 className="font-semibold">
                    Seu carrinho está vazio
                  </h3>

                  <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                    Explore os produtos e comece a montar o
                    próximo lanche.
                  </p>

                  <Button
                    type="button"
                    className="mt-5"
                    onClick={() => {
                      close();
                      navigate({ to: "/produtos" });
                    }}
                  >
                    Explorar produtos
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => {
                    const lineTotal =
                      item.unitPrice * item.quantity;

                    return (
                      <div
                        key={`${item.productId}-${
                          item.variationId ?? "default"
                        }`}
                        className="flex gap-3 rounded-2xl border border-border bg-card p-3"
                      >
                        {item.image && (
                          <img
                            src={item.image}
                            alt=""
                            className="h-20 w-20 rounded-xl object-cover"
                          />
                        )}

                        <div className="min-w-0 flex-1">
                          <div className="flex gap-2">
                            <div className="min-w-0 flex-1">
                              <p className="truncate font-medium">
                                {item.name}
                              </p>

                              {item.variationName && (
                                <p className="text-xs text-muted-foreground">
                                  {item.variationName}
                                </p>
                              )}

                              <p className="mt-1 text-xs text-muted-foreground">
                                {formatBRL(item.unitPrice)} cada
                              </p>
                            </div>

                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                removeItem(
                                  item.productId,
                                  item.variationId,
                                )
                              }
                              className="h-8 w-8 self-start text-muted-foreground hover:text-destructive"
                              aria-label={`Remover ${item.name}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center rounded-full border border-border">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() =>
                                  decrease(
                                    item.productId,
                                    item.variationId,
                                  )
                                }
                                aria-label="Diminuir quantidade"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </Button>

                              <span className="min-w-7 text-center text-sm font-medium">
                                {item.quantity}
                              </span>

                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() =>
                                  increase(
                                    item.productId,
                                    item.variationId,
                                  )
                                }
                                aria-label="Aumentar quantidade"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </Button>
                            </div>

                            <span className="font-semibold">
                              {formatBRL(lineTotal)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border bg-card p-5">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Subtotal
                    </span>

                    <span>{formatBRL(subtotal)}</span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-muted-foreground">
                        Frete
                      </p>

                      {deliveryDistrict && (
                        <p className="text-xs text-muted-foreground">
                          {deliveryDistrict}
                        </p>
                      )}
                    </div>

                    <span className="text-right">
                      {deliveryFee !== null
                        ? formatBRL(deliveryFee)
                        : "Calcule no checkout"}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between text-base font-bold">
                    <span>Total estimado</span>
                    <span>{formatBRL(total)}</span>
                  </div>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  O horário e a disponibilidade serão
                  confirmados pelo WhatsApp.
                </p>

                <div className="mt-4 grid gap-2">
                  <Button
                    type="button"
                    size="lg"
                    onClick={() => setStep("checkout")}
                  >
                    Preencher dados do pedido
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      close();
                      navigate({ to: "/produtos" });
                    }}
                  >
                    Continuar comprando
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <CheckoutForm onBack={() => setStep("cart")} />
        )}
      </SheetContent>
    </Sheet>
  );
}
