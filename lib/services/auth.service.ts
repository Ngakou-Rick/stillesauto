import apiClient from '../api';
import { User } from '@/types';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const authService = {
  async login(dto: LoginDto): Promise<AuthResponse> {
    const { data } = await apiClient.post('/auth/login', dto);
    return data;
  },

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const { data } = await apiClient.post('/auth/register', dto);
    return data;
  },

  async getMe(): Promise<User> {
    const { data } = await apiClient.get('/users/me');
    return data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },
};