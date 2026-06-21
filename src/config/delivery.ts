export type DeliveryNeighborhood = {
  name: string;
  fee: number;
  aliases?: string[];
};

export const DELIVERY_CITY = "Uberlândia";
export const DELIVERY_STATE = "MG";

/*
 * IMPORTANTE:
 * Os valores abaixo são exemplos.
 * Confirme os preços reais com a empresa antes de publicar.
 */
export const deliveryNeighborhoods: DeliveryNeighborhood[] = [
  { name: "Centro", fee: 7 },
  { name: "Fundinho", fee: 7 },
  { name: "Nossa Senhora Aparecida", fee: 7 },
  { name: "Martins", fee: 7 },
  { name: "Osvaldo Rezende", fee: 7 },
  { name: "Bom Jesus", fee: 7 },
  { name: "Brasil", fee: 8 },
  { name: "Cazeca", fee: 8 },
  { name: "Lídice", fee: 8 },
  { name: "Daniel Fonseca", fee: 8 },
  { name: "Tabajaras", fee: 8 },

  { name: "Santa Mônica", fee: 9 },
  { name: "Tibery", fee: 9 },
  { name: "Segismundo Pereira", fee: 10 },
  { name: "Umuarama", fee: 10 },
  { name: "Alto Umuarama", fee: 11 },
  { name: "Custódio Pereira", fee: 10 },
  { name: "Aclimação", fee: 12 },
  { name: "Mansões Aeroporto", fee: 13 },
  { name: "Alvorada", fee: 12 },
  { name: "Novo Mundo", fee: 13 },
  { name: "Morumbi", fee: 14 },
  { name: "Residencial Integração", fee: 14 },
  { name: "Morada dos Pássaros", fee: 14 },
  { name: "Jardim Ipanema", fee: 13 },
  { name: "Portal do Vale", fee: 14 },
  { name: "Granja Marileusa", fee: 12 },
  { name: "Grand Ville", fee: 14 },

  { name: "Jaraguá", fee: 9 },
  { name: "Planalto", fee: 10 },
  { name: "Chácaras Tubalina", fee: 10 },
  { name: "Chácaras Panorama", fee: 12 },
  { name: "Luizote de Freitas", fee: 11 },
  { name: "Jardim das Palmeiras", fee: 10 },
  { name: "Jardim Patrícia", fee: 10 },
  { name: "Jardim Holanda", fee: 12 },
  { name: "Jardim Europa", fee: 13 },
  { name: "Jardim Canaã", fee: 12 },
  { name: "Mansour", fee: 11 },
  { name: "Dona Zulmira", fee: 10 },
  { name: "Taiaman", fee: 11 },
  { name: "Guarani", fee: 12 },
  { name: "Tocantins", fee: 13 },
  { name: "Monte Hebron", fee: 14 },
  { name: "Residencial Pequis", fee: 15 },

  { name: "Tubalina", fee: 9 },
  { name: "Cidade Jardim", fee: 10 },
  { name: "Nova Uberlândia", fee: 12 },
  { name: "Patrimônio", fee: 8 },
  { name: "Morada da Colina", fee: 10 },
  { name: "Vigilato Pereira", fee: 9 },
  { name: "Saraiva", fee: 8 },
  { name: "Lagoinha", fee: 9 },
  { name: "Carajás", fee: 10 },
  { name: "Pampulha", fee: 10 },
  { name: "Jardim Karaíba", fee: 11 },
  { name: "Jardim Inconfidência", fee: 11 },
  { name: "Santa Luzia", fee: 11 },
  { name: "Granada", fee: 12 },
  { name: "São Jorge", fee: 13 },
  { name: "Laranjeiras", fee: 13 },
  { name: "Shopping Park", fee: 15 },
  { name: "Jardim Sul", fee: 13 },
  { name: "Gávea", fee: 14 },

  { name: "Presidente Roosevelt", fee: 10 },
  { name: "Jardim Brasília", fee: 11 },
  { name: "São José", fee: 11 },
  { name: "Marta Helena", fee: 11 },
  { name: "Pacaembu", fee: 11 },
  { name: "Santa Rosa", fee: 12 },
  { name: "Residencial Gramado", fee: 13 },
  { name: "Nossa Senhora das Graças", fee: 11 },
  { name: "Minas Gerais", fee: 12 },
  { name: "Distrito Industrial", fee: 15 },
  { name: "Maravilha", fee: 13 },
].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

export function normalizeLocation(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

export function findDeliveryNeighborhood(
  neighborhoodName: string,
): DeliveryNeighborhood | undefined {
  const normalizedName = normalizeLocation(neighborhoodName);

  return deliveryNeighborhoods.find((neighborhood) => {
    if (normalizeLocation(neighborhood.name) === normalizedName) {
      return true;
    }

    return neighborhood.aliases?.some(
      (alias) => normalizeLocation(alias) === normalizedName,
    );
  });
}

export function getDeliveryFee(
  neighborhoodName?: string,
): number | null {
  if (!neighborhoodName) return null;
  return findDeliveryNeighborhood(neighborhoodName)?.fee ?? null;
}
