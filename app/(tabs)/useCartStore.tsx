// useCartStore.ts
import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: any;
  size?: string;
}

interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface CartState {
  items: CartItem[];
  paymentMethod: string;
  shippingAddress: ShippingAddress;

  addItem: (product: CartItem) => void;
  removeItem: (id: string) => void;
  setPaymentMethod: (method: string) => void;
  updateShippingAddress: (
    address: Partial<ShippingAddress>
  ) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],

  paymentMethod: 'Not Selected',

  shippingAddress: {
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  },

  addItem: (product) =>
    set((state) => ({
      items: [...(state.items || []), product],
    })),

  removeItem: (id) =>
    set((state) => ({
      items: (state.items || []).filter(
        (item) => item.id !== id
      ),
    })),

  setPaymentMethod: (method) =>
    set({
      paymentMethod: method,
    }),
  updateShippingAddress: (newFields) =>
    set((state) => ({
      shippingAddress: {
        ...state.shippingAddress,
        ...newFields,
      },
    })),
    clearCart: () =>
  set({
    items: [],
    paymentMethod: 'Not Selected',

    shippingAddress: {
      fullName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
    },
  }),
}));