import apiClient from '../api';
import { Accessory, AccessoryFilters, PaginatedResponse } from '@/types';

export const accessoryService = {
  async getAccessories(filters: AccessoryFilters = {}): Promise<PaginatedResponse<Accessory>> {
    const { data } = await apiClient.get('/accessories', { params: filters });
    return data;
  },

  async getAccessoryById(id: string): Promise<Accessory> {
    const { data } = await apiClient.get(`/accessories/${id}`);
    return data;
  },
};