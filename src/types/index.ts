export type ProductTag =
  | "sem-acucar-adicionado"
  | "sem-lactose"
  | "sem-gluten"
  | "vegetariano"
  | "entrega-rapida"
  | "mais-pedidos";

export const PRODUCT_TAG_LABELS: Record<ProductTag, string> = {
  "sem-acucar-adicionado": "Sem açúcar adicionado",
  "sem-lactose": "Sem lactose",
  "sem-gluten": "Sem glúten",
  vegetariano: "Vegetariano",
  "entrega-rapida": "Entrega rápida",
  "mais-pedidos": "Mais pedidos",
};

export interface ProductVariation {
  id: string;
  name: string;
  priceAdjustment: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  price: number | null;
  priceLabel?: string;
  unit: string;
  images: string[];
  featured: boolean;
  popular: boolean;
  available: boolean;
  leadTimeHours?: number;
  tags: ProductTag[];
  ingredients?: string[];
  allergens?: string[];
  conservation?: string;
  validity?: string;
  variations?: ProductVariation[];
  servingTip?: string;
  placeholder?: boolean;
}

export interface CartItem {
  productId: string;
  variationId?: string;
  quantity: number;
  unitPrice: number;
  name: string;
  variationName?: string;
  image?: string;
  slug: string;
}

export interface OrderOrigin {
  entryPath: string;
  entryProduct?: string;
  utm?: Record<string, string>;
  audience: "family" | "school";
  campaign?: string;
}

export interface CheckoutData {
  fulfillment:
    | "entrega"
    | "retirada"
    | "escola"
    | "recorrente";

  name: string;
  phone: string;
  email?: string;

  cep?: string;
  street?: string;
  number?: string;
  complement?: string;
  district?: string;
  city?: string;
  reference?: string;
  deliveryFee?: number;

  date: string;
  period: "manha" | "tarde" | "horario";
  time?: string;

  childName?: string;
  ageRange?: string;
  restrictions?: string;
  notes?: string;
  packaging?: string;
  schoolName?: string;

  reviewConfirmed: boolean;
}
