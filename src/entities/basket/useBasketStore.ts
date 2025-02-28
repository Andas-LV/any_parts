import { create } from "zustand";
import { ItemCard } from "@/types/Item";
import { items } from "@/exampleData/exampleItems";

export type CartItem = ItemCard & {
  quantity: number;
  selected: boolean;
};

export interface BasketStore {
  cartItems: CartItem[];

  addItem: (item: ItemCard, quantity?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  toggleSelect: (id: number) => void;
  selectAll: () => void;
  unselectAll: () => void;
  toggleSelectAll: () => void;
  removeSelected: () => void;

  selectedItems: () => CartItem[];
  totalPrice: () => number;
  totalDiscount: () => number;
  finalPrice: () => number;
  totalSelectedQuantity: () => number;
}

export const useBasketStore = create<BasketStore>((set, get) => ({
  cartItems: items.map((item) => ({
    ...item,
    quantity: 1,
    selected: false,
  })),

  addItem: (item, quantity = 1) =>
    set((state) => {
      const existingItem = state.cartItems.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          cartItems: state.cartItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i,
          ),
        };
      } else {
        const newCartItem: CartItem = {
          ...item,
          quantity,
          selected: false,
        };
        return { cartItems: [...state.cartItems, newCartItem] };
      }
    }),

  removeItem: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    })),

  toggleSelect: (id) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item,
      ),
    })),

  selectAll: () =>
    set((state) => ({
      cartItems: state.cartItems.map((item) => ({
        ...item,
        selected: true,
      })),
    })),

  unselectAll: () =>
    set((state) => ({
      cartItems: state.cartItems.map((item) => ({
        ...item,
        selected: false,
      })),
    })),

  // Новый экшн: если все выбраны – снимаем выделение, иначе выделяем все
  toggleSelectAll: () => {
    const { cartItems, selectAll, unselectAll } = get();
    const allSelected = cartItems.every((item) => item.selected);
    if (allSelected) {
      unselectAll();
    } else {
      selectAll();
    }
  },

  removeSelected: () =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => !item.selected),
    })),

  selectedItems: () => get().cartItems.filter((item) => item.selected),

  // PRICES
  totalPrice: () =>
    get()
      .selectedItems()
      .reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0),

  finalPrice: () =>
    get()
      .selectedItems()
      .reduce((acc, item) => {
        const finalPrice = item.currentPrice ?? item.price;
        return acc + finalPrice * item.quantity;
      }, 0),

  totalDiscount: () =>
    get()
      .selectedItems()
      .reduce((acc, item) => {
        if (item.currentPrice !== null) {
          return acc + (item.price - item.currentPrice) * item.quantity;
        }
        return acc;
      }, 0),

  totalSelectedQuantity: () =>
    get()
      .cartItems.filter((item) => item.selected)
      .reduce((acc, item) => acc + item.quantity, 0),
}));
