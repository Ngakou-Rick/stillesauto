'use client';

import { useEffect, useState } from 'react';
import { Accessory, AccessoryFilters } from '@/types';
import { accessoryService } from '@/lib/services/accessory.service';
import AccessoryCard from '@/components/accessories/AccessoryCard';
import { Search, Loader2 } from 'lucide-react';

export default function AccessoiresPage() {
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<AccessoryFilters>({
    page: 1,
    limit: 12,
  });

  useEffect(() => {
    loadAccessories();
  }, [filters]);

  async function loadAccessories() {
    setIsLoading(true);
    try {
      const response = await accessoryService.getAccessories(filters);
      setAccessories(response.data);
      setTotal(response.meta.total);
    } catch (error) {
      console.error('Erreur chargement accessoires:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-red-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Accessoires Automobiles</h1>
          <p className="text-red-100 text-lg mb-8">
            Tout ce qu'il faut pour équiper et entretenir votre véhicule
          </p>

          <div className="bg-white rounded-2xl p-4 flex flex-col md:flex-row gap-3 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Marque, catégorie..."
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
              onChange={(e) => setFilters(f => ({ ...f, brand: e.target.value || undefined, page: 1 }))}
            />
            <input
              type="number"
              placeholder="Prix max (FCFA)"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
              onChange={(e) => setFilters(f => ({ ...f, maxPrice: Number(e.target.value) || undefined, page: 1 }))}
            />
            <button
              onClick={loadAccessories}
              className="bg-red-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-red-700 transition-colors"
            >
              <Search size={18} />
              Rechercher
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <p className="text-gray-600 mb-8">
          <span className="font-bold text-gray-900">{total}</span> accessoire(s) disponible(s)
        </p>

        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 size={40} className="animate-spin text-blue-600" />
          </div>
        ) : accessories.length === 0 ? (
          <div className="text-center py-24 text-gray-500">
            <p className="text-xl font-semibold mb-2">Aucun accessoire trouvé</p>
            <p className="text-sm">Modifiez vos filtres pour voir plus de résultats</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {accessories.map((accessory) => (
              <AccessoryCard key={accessory.id} accessory={accessory} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}