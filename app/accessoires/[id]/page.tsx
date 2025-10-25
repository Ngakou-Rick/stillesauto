'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { accessories } from '@/data/accessories';
import { formatPrice } from '@/lib/utils';
import { 
  Star, 
  Package,
  ShoppingCart,
  Check,
  MessageSquare,
  Minus,
  Plus
} from 'lucide-react';

export default function AccessoryDetailPage() {
  const params = useParams();
  const accessory = accessories.find(a => a.id === params.id);
  const [selectedTab, setSelectedTab] = useState<'details' | 'reviews'>('details');
  const [quantity, setQuantity] = useState(1);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    userName: '',
  });

  if (!accessory) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Accessoire non trouvé</h1>
          <Link href="/accessoires" className="btn-primary">
            Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New review:', newReview);
    alert('Merci pour votre avis !');
    setNewReview({ rating: 5, comment: '', userName: '' });
  };

  const incrementQuantity = () => {
    if (quantity < accessory.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary-600">Accueil</Link>
            <span>/</span>
            <Link href="/accessoires" className="hover:text-primary-600">Accessoires</Link>
            <span>/</span>
            <span className="text-dark-900 font-semibold">{accessory.name}</span>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Image & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-96 md:h-[500px] bg-gray-100 flex items-center justify-center">
                <Package size={120} className="text-gray-300" />
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
                    Détails
                  </button>
                  <button
                    onClick={() => setSelectedTab('reviews')}
                    className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                      selectedTab === 'reviews'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Avis ({accessory.reviews.length})
                  </button>
                </div>
              </div>

              <div className="p-8">
                {selectedTab === 'details' ? (
                  <div className="space-y-6">
                    {/* Description */}
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Description</h3>
                      <p className="text-gray-700 leading-relaxed">{accessory.description}</p>
                    </div>

                    {/* Specifications */}
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Informations Produit</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Marque</p>
                          <p className="font-semibold">{accessory.brand}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Catégorie</p>
                          <p className="font-semibold capitalize">{accessory.category.replace('_', ' ')}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Stock Disponible</p>
                          <p className="font-semibold">{accessory.stock} unités</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Note Moyenne</p>
                          <p className="font-semibold">{accessory.rating} / 5</p>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Caractéristiques</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Check className="text-primary-600 flex-shrink-0" size={20} />
                          <span className="text-gray-700">Qualité supérieure garantie</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Check className="text-primary-600 flex-shrink-0" size={20} />
                          <span className="text-gray-700">Installation facile</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Check className="text-primary-600 flex-shrink-0" size={20} />
                          <span className="text-gray-700">Garantie fabricant</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Check className="text-primary-600 flex-shrink-0" size={20} />
                          <span className="text-gray-700">Livraison rapide disponible</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Reviews List */}
                    <div>
                      <h3 className="text-2xl font-bold mb-6">Avis des Clients</h3>
                      {accessory.reviews.length > 0 ? (
                        <div className="space-y-6">
                          {accessory.reviews.map((review) => (
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

          {/* Right Column - Purchase Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-24">
              <div className="mb-6">
                <p className="text-sm text-primary-600 font-semibold mb-2">{accessory.brand}</p>
                <h1 className="text-2xl font-bold mb-4">{accessory.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-500 fill-yellow-500" size={20} />
                    <span className="font-semibold">{accessory.rating}</span>
                  </div>
                  <span className="text-gray-600">({accessory.reviews.length} avis)</span>
                </div>
              </div>

              {/* Price */}
              <div className="border-t border-b py-6 mb-6">
                <p className="text-4xl font-bold text-primary-600">
                  {formatPrice(accessory.price)}
                </p>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Package size={20} className="text-gray-600" />
                  <span className="font-semibold">
                    {accessory.stock > 0 ? `${accessory.stock} en stock` : 'Rupture de stock'}
                  </span>
                </div>
                {accessory.stock < 10 && accessory.stock > 0 && (
                  <p className="text-sm text-accent-600 font-semibold">
                    ⚠️ Stock limité - Commandez vite !
                  </p>
                )}
              </div>

              {/* Quantity Selector */}
              {accessory.stock > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-3">Quantité</label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={decrementQuantity}
                      className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus size={20} />
                    </button>
                    <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                    <button
                      onClick={incrementQuantity}
                      className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
                      disabled={quantity >= accessory.stock}
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              )}

              {/* Total Price */}
              {accessory.stock > 0 && quantity > 1 && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-primary-600">
                      {formatPrice(accessory.price * quantity)}
                    </span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3">
                <button 
                  className="btn-primary w-full flex items-center justify-center gap-2"
                  disabled={accessory.stock === 0}
                >
                  <ShoppingCart size={20} />
                  <span>Ajouter au Panier</span>
                </button>
                <Link href="/contact" className="btn-secondary w-full flex items-center justify-center gap-2">
                  <MessageSquare size={20} />
                  <span>Demander Info</span>
                </Link>
              </div>

              {/* Delivery Info */}
              <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                <h4 className="font-semibold mb-2">Livraison</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <Check className="text-primary-600" size={16} />
                    <span>Livraison gratuite dès 50,000 XAF</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-primary-600" size={16} />
                    <span>Livraison en 2-5 jours ouvrables</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-primary-600" size={16} />
                    <span>Retrait en magasin disponible</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
