export function formatBRL(value: number | null | undefined): string {
  if (value === null || value === undefined) return "Sob consulta";
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
