'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { vehicles } from '@/data/vehicles';
import { formatPrice } from '@/lib/utils';
import { 
  Star, 
  Fuel, 
  Users, 
  Settings, 
  MapPin, 
  Calendar,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Check,
  MessageSquare
} from 'lucide-react';

export default function VehicleDetailPage() {
  const params = useParams();
  const vehicle = vehicles.find(v => v.id === params.id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState<'details' | 'reviews'>('details');
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    userName: '',
  });

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Véhicule non trouvé</h1>
          <Link href="/vente" className="btn-primary">
            Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % vehicle.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New review:', newReview);
    alert('Merci pour votre avis !');
    setNewReview({ rating: 5, comment: '', userName: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary-600">Accueil</Link>
            <span>/</span>
            <Link href="/vente" className="hover:text-primary-600">Véhicules</Link>
            <span>/</span>
            <span className="text-dark-900 font-semibold">{vehicle.name}</span>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-96 md:h-[500px]">
                <Image
                  src={vehicle.images[currentImageIndex]}
                  alt={vehicle.name}
                  fill
                  className="object-cover"
                />
                {vehicle.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-lg"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-lg"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {vehicle.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="border-b">
                <div className="flex">
                  <button
                    onClick={() => setSelectedTab('details')}
                    className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                      selectedTab === 'details'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Détails & Caractéristiques
                  </button>
                  <button
                    onClick={() => setSelectedTab('reviews')}
                    className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                      selectedTab === 'reviews'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Avis ({vehicle.reviews.length})
                  </button>
                </div>
              </div>

              <div className="p-8">
                {selectedTab === 'details' ? (
                  <div className="space-y-6">
                    {/* Description */}
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Description</h3>
                      <p className="text-gray-700 leading-relaxed">{vehicle.description}</p>
                    </div>

                    {/* Specifications */}
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Spécifications Techniques</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Marque</p>
                          <p className="font-semibold">{vehicle.brand}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Modèle</p>
                          <p className="font-semibold">{vehicle.model}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Année</p>
                          <p className="font-semibold">{vehicle.year}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Kilométrage</p>
                          <p className="font-semibold">{vehicle.mileage.toLocaleString()} km</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Carburant</p>
                          <p className="font-semibold capitalize">{vehicle.fuelType}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Transmission</p>
                          <p className="font-semibold capitalize">{vehicle.transmission}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Places</p>
                          <p className="font-semibold">{vehicle.seats}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Catégorie</p>
                          <p className="font-semibold capitalize">{vehicle.category}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Localisation</p>
                          <p className="font-semibold">{vehicle.location}</p>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Équipements</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {vehicle.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <Check className="text-primary-600 flex-shrink-0" size={20} />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Reviews List */}
                    <div>
                      <h3 className="text-2xl font-bold mb-6">Avis des Clients</h3>
                      {vehicle.reviews.length > 0 ? (
                        <div className="space-y-6">
                          {vehicle.reviews.map((review) => (
                            <div key={review.id} className="border-b pb-6 last:border-b-0">
                              <div className="flex items-center gap-4 mb-3">
                                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                  <span className="font-bold text-primary-600">
                                    {review.userName.charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <p className="font-semibold">{review.userName}</p>
                                  <div className="flex items-center gap-2">
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          size={16}
                                          className={
                                            i < review.rating
                                              ? 'text-yellow-500 fill-yellow-500'
                                              : 'text-gray-300'
                                          }
                                        />
                                      ))}
                                    </div>
                                    <span className="text-sm text-gray-600">
                                      {new Date(review.date).toLocaleDateString('fr-FR')}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-700">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600 text-center py-8">
                          Aucun avis pour le moment. Soyez le premier à laisser un avis !
                        </p>
                      )}
                    </div>

                    {/* Add Review Form */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold mb-4">Laisser un Avis</h3>
                      <form onSubmit={handleSubmitReview} className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Votre Nom</label>
                          <input
                            type="text"
                            required
                            value={newReview.userName}
                            onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                            className="input-field"
                            placeholder="Votre nom"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Note</label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <button
                                key={rating}
                                type="button"
                                onClick={() => setNewReview({ ...newReview, rating })}
                                className="p-2 hover:scale-110 transition-transform"
                              >
                                <Star
                                  size={32}
                                  className={
                                    rating <= newReview.rating
                                      ? 'text-yellow-500 fill-yellow-500'
                                      : 'text-gray-300'
                                  }
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Commentaire</label>
                          <textarea
                            required
                            value={newReview.comment}
                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                            rows={4}
                            className="input-field resize-none"
                            placeholder="Partagez votre expérience..."
                          />
                        </div>
                        <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                          <MessageSquare size={20} />
                          <span>Publier l'Avis</span>
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-24">
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">{vehicle.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-500 fill-yellow-500" size={20} />
                    <span className="font-semibold">{vehicle.rating}</span>
                  </div>
                  <span className="text-gray-600">({vehicle.reviews.length} avis)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={18} />
                  <span>{vehicle.location}</span>
                </div>
              </div>

              {/* Price */}
              <div className="border-t border-b py-6 mb-6">
                {vehicle.forSale && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Prix de vente</p>
                    <p className="text-3xl font-bold text-primary-600">
                      {formatPrice(vehicle.price)}
                    </p>
                  </div>
                )}
                {vehicle.forRent && vehicle.dailyRate && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Location par jour</p>
                    <p className="text-2xl font-bold text-accent-600">
                      {formatPrice(vehicle.dailyRate)}
                    </p>
                  </div>
                )}
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <Fuel size={20} className="text-primary-600" />
                  <span className="text-sm capitalize">{vehicle.fuelType}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Settings size={20} className="text-primary-600" />
                  <span className="text-sm capitalize">{vehicle.transmission}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Users size={20} className="text-primary-600" />
                  <span className="text-sm">{vehicle.seats} places</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar size={20} className="text-primary-600" />
                  <span className="text-sm">{vehicle.year}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button className="btn-primary w-full flex items-center justify-center gap-2">
                  <ShoppingCart size={20} />
                  <span>Ajouter au Panier</span>
                </button>
                <Link href="/contact" className="btn-secondary w-full flex items-center justify-center gap-2">
                  <MessageSquare size={20} />
                  <span>Demander Info</span>
                </Link>
              </div>

              {/* Status Badge */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg text-center">
                <p className="text-green-700 font-semibold">✓ Disponible</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
