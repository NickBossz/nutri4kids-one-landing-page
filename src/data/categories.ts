export interface Category {
  slug: string;
  name: string;
  description: string;
}

export const categories: Category[] = [
  { slug: "todos", name: "Todos", description: "Toda a nossa seleção." },
  { slug: "lanches", name: "Lanches", description: "Opções individuais para cada momento." },
  { slug: "lancheiras", name: "Lancheiras", description: "Combinações prontas para escola e passeios." },
  { slug: "kits", name: "Kits", description: "Combos para festas, encontros e celebrações." },
  { slug: "bebidas", name: "Bebidas", description: "Sucos naturais e bebidas leves." },
  { slug: "doces", name: "Doces", description: "Sobremesas cuidadas e equilibradas." },
  { slug: "salgados", name: "Salgados", description: "Mini salgados feitos com carinho." },
  { slug: "festas", name: "Festas", description: "Soluções para aniversários e encontros." },
  { slug: "escolas", name: "Escolas", description: "Opções para fornecimento escolar." },
];
