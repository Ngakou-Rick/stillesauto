'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Vehicle, Review } from '@/types';
import { vehicleService } from '@/lib/services/vehicle.service';
import { reviewService } from '@/lib/services/review.service';
import { useCartStore } from '@/store/cart.store';
import { useAuthStore } from '@/store/auth.store';
import {
  Users, Fuel, Settings, Star, ShoppingCart,
  Calendar, CheckCircle, XCircle, Loader2, ChevronLeft
} from 'lucide-react';
import Link from 'next/link';

export default function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  // Dates pour la location
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  // Panier
  const { addItem, isLoading: cartLoading } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (id) loadData();
  }, [id]);

  async function loadData() {
    setIsLoading(true);
    try {
      const [vehicleData, reviewsData] = await Promise.all([
        vehicleService.getVehicleById(id),
        reviewService.getReviews('VEHICLE', id),
      ]);
      setVehicle(vehicleData);
      setReviews(reviewsData.data);
    } catch {
      router.push('/404');
    } finally {
      setIsLoading(false);
    }
  }

  async function checkAvailability() {
    if (!startDate || !endDate) return;
    setCheckingAvailability(true);
    try {
      const result = await vehicleService.checkAvailability(id, startDate, endDate);
      setIsAvailable(result.available);
    } catch {
      setIsAvailable(false);
    } finally {
      setCheckingAvailability(false);
    }
  }

  async function handleAddToCart(transactionType: 'RENTAL' | 'PURCHASE') {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    try {
      await addItem({
        itemType: 'VEHICLE',
        transactionType,
        itemId: id,
        quantity: 1,
        ...(transactionType === 'RENTAL' && { rentalStartDate: startDate, rentalEndDate: endDate }),
      });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erreur lors de l\'ajout au panier');
    }
  }

  // Calcul du nombre de jours
  const rentalDays = startDate && endDate
    ? Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const rentalTotal = rentalDays > 0 && vehicle?.dailyRentalPrice
    ? rentalDays * vehicle.dailyRentalPrice
    : 0;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 size={48} className="animate-spin text-blue-600" />
      </div>
    );
  }

  if (!vehicle) return null;

  const canRent = vehicle.listingMode === 'RENTAL' || vehicle.listingMode === 'BOTH';
  const canBuy = vehicle.listingMode === 'SALE' || vehicle.listingMode === 'BOTH';

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Bouton retour */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <Link href="/location" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
          <ChevronLeft size={18} />
          Retour
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Colonne gauche — Images + Infos */}
        <div className="lg:col-span-2 space-y-6">

          {/* Galerie */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-md">
            <div className="relative h-80 w-full">
              <Image
                src={vehicle.images?.[activeImage] ?? '/images/placeholder-vehicle.jpg'}
                alt={`${vehicle.brand} ${vehicle.model}`}
                fill
                className="object-cover"
              />
            </div>
            {vehicle.images?.length > 1 && (
              <div className="flex gap-2 p-3 overflow-x-auto">
                {vehicle.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative h-16 w-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === i ? 'border-blue-600' : 'border-transparent'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informations */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {vehicle.brand} {vehicle.model}
                </h1>
                <p className="text-gray-400 mt-1">{vehicle.year} · {vehicle.type}</p>
              </div>
              {vehicle.averageRating && (
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-2 rounded-xl">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-gray-800">{vehicle.averageRating.toFixed(1)}</span>
                  <span className="text-gray-400 text-sm">({vehicle.reviewCount})</span>
                </div>
              )}
            </div>

            {/* Caractéristiques */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-gray-100">
              <div className="text-center">
                <Users size={20} className="mx-auto text-blue-600 mb-1" />
                <p className="text-sm text-gray-500">Places</p>
                <p className="font-semibold">{vehicle.seats}</p>
              </div>
              <div className="text-center">
                <Fuel size={20} className="mx-auto text-blue-600 mb-1" />
                <p className="text-sm text-gray-500">Carburant</p>
                <p className="font-semibold">{vehicle.fuelType}</p>
              </div>
              <div className="text-center">
                <Settings size={20} className="mx-auto text-blue-600 mb-1" />
                <p className="text-sm text-gray-500">Transmission</p>
                <p className="font-semibold">{vehicle.transmission}</p>
              </div>
              <div className="text-center">
                <CheckCircle size={20} className={`mx-auto mb-1 ${vehicle.available ? 'text-green-500' : 'text-red-400'}`} />
                <p className="text-sm text-gray-500">Statut</p>
                <p className={`font-semibold ${vehicle.available ? 'text-green-600' : 'text-red-500'}`}>
                  {vehicle.available ? 'Disponible' : 'Indisponible'}
                </p>
              </div>
            </div>

            {/* Description */}
            {vehicle.description && (
              <div className="mt-4">
                <h2 className="font-semibold text-gray-900 mb-2">Description</h2>
                <p className="text-gray-600 leading-relaxed">{vehicle.description}</p>
              </div>
            )}

            {/* Équipements */}
            {vehicle.features?.length > 0 && (
              <div className="mt-4">
                <h2 className="font-semibold text-gray-900 mb-3">Équipements</h2>
                <div className="flex flex-wrap gap-2">
                  {vehicle.features.map((feature, i) => (
                    <span key={i} className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Avis */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="font-bold text-xl text-gray-900 mb-4">
              Avis clients ({reviews.length})
            </h2>
            {reviews.length === 0 ? (
              <p className="text-gray-400 text-center py-6">Aucun avis pour l'instant</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-800">{review.userName}</span>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                    <p className="text-gray-400 text-xs mt-1">
                      {new Date(review.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Colonne droite — Réservation */}
        <div className="space-y-4">

          {/* Prix */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            {canRent && vehicle.dailyRentalPrice && (
              <div className="mb-3">
                <span className="text-3xl font-bold text-blue-600">
                  {vehicle.dailyRentalPrice.toLocaleString('fr-FR')} FCFA
                </span>
                <span className="text-gray-400 ml-1">/ jour</span>
              </div>
            )}
            {canBuy && vehicle.salePrice && (
              <div>
                <span className="text-2xl font-bold text-gray-800">
                  {vehicle.salePrice.toLocaleString('fr-FR')} FCFA
                </span>
                <span className="text-gray-400 ml-1">à l'achat</span>
              </div>
            )}
          </div>

          {/* Sélecteur de dates (location uniquement) */}
          {canRent && (
            <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Calendar size={18} className="text-blue-600" />
                Choisir les dates
              </h3>

              <div>
                <label className="text-sm text-gray-500 mb-1 block">Date de début</label>
                <input
                  type="date"
                  value={startDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => { setStartDate(e.target.value); setIsAvailable(null); }}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500 mb-1 block">Date de fin</label>
                <input
                  type="date"
                  value={endDate}
                  min={startDate || new Date().toISOString().split('T')[0]}
                  onChange={(e) => { setEndDate(e.target.value); setIsAvailable(null); }}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Résumé prix */}
              {rentalDays > 0 && (
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{rentalDays} jour(s) × {vehicle.dailyRentalPrice?.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900">
                    <span>Total</span>
                    <span>{rentalTotal.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                </div>
              )}

              {/* Vérifier disponibilité */}
              <button
                onClick={checkAvailability}
                disabled={!startDate || !endDate || checkingAvailability}
                className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {checkingAvailability
                  ? <Loader2 size={16} className="animate-spin" />
                  : <CheckCircle size={16} />
                }
                Vérifier la disponibilité
              </button>

              {/* Résultat disponibilité */}
              {isAvailable === true && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-xl">
                  <CheckCircle size={16} />
                  <span className="text-sm font-medium">Disponible pour ces dates !</span>
                </div>
              )}
              {isAvailable === false && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-xl">
                  <XCircle size={16} />
                  <span className="text-sm font-medium">Indisponible pour ces dates</span>
                </div>
              )}

              {/* Bouton louer */}
              <button
                onClick={() => handleAddToCart('RENTAL')}
                disabled={!isAvailable || cartLoading || !vehicle.available}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {cartLoading
                  ? <Loader2 size={18} className="animate-spin" />
                  : <ShoppingCart size={18} />
                }
                {addedToCart ? 'Ajouté au panier ✓' : 'Réserver maintenant'}
              </button>
            </div>
          )}

          {/* Bouton acheter */}
          {canBuy && (
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <button
                onClick={() => handleAddToCart('PURCHASE')}
                disabled={cartLoading || !vehicle.available}
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {cartLoading
                  ? <Loader2 size={18} className="animate-spin" />
                  : <ShoppingCart size={18} />
                }
                {addedToCart ? 'Ajouté au panier ✓' : 'Acheter ce véhicule'}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}