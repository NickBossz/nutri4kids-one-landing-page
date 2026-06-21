import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/products/ProductCard";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { PRODUCT_TAG_LABELS, type ProductTag } from "@/types";
import { track } from "@/lib/analytics";

export const Route = createFileRoute("/produtos/")({
  head: () => ({
    meta: [
      { title: "Produtos — Lanchinho Feliz" },
      {
        name: "description",
        content:
          "Catálogo completo de lanches, lancheiras, kits e bebidas para crianças. Filtre por categoria e restrição alimentar.",
      },
      { property: "og:title", content: "Produtos — Lanchinho Feliz" },
      {
        property: "og:description",
        content: "Escolha o que combina com o seu momento.",
      },
    ],
  }),
  component: ProdutosPage,
});

type SortKey = "rec" | "asc" | "desc" | "popular" | "abc";

const TAG_OPTIONS: ProductTag[] = [
  "sem-acucar-adicionado",
  "sem-lactose",
  "sem-gluten",
  "vegetariano",
  "mais-pedidos",
  "entrega-rapida",
];

function ProdutosPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("todos");
  const [tags, setTags] = useState<ProductTag[]>([]);
  const [sort, setSort] = useState<SortKey>("rec");

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "todos") list = list.filter((p) => p.category === category);
    if (tags.length > 0) list = list.filter((p) => tags.every((t) => p.tags.includes(t)));
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.ingredients?.some((i) => i.toLowerCase().includes(q)) ||
          p.tags.some((t) => PRODUCT_TAG_LABELS[t].toLowerCase().includes(q)),
      );
    }
    switch (sort) {
      case "asc":
        list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
        break;
      case "desc":
        list.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
        break;
      case "popular":
        list.sort((a, b) => Number(b.popular) - Number(a.popular));
        break;
      case "abc":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return list;
  }, [query, category, tags, sort]);

  const clearAll = () => {
    setCategory("todos");
    setTags([]);
    setQuery("");
    setSort("rec");
  };

  return (
    <div className="container-page py-10 md:py-14">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
          Escolha o que combina com o seu momento.
        </h1>
        <p className="mt-3 text-muted-foreground">
          Encontre produtos individuais, kits, lancheiras e soluções para diferentes ocasiões.
        </p>
      </header>

      <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto_auto] md:items-center">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              track("search_performed", { q: e.target.value });
            }}
            placeholder="Buscar por nome, categoria ou ingrediente..."
            className="pl-9"
            aria-label="Buscar produtos"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="min-w-[160px]" aria-label="Categoria">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c.slug} value={c.slug}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
          <SelectTrigger className="min-w-[160px]" aria-label="Ordenar">
            <SelectValue placeholder="Ordenar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rec">Recomendados</SelectItem>
            <SelectItem value="asc">Menor preço</SelectItem>
            <SelectItem value="desc">Maior preço</SelectItem>
            <SelectItem value="popular">Mais pedidos</SelectItem>
            <SelectItem value="abc">Ordem alfabética</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Filtros rápidos
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <ToggleGroup
            type="multiple"
            value={tags}
            onValueChange={(v) => {
              setTags(v as ProductTag[]);
              track("filter_applied", { tags: v });
            }}
            className="flex-wrap justify-start gap-2"
          >
            {TAG_OPTIONS.map((t) => (
              <ToggleGroupItem
                key={t}
                value={t}
                aria-label={PRODUCT_TAG_LABELS[t]}
                className="rounded-full border border-border bg-card px-3 text-xs data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                {PRODUCT_TAG_LABELS[t]}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          {(tags.length > 0 || category !== "todos" || query) && (
            <Button variant="ghost" size="sm" onClick={clearAll} className="text-muted-foreground">
              <X className="h-3.5 w-3.5" /> Limpar filtros
            </Button>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "resultado" : "resultados"}
        </p>
        {category !== "todos" && (
          <Badge variant="outline" className="border-primary text-primary">
            {categories.find((c) => c.slug === category)?.name}
          </Badge>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-border bg-card p-10 text-center">
          <p className="font-semibold">Nenhum produto encontrado</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Ajuste os filtros ou tente outro termo de busca.
          </p>
          <Button variant="outline" className="mt-4" onClick={clearAll}>
            Limpar filtros
          </Button>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
