'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useCartStore } from '@/store/cart.store';

export default function AppInitializer() {
  const fetchMe = useAuthStore((state) => state.fetchMe);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    // Si un token existe, on recharge l'utilisateur
    const token = localStorage.getItem('access_token');
    if (token) {
      fetchMe();
      fetchCart();
    }
  }, []);

  return null; // Ce composant ne rend rien visuellement
}