import apiClient from '../api';
import { Cart, ItemType, TransactionType } from '@/types';

export interface AddToCartDto {
  itemType: ItemType;
  transactionType: TransactionType;
  itemId: string;
  quantity: number;
  rentalStartDate?: string;
  rentalEndDate?: string;
}

export const cartService = {
  async getCart(): Promise<Cart> {
    const { data } = await apiClient.get('/cart');
    return data;
  },

  async addItem(dto: AddToCartDto): Promise<Cart> {
    const { data } = await apiClient.post('/cart/items', dto);
    return data;
  },

  async removeItem(itemId: string): Promise<Cart> {
    const { data } = await apiClient.delete(`/cart/items/${itemId}`);
    return data;
  },

  async clearCart(): Promise<void> {
    await apiClient.delete('/cart');
  },
};