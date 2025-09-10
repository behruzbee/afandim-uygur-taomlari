import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  tableId: string;
};

type CartStore = {
  items: CartItem[];
  selectedTableId: string | null;
  setTableId: (id: string) => void;
  addItem: (item: Omit<CartItem, "quantity" | "tableId">) => void;
  removeItem: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  total: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      selectedTableId: null,

      setTableId: (id) => set({ selectedTableId: id }),

      addItem: (item) => {
        const tableId = get().selectedTableId;
        if (!tableId) return;

        set((state) => {
          const existing = state.items.find(
            (i) => i.id === item.id && i.tableId === tableId
          );

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id && i.tableId === tableId
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }

          return {
            items: [...state.items, { ...item, quantity: 1, tableId }],
          };
        });
      },

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.id === id && i.tableId === state.selectedTableId)
          ),
        })),

      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id && i.tableId === state.selectedTableId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.id === id && i.tableId === state.selectedTableId
                ? { ...i, quantity: i.quantity - 1 }
                : i
            )
            .filter((i) => i.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),

      total: () =>
        get().items.reduce(
          (sum, i) =>
            i.tableId === get().selectedTableId
              ? sum + i.price * i.quantity
              : sum,
          0
        ),
    }),
    {
      name: "cart-storage",
    }
  )
);
