'use client';

import { useEffect, useState } from 'react';
import { getAccessoryById } from '@/lib/api';
import { Accessory } from '@/types';
import { useParams } from 'next/navigation';
import { Star, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AccessoryDetailPage() {
  const [accessory, setAccessory] = useState<Accessory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const id = params.id ? parseInt(params.id as string) : null;

  useEffect(() => {
    if (id) {
      const fetchAccessory = async () => {
        try {
          const response = await getAccessoryById(id);
          setAccessory(response.data);
        } catch (err) {
          setError("Impossible de charger l'accessoire. Veuillez réessayer plus tard.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchAccessory();
    } else {
      setError("ID d'accessoire non valide.");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Erreur</h1>
          <p className="text-xl text-gray-700">{error}</p>
          <Link href="/accessoires" className="mt-6 btn-primary">
            Retour aux accessoires
          </Link>
        </div>
      </div>
    );
  }

  if (!accessory) {
    return <div>Accessoire non trouvé</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image */}
          <div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Image
                src={accessory.imageUrl || '/images/placeholder.png'}
                alt={accessory.name}
                width={600}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Right Column - Details & Actions */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{accessory.name}</h1>
              <p className="text-lg text-gray-500 mb-4">Catégorie: {accessory.category}</p>

              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} fill="currentColor" size={20} />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">(12 avis)</span>
              </div>

              <p className="text-4xl font-bold text-primary-600 mb-6">
                {accessory.price.toLocaleString()} XAF
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                {accessory.description}
              </p>

              <div className="flex items-center gap-4">
                <button className="btn-primary flex items-center gap-2">
                  <ShoppingCart size={20} />
                  <span>Ajouter au panier</span>
                </button>
                <p className="text-green-600 font-semibold">
                  En stock: {accessory.stock}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
