import { useEffect, useMemo, useState } from "react";
import {
  Check,
  Search,
  ShoppingBasket,
  ShoppingCart,
  SlidersHorizontal,
} from "lucide-react";

import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import type { ProductTag } from "@/types";

export const OPEN_MENU_DRAWER_EVENT = "nutri4kids:open-menu-drawer";

const CATEGORIES = [
  {
    value: "todos",
    label: "Todos",
  },
  {
    value: "salgados",
    label: "Salgados",
  },
  {
    value: "doces",
    label: "Doces",
  },
  {
    value: "lanches",
    label: "Lanches",
  },
  {
    value: "bebidas",
    label: "Bebidas",
  },
] as const;

const DIETARY_FILTERS: {
  value: ProductTag;
  label: string;
}[] = [
  {
    value: "sem-gluten",
    label: "Sem glúten",
  },
  {
    value: "sem-lactose",
    label: "Sem lactose",
  },
  {
    value: "vegetariano",
    label: "Vegetariano",
  },
  {
    value: "sem-acucar-adicionado",
    label: "Sem açúcar adicionado",
  },
];

type CategoryValue = (typeof CATEGORIES)[number]["value"];

export function openMenuDrawer() {
  window.dispatchEvent(new CustomEvent(OPEN_MENU_DRAWER_EVENT));
}

export function MenuDrawer() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryValue>("todos");
  const [selectedDietaryFilters, setSelectedDietaryFilters] = useState<
    ProductTag[]
  >([]);

  const cartItems = useCartStore((state) => state.items);
  const openCart = useCartStore((state) => state.open);

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  useEffect(() => {
    const handleOpenDrawer = () => {
      setOpen(true);
    };

    window.addEventListener(
      OPEN_MENU_DRAWER_EVENT,
      handleOpenDrawer,
    );

    return () => {
      window.removeEventListener(
        OPEN_MENU_DRAWER_EVENT,
        handleOpenDrawer,
      );
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLocaleLowerCase("pt-BR");

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "todos" ||
        product.category === selectedCategory;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name
          .toLocaleLowerCase("pt-BR")
          .includes(normalizedSearch) ||
        product.shortDescription
          .toLocaleLowerCase("pt-BR")
          .includes(normalizedSearch) ||
        product.description
          .toLocaleLowerCase("pt-BR")
          .includes(normalizedSearch);

      /*
       * Quando mais de um filtro alimentar estiver selecionado,
       * o produto precisa possuir todos eles.
       *
       * Exemplo:
       * "Sem glúten" + "Sem lactose"
       * mostra apenas produtos que possuem as duas características.
       */
      const matchesDietaryFilters =
        selectedDietaryFilters.length === 0 ||
        selectedDietaryFilters.every((filter) =>
          product.tags.includes(filter),
        );

      return (
        product.available &&
        matchesCategory &&
        matchesSearch &&
        matchesDietaryFilters
      );
    });
  }, [
    search,
    selectedCategory,
    selectedDietaryFilters,
  ]);

  const hasActiveFilters =
    search.trim().length > 0 ||
    selectedCategory !== "todos" ||
    selectedDietaryFilters.length > 0;

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("todos");
    setSelectedDietaryFilters([]);
  };

  const toggleDietaryFilter = (filter: ProductTag) => {
    setSelectedDietaryFilters((currentFilters) => {
      const isSelected = currentFilters.includes(filter);

      if (isSelected) {
        return currentFilters.filter(
          (currentFilter) => currentFilter !== filter,
        );
      }

      return [...currentFilters, filter];
    });
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
  };

  const handleOpenCart = () => {
    /*
     * Primeiro fecha o Drawer do cardápio e depois abre
     * o Drawer do carrinho, evitando sobreposição.
     */
    setOpen(false);

    window.setTimeout(() => {
      openCart();
    }, 250);
  };

  return (
    <Drawer
      open={open}
      onOpenChange={handleOpenChange}
      shouldScaleBackground={false}
    >
      <DrawerContent className="h-[94dvh] max-h-[94dvh]">
        <div className="mx-auto flex h-full w-full max-w-7xl flex-col overflow-hidden">
          <DrawerHeader className="border-b border-border px-4 pb-5 pt-2 text-left sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <ShoppingBasket
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <DrawerTitle className="font-display text-2xl font-bold sm:text-3xl">
                    Cardápio completo
                  </DrawerTitle>

                  <DrawerDescription className="mt-1">
                    Escolha seus produtos e adicione tudo ao
                    carrinho.
                  </DrawerDescription>
                </div>
              </div>

              <Button
                type="button"
                onClick={handleOpenCart}
                className="relative w-full shrink-0 rounded-full sm:w-auto"
              >
                <ShoppingCart
                  className="mr-2 h-4 w-4"
                  aria-hidden="true"
                />

                Acessar carrinho

                {cartItemCount > 0 && (
                  <span className="ml-2 flex min-w-6 items-center justify-center rounded-full bg-primary-foreground px-1.5 py-0.5 text-xs font-bold text-primary">
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </span>
                )}
              </Button>
            </div>
          </DrawerHeader>

          <div className="border-b border-border bg-background px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-5">
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />

                <Input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Buscar um produto..."
                  className="h-11 pl-10"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <SlidersHorizontal
                    className="h-4 w-4 text-primary"
                    aria-hidden="true"
                  />

                  Categorias
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {CATEGORIES.map((category) => {
                    const active =
                      selectedCategory === category.value;

                    return (
                      <Button
                        key={category.value}
                        type="button"
                        size="sm"
                        variant={
                          active ? "default" : "outline"
                        }
                        onClick={() =>
                          setSelectedCategory(category.value)
                        }
                        className="shrink-0 rounded-full"
                      >
                        {category.label}
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold">
                    Preferências alimentares
                  </p>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Você pode selecionar mais de uma opção.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {DIETARY_FILTERS.map((filter) => {
                    const active =
                      selectedDietaryFilters.includes(
                        filter.value,
                      );

                    return (
                      <button
                        key={filter.value}
                        type="button"
                        aria-pressed={active}
                        onClick={() =>
                          toggleDietaryFilter(filter.value)
                        }
                        className={cn(
                          "inline-flex min-h-10 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                          active
                            ? "border-primary bg-primary text-primary-foreground shadow-sm"
                            : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-accent",
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-4 w-4 items-center justify-center rounded-full border",
                            active
                              ? "border-primary-foreground bg-primary-foreground text-primary"
                              : "border-muted-foreground/50",
                          )}
                        >
                          {active && (
                            <Check
                              className="h-3 w-3"
                              aria-hidden="true"
                            />
                          )}
                        </span>

                        {filter.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p
                className="text-sm text-muted-foreground"
                aria-live="polite"
              >
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1
                  ? "produto encontrado"
                  : "produtos encontrados"}
              </p>

              {hasActiveFilters && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                >
                  Limpar filtros
                </Button>
              )}
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-muted/30 px-6 text-center">
                <Search
                  className="h-10 w-10 text-muted-foreground"
                  aria-hidden="true"
                />

                <h3 className="mt-4 font-display text-lg font-bold">
                  Nenhum produto encontrado
                </h3>

                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Nenhum produto possui todas as características
                  selecionadas. Remova algum filtro ou escolha
                  outra categoria.
                </p>

                <Button
                  type="button"
                  variant="outline"
                  className="mt-5 rounded-full"
                  onClick={clearFilters}
                >
                  Limpar filtros
                </Button>
              </div>
            )}
          </div>

          <div className="border-t border-border bg-background px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
              <p className="text-center text-xs text-muted-foreground sm:text-left">
                Adicione os produtos e finalize seu pedido pelo
                carrinho.
              </p>

              <Button
                type="button"
                onClick={handleOpenCart}
                className="w-full rounded-full sm:w-auto"
              >
                <ShoppingCart
                  className="mr-2 h-4 w-4"
                  aria-hidden="true"
                />

                Ver carrinho

                {cartItemCount > 0 && (
                  <span className="ml-2">
                    ({cartItemCount})
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}