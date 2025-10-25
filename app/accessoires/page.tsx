'use client';

import { useState } from 'react';
import AccessoryCard from '@/components/accessories/AccessoryCard';
import { accessories } from '@/data/accessories';
import { AccessoryCategory } from '@/types';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function AccessoiresPage() {
  const [filteredAccessories, setFilteredAccessories] = useState(accessories);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AccessoryCategory | 'all'>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);

  const handleFilter = () => {
    let filtered = accessories;

    if (searchTerm) {
      filtered = filtered.filter(a =>
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(a => a.category === selectedCategory);
    }

    filtered = filtered.filter(a =>
      a.price >= priceRange[0] && a.price <= priceRange[1]
    );

    setFilteredAccessories(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="gradient-bg text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display">
            Accessoires Automobiles
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Équipez et personnalisez votre véhicule avec nos accessoires de qualité
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
                placeholder="Rechercher un accessoire..."
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
            <div className="mt-6 p-6 bg-gray-50 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold mb-2">Catégorie</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as AccessoryCategory | 'all')}
                  className="input-field"
                >
                  <option value="all">Toutes</option>
                  <option value="interior">Intérieur</option>
                  <option value="exterior">Extérieur</option>
                  <option value="electronics">Électronique</option>
                  <option value="maintenance">Entretien</option>
                  <option value="safety">Sécurité</option>
                  <option value="performance">Performance</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Prix max: {priceRange[1].toLocaleString()} XAF
                </label>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="5000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>

              {/* Stock Filter */}
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-200"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilteredAccessories(filteredAccessories.filter(a => a.stock > 0));
                      } else {
                        handleFilter();
                      }
                    }}
                  />
                  <span className="font-semibold">En stock uniquement</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="container-custom py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">
            {filteredAccessories.length} accessoire{filteredAccessories.length > 1 ? 's' : ''} disponible{filteredAccessories.length > 1 ? 's' : ''}
          </h2>
        </div>

        {filteredAccessories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredAccessories.map((accessory) => (
              <AccessoryCard key={accessory.id} accessory={accessory} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">Aucun accessoire ne correspond à vos critères</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setPriceRange([0, 100000]);
                setFilteredAccessories(accessories);
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
