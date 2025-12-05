'use client';

import { useEffect, useState } from 'react';
import AccessoryCard from '@/components/accessories/AccessoryCard';
import { getAccessories } from '@/lib/api';
import { Accessory } from '@/types';
import { Search } from 'lucide-react';
import Link from 'next/link';

export default function AccessoiresPage() {
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [filteredAccessories, setFilteredAccessories] = useState<Accessory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const data = await getAccessories();
        setAccessories(data);
        setFilteredAccessories(data);
      } catch (err) {
        setError("Impossible de charger les accessoires. Veuillez réessayer plus tard.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccessories();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = accessories.filter(acc =>
      acc.name.toLowerCase().includes(term)
    );
    setFilteredAccessories(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-semibold">Chargement des accessoires...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Erreur</h1>
          <p className="text-xl text-gray-700">{error}</p>
          <Link href="/" className="mt-6 btn-primary">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gray-800 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display">
            Nos Accessoires
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Équipez votre véhicule avec les meilleurs accessoires du marché.
          </p>
        </div>
      </div>

      {/* Search & Results */}
      <div className="container-custom py-16">
        {/* Search Bar */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher un accessoire..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
            />
          </div>
        </div>

        {filteredAccessories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredAccessories.map((accessory) => (
              <AccessoryCard key={accessory.id} accessory={accessory} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">Aucun accessoire trouvé.</p>
          </div>
        )}
      </div>
    </div>
  );
}
