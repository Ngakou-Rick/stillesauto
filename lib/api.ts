import axios from 'axios';
import { LoginRequest, LoginResponse, RegisterRequest, Vehicle, Accessory } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
});

// Auth
export const login = (data: LoginRequest) => api.post<LoginResponse>('/auth/login', data);
export const register = (data: RegisterRequest) => api.post('/auth/register', data);

// Vehicles
export const getVehicles = async (): Promise<Vehicle[]> => {
    const response = await api.get('/vehicles');
    return response.data;
};
export const getVehicleById = (id: number) => api.get<Vehicle>(`/vehicles/${id}`);

// Accessories
export const getAccessories = async (): Promise<Accessory[]> => {
    const response = await api.get('/accessories');
    return response.data;
};
export const getAccessoryById = (id: number) => api.get(`/accessories/${id}`);
