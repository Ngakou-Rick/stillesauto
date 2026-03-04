import apiClient from '../api';
import { Vehicle, VehicleFilters, PaginatedResponse } from '@/types';

export const vehicleService = {
  async getVehicles(filters: VehicleFilters = {}): Promise<PaginatedResponse<Vehicle>> {
    const { data } = await apiClient.get('/vehicles', { params: filters });
    return data;
  },

  async getVehicleById(id: string): Promise<Vehicle> {
    const { data } = await apiClient.get(`/vehicles/${id}`);
    return data;
  },

  async checkAvailability(id: string, from: string, to: string) {
    const { data } = await apiClient.get(`/vehicles/${id}/availability`, {
      params: { from, to },
    });
    return data;
  },
};