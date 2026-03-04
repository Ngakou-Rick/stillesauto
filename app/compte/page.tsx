'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import apiClient from '@/lib/api';
import { Order } from '@/types';
import {
  User, Package, Car, Calendar, LogOut,
  Loader2, ChevronRight, Clock, CheckCircle,
  XCircle, AlertCircle
} from 'lucide-react';

type Tab = 'profil' | 'commandes' | 'locations';

type OrderStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

interface Rental {
  id: string;
  vehicleName: string;
  vehicleImage?: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: OrderStatus;
}

export default function ComptePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, fetchMe } = useAuthStore();

  const [activeTab, setActiveTab] = useState<Tab>('profil');
  const [orders, setOrders] = useState<Order[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    fetchMe();
  }, [isAuthenticated]);

  useEffect(() => {
    if (activeTab === 'commandes') loadOrders();
    if (activeTab === 'locations') loadRentals();
  }, [activeTab]);

  async function loadOrders() {
    setIsLoading(true);
    try {
      const { data } = await apiClient.get('/orders');
      setOrders(data.data ?? data);
    } catch {
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }

  async function loadRentals() {
    setIsLoading(true);
    try {
      const { data } = await apiClient.get('/rentals');
      setRentals(data.data ?? data);
    } catch {
      setRentals([]);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogout() {
    await logout();
    router.push('/');
  }

  function StatusBadge({ status }: { status: OrderStatus }) {
    const config = {
      PENDING: { label: 'En attente', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
      CONFIRMED: { label: 'Confirmé', color: 'bg-blue-100 text-blue-700', icon: CheckCircle },
      COMPLETED: { label: 'Terminé', color: 'bg-green-100 text-green-700', icon: CheckCircle },
      CANCELLED: { label: 'Annulé', color: 'bg-red-100 text-red-700', icon: XCircle },
    };
    const { label, color, icon: Icon } = config[status] ?? config.PENDING;
    return (
      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${color}`}>
        <Icon size={12} />
        {label}
      </span>
    );
  }

  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: 'profil', label: 'Mon Profil', icon: User },
    { key: 'commandes', label: 'Commandes', icon: Package },
    { key: 'locations', label: 'Locations', icon: Car },
  ];

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-blue-700 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <User size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-blue-200">{user?.email}</p>
              <span className="inline-block mt-1 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                {user?.role}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-colors text-sm"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`w-full flex items-center justify-between px-5 py-4 text-sm font-medium transition-colors border-b last:border-0 border-gray-50 ${
                      activeTab === tab.key
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={18} />
                      {tab.label}
                    </span>
                    <ChevronRight size={16} className="text-gray-300" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contenu */}
          <div className="lg:col-span-3">

            {/* ===== PROFIL ===== */}
            {activeTab === 'profil' && (
              <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
                <h2 className="font-bold text-xl text-gray-900 mb-2">Informations personnelles</h2>

                {[
                  { label: 'Prénom', value: user?.firstName },
                  { label: 'Nom', value: user?.lastName },
                  { label: 'Email', value: user?.email },
                  { label: 'Téléphone', value: user?.phone ?? 'Non renseigné' },
                  { label: 'Rôle', value: user?.role },
                  {
                    label: 'Membre depuis',
                    value: user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString('fr-FR', {
                          year: 'numeric', month: 'long', day: 'numeric'
                        })
                      : '—'
                  },
                ].map((field) => (
                  <div key={field.label} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-500">{field.label}</span>
                    <span className="text-sm font-medium text-gray-900">{field.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* ===== COMMANDES ===== */}
            {activeTab === 'commandes' && (
              <div className="space-y-4">
                <h2 className="font-bold text-xl text-gray-900">Mes commandes</h2>

                {isLoading ? (
                  <div className="flex justify-center py-16">
                    <Loader2 size={36} className="animate-spin text-blue-600" />
                  </div>
                ) : orders.length === 0 ? (
                  <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                    <Package size={48} className="mx-auto text-gray-200 mb-4" />
                    <p className="font-semibold text-gray-700 mb-1">Aucune commande</p>
                    <p className="text-sm text-gray-400">Vos achats d'accessoires apparaîtront ici</p>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-2xl shadow-sm p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Commande #{order.id.slice(0, 8).toUpperCase()}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                              year: 'numeric', month: 'long', day: 'numeric'
                            })}
                          </p>
                        </div>
                        <StatusBadge status={order.status} />
                      </div>

                      <div className="space-y-2 mb-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-gray-600 truncate max-w-xs">{item.itemName}</span>
                            <span className="font-medium text-gray-900 ml-2">
                              {item.totalPrice.toLocaleString('fr-FR')} FCFA
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <span className="text-sm text-gray-500">Total</span>
                        <span className="font-bold text-blue-600">
                          {order.totalAmount.toLocaleString('fr-FR')} FCFA
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* ===== LOCATIONS ===== */}
            {activeTab === 'locations' && (
              <div className="space-y-4">
                <h2 className="font-bold text-xl text-gray-900">Mes locations</h2>

                {isLoading ? (
                  <div className="flex justify-center py-16">
                    <Loader2 size={36} className="animate-spin text-blue-600" />
                  </div>
                ) : rentals.length === 0 ? (
                  <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                    <Car size={48} className="mx-auto text-gray-200 mb-4" />
                    <p className="font-semibold text-gray-700 mb-1">Aucune location</p>
                    <p className="text-sm text-gray-400">Vos réservations de véhicules apparaîtront ici</p>
                  </div>
                ) : (
                  rentals.map((rental) => (
                    <div key={rental.id} className="bg-white rounded-2xl shadow-sm p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-bold text-gray-900">{rental.vehicleName}</p>
                          <p className="text-xs text-gray-400 mt-0.5">#{rental.id.slice(0, 8).toUpperCase()}</p>
                        </div>
                        <StatusBadge status={rental.status} />
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Calendar size={14} className="text-blue-500" />
                        <span>
                          {new Date(rental.startDate).toLocaleDateString('fr-FR')}
                          {' → '}
                          {new Date(rental.endDate).toLocaleDateString('fr-FR')}
                        </span>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <span className="text-sm text-gray-500">Total payé</span>
                        <span className="font-bold text-blue-600">
                          {rental.totalPrice.toLocaleString('fr-FR')} FCFA
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}