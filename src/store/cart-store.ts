import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  audience: "family" | "school";
  lastOrderCode: string | null;

  deliveryFee: number | null;
  deliveryDistrict: string | null;

  open: () => void;
  close: () => void;
  setAudience: (audience: "family" | "school") => void;

  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variationId?: string) => void;
  increase: (productId: string, variationId?: string) => void;
  decrease: (productId: string, variationId?: string) => void;
  updateQuantity: (
    productId: string,
    variationId: string | undefined,
    quantity: number,
  ) => void;

  setDelivery: (district: string, fee: number) => void;
  clearDelivery: () => void;

  clearCart: () => void;
  setLastOrderCode: (code: string | null) => void;

  getItemCount: () => number;
  getSubtotal: () => number;
  getTotal: () => number;
}

const sameLine = (
  item: CartItem,
  productId: string,
  variationId?: string,
) =>
  item.productId === productId &&
  (item.variationId ?? null) === (variationId ?? null);

const MAX_QTY = 99;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      audience: "family",
      lastOrderCode: null,
      deliveryFee: null,
      deliveryDistrict: null,

      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),

      setAudience: (audience) => set({ audience }),

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((currentItem) =>
            sameLine(
              currentItem,
              item.productId,
              item.variationId,
            ),
          );

          if (existing) {
            return {
              items: state.items.map((currentItem) =>
                sameLine(
                  currentItem,
                  item.productId,
                  item.variationId,
                )
                  ? {
                      ...currentItem,
                      quantity: Math.min(
                        MAX_QTY,
                        currentItem.quantity + item.quantity,
                      ),
                    }
                  : currentItem,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                ...item,
                quantity: Math.min(
                  MAX_QTY,
                  Math.max(1, item.quantity),
                ),
              },
            ],
          };
        }),

      removeItem: (productId, variationId) =>
        set((state) => ({
          items: state.items.filter(
            (item) => !sameLine(item, productId, variationId),
          ),
        })),

      increase: (productId, variationId) =>
        set((state) => ({
          items: state.items.map((item) =>
            sameLine(item, productId, variationId)
              ? {
                  ...item,
                  quantity: Math.min(
                    MAX_QTY,
                    item.quantity + 1,
                  ),
                }
              : item,
          ),
        })),

      decrease: (productId, variationId) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              sameLine(item, productId, variationId)
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item,
            )
            .filter((item) => item.quantity > 0),
        })),

      updateQuantity: (
        productId,
        variationId,
        quantity,
      ) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              sameLine(item, productId, variationId)
                ? {
                    ...item,
                    quantity: Math.max(
                      0,
                      Math.min(MAX_QTY, quantity),
                    ),
                  }
                : item,
            )
            .filter((item) => item.quantity > 0),
        })),

      setDelivery: (district, fee) =>
        set({
          deliveryDistrict: district,
          deliveryFee: fee,
        }),

      clearDelivery: () =>
        set({
          deliveryDistrict: null,
          deliveryFee: null,
        }),

      clearCart: () =>
        set({
          items: [],
          lastOrderCode: null,
          deliveryDistrict: null,
          deliveryFee: null,
        }),

      setLastOrderCode: (code) =>
        set({ lastOrderCode: code }),

      getItemCount: () =>
        get().items.reduce(
          (total, item) => total + item.quantity,
          0,
        ),

      getSubtotal: () =>
        get().items.reduce(
          (total, item) =>
            total + item.unitPrice * item.quantity,
          0,
        ),

      getTotal: () =>
        get().items.reduce(
          (total, item) =>
            total + item.unitPrice * item.quantity,
          0,
        ) + (get().deliveryFee ?? 0),
    }),
    {
      name: "lf:cart",
      partialize: (state) => ({
        items: state.items,
        audience: state.audience,
        lastOrderCode: state.lastOrderCode,
        deliveryFee: state.deliveryFee,
        deliveryDistrict: state.deliveryDistrict,
      }),
    },
  ),
);
