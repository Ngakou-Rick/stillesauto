'use client';

import { useEffect, useState } from 'react';
import { Vehicle, VehicleFilters } from '@/types';
import { vehicleService } from '@/lib/services/vehicle.service';
import VehicleCard from '@/components/vehicles/VehicleCard';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';

export default function LocationPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<VehicleFilters>({
    listingMode: 'RENTAL',
    page: 1,
    limit: 12,
  });

  useEffect(() => {
    loadVehicles();
  }, [filters]);

  async function loadVehicles() {
    setIsLoading(true);
    try {
      const response = await vehicleService.getVehicles(filters);
      setVehicles(response.data);
      setTotal(response.meta.total);
    } catch (error) {
      console.error('Erreur chargement véhicules:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-blue-700 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Location de Véhicules</h1>
          <p className="text-blue-200 text-lg mb-8">
            Trouvez le véhicule idéal pour vos déplacements au Cameroun
          </p>

          {/* Barre de recherche */}
          <div className="bg-white rounded-2xl p-4 flex flex-col md:flex-row gap-3 max-w-3xl mx-auto">
            <select
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFilters(f => ({ ...f, type: e.target.value as any || undefined, page: 1 }))}
            >
              <option value="">Tous les types</option>
              <option value="CAR">Voiture</option>
              <option value="SUV">SUV</option>
              <option value="VAN">Van</option>
              <option value="TRUCK">Camion</option>
            </select>

            <select
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFilters(f => ({ ...f, fuelType: e.target.value as any || undefined, page: 1 }))}
            >
              <option value="">Carburant</option>
              <option value="PETROL">Essence</option>
              <option value="DIESEL">Diesel</option>
              <option value="ELECTRIC">Électrique</option>
              <option value="HYBRID">Hybride</option>
            </select>

            <button
              onClick={loadVehicles}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <Search size={18} />
              Rechercher
            </button>
          </div>
        </div>
      </section>

      {/* Résultats */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-600">
            <span className="font-bold text-gray-900">{total}</span> véhicule(s) disponible(s)
          </p>
          <div className="flex items-center gap-2 text-gray-500">
            <SlidersHorizontal size={16} />
            <span className="text-sm">Filtres</span>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 size={40} className="animate-spin text-blue-600" />
          </div>
        ) : vehicles.length === 0 ? (
          <div className="text-center py-24 text-gray-500">
            <p className="text-xl font-semibold mb-2">Aucun véhicule trouvé</p>
            <p className="text-sm">Modifiez vos filtres pour voir plus de résultats</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} mode="rental" />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}