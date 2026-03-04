'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cart.store';
import { useAuthStore } from '@/store/auth.store';
import {
  ShoppingCart, Trash2, Calendar, Package,
  Car, Loader2, ArrowRight, ShoppingBag
} from 'lucide-react';

export default function PanierPage() {
  const router = useRouter();
  const { cart, isLoading, fetchCart, removeItem } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    fetchCart();
  }, [isAuthenticated]);

  async function handleRemove(itemId: string) {
    await removeItem(itemId);
  }

  async function handleCheckout() {
    router.push('/commande');
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 size={48} className="animate-spin text-blue-600" />
      </div>
    );
  }

  const isEmpty = !cart || cart.items.length === 0;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-6">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <ShoppingCart size={24} className="text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Mon Panier</h1>
          {!isEmpty && (
            <span className="bg-blue-600 text-white text-sm font-bold px-2 py-0.5 rounded-full">
              {cart.items.length}
            </span>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Panier vide */}
        {isEmpty ? (
          <div className="text-center py-24">
            <ShoppingBag size={64} className="mx-auto text-gray-200 mb-4" />
            <h2 className="text-xl font-bold text-gray-700 mb-2">Votre panier est vide</h2>
            <p className="text-gray-400 mb-8">Ajoutez des véhicules ou accessoires pour commencer</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/location"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Voir les locations
              </Link>
              <Link
                href="/accessoires"
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Voir les accessoires
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Liste des items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => {
                const isRental = item.transactionType === 'RENTAL';
                const isVehicle = item.itemType === 'VEHICLE';

                // Calcul jours si location
                const days = isRental && item.rentalStartDate && item.rentalEndDate
                  ? Math.ceil(
                      (new Date(item.rentalEndDate).getTime() - new Date(item.rentalStartDate).getTime())
                      / (1000 * 60 * 60 * 24)
                    )
                  : null;

                return (
                  <div key={item.id} className="bg-white rounded-2xl shadow-sm p-5 flex gap-4">

                    {/* Image */}
                    <div className="relative h-24 w-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                      {item.itemImage ? (
                        <Image
                          src={item.itemImage}
                          alt={item.itemName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          {isVehicle
                            ? <Car size={28} className="text-gray-300" />
                            : <Package size={28} className="text-gray-300" />
                          }
                        </div>
                      )}
                    </div>

                    {/* Infos */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-gray-900 truncate">{item.itemName}</h3>
                          {/* Badge type */}
                          <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-1 ${
                            isRental
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {isRental ? 'Location' : 'Achat'}
                          </span>
                        </div>

                        {/* Bouton supprimer */}
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      {/* Dates si location */}
                      {isRental && item.rentalStartDate && item.rentalEndDate && (
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                          <Calendar size={14} className="text-blue-500" />
                          <span>
                            {new Date(item.rentalStartDate).toLocaleDateString('fr-FR')}
                            {' → '}
                            {new Date(item.rentalEndDate).toLocaleDateString('fr-FR')}
                          </span>
                          {days && (
                            <span className="text-blue-600 font-medium">({days} j)</span>
                          )}
                        </div>
                      )}

                      {/* Quantité si accessoire */}
                      {!isVehicle && (
                        <p className="text-sm text-gray-500 mt-1">
                          Quantité : {item.quantity}
                        </p>
                      )}

                      {/* Prix */}
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm text-gray-400">
                          {item.unitPrice.toLocaleString('fr-FR')} FCFA
                          {isRental ? ' / jour' : ' / unité'}
                        </span>
                        <span className="font-bold text-blue-600">
                          {item.totalPrice.toLocaleString('fr-FR')} FCFA
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Récapitulatif */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
                <h2 className="font-bold text-lg text-gray-900 mb-4">Récapitulatif</h2>

                {/* Détail par item */}
                <div className="space-y-2 mb-4">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm text-gray-600">
                      <span className="truncate max-w-[180px]">{item.itemName}</span>
                      <span className="font-medium flex-shrink-0 ml-2">
                        {item.totalPrice.toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>
                  ))}
                </div>

                {/* Séparateur */}
                <div className="border-t border-gray-100 pt-4 mb-6">
                  <div className="flex justify-between font-bold text-gray-900 text-lg">
                    <span>Total</span>
                    <span className="text-blue-600">
                      {cart.totalAmount.toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                </div>

                {/* Bouton commander */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  Passer la commande
                  <ArrowRight size={18} />
                </button>

                {/* Continuer shopping */}
                <Link
                  href="/"
                  className="block text-center text-sm text-gray-500 hover:text-blue-600 mt-3 transition-colors"
                >
                  Continuer mes achats
                </Link>
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}