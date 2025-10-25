'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function PanierPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 50000 ? 0 : 5000;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="gradient-bg text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">
            Mon Panier
          </h1>
          <p className="text-xl text-white/90">
            {cartItems.length} article{cartItems.length > 1 ? 's' : ''} dans votre panier
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex gap-6">
                    {/* Image */}
                    <div className="relative w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                          <p className="text-gray-600 text-sm">{item.category}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-semibold w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary-600">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-sm text-gray-600">
                              {formatPrice(item.price)} / unité
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-8 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Résumé de la Commande</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Livraison</span>
                    <span className="font-semibold">
                      {deliveryFee === 0 ? 'Gratuite' : formatPrice(deliveryFee)}
                    </span>
                  </div>
                  {subtotal < 50000 && (
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      Ajoutez {formatPrice(50000 - subtotal)} pour la livraison gratuite
                    </p>
                  )}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-3xl font-bold text-primary-600">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <button className="btn-primary w-full mb-4 flex items-center justify-center gap-2">
                  <span>Procéder au Paiement</span>
                  <ArrowRight size={20} />
                </button>

                <Link href="/vente" className="btn-secondary w-full flex items-center justify-center gap-2">
                  Continuer mes Achats
                </Link>

                {/* Payment Methods */}
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm font-semibold mb-3">Modes de paiement acceptés</p>
                  <div className="flex gap-2 flex-wrap">
                    <div className="px-3 py-2 bg-gray-100 rounded text-xs font-semibold">
                      Carte bancaire
                    </div>
                    <div className="px-3 py-2 bg-gray-100 rounded text-xs font-semibold">
                      MTN MoMo
                    </div>
                    <div className="px-3 py-2 bg-gray-100 rounded text-xs font-semibold">
                      Orange Money
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={64} className="text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Votre panier est vide</h2>
            <p className="text-gray-600 mb-8">
              Découvrez nos véhicules et accessoires pour commencer vos achats
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/vente" className="btn-primary">
                Voir les Véhicules
              </Link>
              <Link href="/accessoires" className="btn-secondary">
                Voir les Accessoires
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
