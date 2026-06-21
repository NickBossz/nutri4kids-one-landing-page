import { useEffect, useState } from "react";

import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function CartButton() {
  const open = useCartStore((state) => state.open);
  const items = useCartStore((state) => state.items);

  const count = items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const [pulse, setPulse] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    setPulse(true);

    const timeout = window.setTimeout(() => {
      setPulse(false);
    }, 320);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [count, hydrated]);

  const handleOpenCart = () => {
    open();
    track("cart_opened");
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="relative"
      aria-label={`Abrir carrinho — ${count} item${
        count === 1 ? "" : "s"
      }`}
      onClick={handleOpenCart}
    >
      <ShoppingCart
        className="h-5 w-5"
        aria-hidden="true"
      />

      {hydrated && count > 0 && (
        <span
          aria-live="polite"
          className={cn(
            "absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground transition-transform",
            pulse && "scale-125",
          )}
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Button>
  );
}