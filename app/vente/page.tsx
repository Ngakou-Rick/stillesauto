'use client';

import { useState } from 'react';
import VehicleCard from '@/components/vehicles/VehicleCard';
import { vehicles } from '@/data/vehicles';
import { VehicleCategory, FuelType, Transmission } from '@/types';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function VentePage() {
  const saleVehicles = vehicles.filter(v => v.forSale);
  const [filteredVehicles, setFilteredVehicles] = useState(saleVehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<VehicleCategory | 'all'>('all');
  const [selectedFuel, setSelectedFuel] = useState<FuelType | 'all'>('all');
  const [selectedTransmission, setSelectedTransmission] = useState<Transmission | 'all'>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000]);
  const [showFilters, setShowFilters] = useState(false);

  const handleFilter = () => {
    let filtered = saleVehicles;

    if (searchTerm) {
      filtered = filtered.filter(v =>
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(v => v.category === selectedCategory);
    }

    if (selectedFuel !== 'all') {
      filtered = filtered.filter(v => v.fuelType === selectedFuel);
    }

    if (selectedTransmission !== 'all') {
      filtered = filtered.filter(v => v.transmission === selectedTransmission);
    }

    filtered = filtered.filter(v =>
      v.price >= priceRange[0] && v.price <= priceRange[1]
    );

    setFilteredVehicles(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="gradient-bg text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display">
            Vente de Véhicules
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Véhicules neufs et d'occasion certifiés au meilleur prix
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white shadow-lg -mt-10 relative z-10">
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher par marque, modèle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyUp={handleFilter}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <SlidersHorizontal size={20} />
              <span>Filtres</span>
            </button>

            {/* Search Button */}
            <button onClick={handleFilter} className="btn-primary whitespace-nowrap">
              Rechercher
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 p-6 bg-gray-50 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold mb-2">Catégorie</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as VehicleCategory | 'all')}
                  className="input-field"
                >
                  <option value="all">Toutes</option>
                  <option value="berline">Berline</option>
                  <option value="suv">SUV</option>
                  <option value="pickup">Pick-up</option>
                  <option value="van">Van</option>
                  <option value="sport">Sport</option>
                  <option value="luxury">Luxe</option>
                </select>
              </div>

              {/* Fuel Type Filter */}
              <div>
                <label className="block text-sm font-semibold mb-2">Carburant</label>
                <select
                  value={selectedFuel}
                  onChange={(e) => setSelectedFuel(e.target.value as FuelType | 'all')}
                  className="input-field"
                >
                  <option value="all">Tous</option>
                  <option value="essence">Essence</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybrid">Hybride</option>
                  <option value="electric">Électrique</option>
                </select>
              </div>

              {/* Transmission Filter */}
              <div>
                <label className="block text-sm font-semibold mb-2">Transmission</label>
                <select
                  value={selectedTransmission}
                  onChange={(e) => setSelectedTransmission(e.target.value as Transmission | 'all')}
                  className="input-field"
                >
                  <option value="all">Toutes</option>
                  <option value="manual">Manuelle</option>
                  <option value="automatic">Automatique</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Prix max: {(priceRange[1] / 1000000).toFixed(1)}M XAF
                </label>
                <input
                  type="range"
                  min="0"
                  max="50000000"
                  step="1000000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="container-custom py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">
            {filteredVehicles.length} véhicule{filteredVehicles.length > 1 ? 's' : ''} disponible{filteredVehicles.length > 1 ? 's' : ''}
          </h2>
        </div>

        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">Aucun véhicule ne correspond à vos critères</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedFuel('all');
                setSelectedTransmission('all');
                setPriceRange([0, 50000000]);
                setFilteredVehicles(saleVehicles);
              }}
              className="btn-primary mt-6"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
