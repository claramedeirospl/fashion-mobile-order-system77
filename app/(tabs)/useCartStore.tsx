import { create } from 'zustand';

// Define o que é um produto
interface Product {
  id: string;
  name: string;
  price: number;
  image: any;
  size?: string;
}

interface CartState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (product) => set((state) => ({ items: [...state.items, product] })),
  removeItem: (id) => set((state) => ({ 
    items: state.items.filter((item) => item.id !== id) 
  })),
  clearCart: () => set({ items: [] }),
}));