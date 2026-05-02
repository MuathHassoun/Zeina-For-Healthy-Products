import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalAmount: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((product) => product.id === item.id);
      if (existing) {
        return {
          items: state.items.map((product) =>
            product.id === item.id
              ? { ...product, quantity: product.quantity + item.quantity }
              : product,
          ),
        };
      }
      return { items: [...state.items, item] };
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((product) => product.id !== id),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((product) =>
        product.id === id ? { ...product, quantity } : product,
      ),
    })),
  clearCart: () => set({ items: [] }),
  totalAmount: () => get().items.reduce((total, product) => total + product.price * product.quantity, 0),
  itemCount: () => get().items.reduce((count, product) => count + product.quantity, 0),
}));
