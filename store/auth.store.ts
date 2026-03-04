import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';
import { authService, LoginDto, RegisterDto } from '@/lib/services/auth.service';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (dto: LoginDto) => Promise<void>;
  register: (dto: RegisterDto) => Promise<void>;
  logout: () => Promise<void>;
  fetchMe: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (dto) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(dto);
          localStorage.setItem('access_token', response.accessToken);
          localStorage.setItem('refresh_token', response.refreshToken);
          set({ user: response.user, isAuthenticated: true, isLoading: false });
        } catch (err: any) {
          const message = err.response?.data?.message || 'Identifiants incorrects';
          set({ error: message, isLoading: false });
          throw err;
        }
      },

      register: async (dto) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.register(dto);
          localStorage.setItem('access_token', response.accessToken);
          localStorage.setItem('refresh_token', response.refreshToken);
          set({ user: response.user, isAuthenticated: true, isLoading: false });
        } catch (err: any) {
          const message = err.response?.data?.message || 'Erreur lors de l\'inscription';
          set({ error: message, isLoading: false });
          throw err;
        }
      },

      logout: async () => {
        try {
          await authService.logout();
        } finally {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          set({ user: null, isAuthenticated: false });
        }
      },

      fetchMe: async () => {
        try {
          const user = await authService.getMe();
          set({ user, isAuthenticated: true });
        } catch {
          set({ user: null, isAuthenticated: false });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-store',
      // On ne persiste que l'essentiel, pas les fonctions
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);