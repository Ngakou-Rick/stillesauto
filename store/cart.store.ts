import { create } from 'zustand';
import { Cart } from '@/types';
import { cartService, AddToCartDto } from '@/lib/services/cart.service';

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addItem: (dto: AddToCartDto) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  itemCount: () => number;
  totalAmount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  isLoading: false,
  error: null,

  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const cart = await cartService.getCart();
      set({ cart, isLoading: false });
    } catch (err: any) {
      set({ error: 'Impossible de charger le panier', isLoading: false });
    }
  },

  addItem: async (dto) => {
    set({ isLoading: true, error: null });
    try {
      const cart = await cartService.addItem(dto);
      set({ cart, isLoading: false });
    } catch (err: any) {
      const message = err.response?.data?.message || 'Erreur lors de l\'ajout au panier';
      set({ error: message, isLoading: false });
      throw err;
    }
  },

  removeItem: async (itemId) => {
    set({ isLoading: true });
    try {
      const cart = await cartService.removeItem(itemId);
      set({ cart, isLoading: false });
    } catch {
      set({ error: 'Erreur lors de la suppression', isLoading: false });
    }
  },

  clearCart: async () => {
    try {
      await cartService.clearCart();
      set({ cart: null });
    } catch {
      set({ error: 'Erreur lors de la suppression du panier' });
    }
  },

  itemCount: () => get().cart?.items.length ?? 0,
  totalAmount: () => get().cart?.totalAmount ?? 0,
}));