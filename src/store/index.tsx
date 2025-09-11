import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LocalizedText = {
  ru: string;
  uz: string;
  en: string;
  zh: string;
};

export type CartItem = {
  id: number;
  title: LocalizedText;
  price: number;
  image: string;
  quantity: number;
  tableId: string;
};

export type Order = {
  items: CartItem[];
  timestamp: number;
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
  history: Order[];
  addToHistory: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      selectedTableId: null,
      history: [],

      setTableId: (id) => set({ selectedTableId: id }),

      addItem: (item) => {
        const tableId = get().selectedTableId;
        if (!tableId) return;

        set((state) => {
          const existing = state.items.find(
            (i) => i.id === item.id
          );

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
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
            (i) => !(i.id === id)
          ),
        })),

      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.id === id
                ? { ...i, quantity: i.quantity - 1 }
                : i
            )
            .filter((i) => i.quantity > 0),
        })),

      clearCart: () => {
        get().addToHistory();
        set({ items: [] });
      },

      total: () =>
        get().items.reduce(
          (sum, i) =>
            i.tableId === get().selectedTableId
              ? sum + i.price * i.quantity
              : sum,
          0
        ),

      addToHistory: () =>
        set((state) => ({
          history: [
            ...state.history,
            {
              items: state.items.filter(
                (i) => i.tableId === state.selectedTableId
              ),
              timestamp: Date.now(),
            },
          ],
        })),
    }),
    {
      name: "cart-storage",
    }
  )
);
