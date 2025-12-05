'use client';

import { useEffect, useState } from 'react';
import { getVehicleById } from '@/lib/api';
import { Vehicle } from '@/types';
import { useParams } from 'next/navigation';
import { Calendar, Car, Fuel, Gauge, Gem, GitMerge, Palette, Wrench } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// ... (imports)

export default function VehicleDetailPage() {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const id = params.id ? parseInt(params.id as string) : null;

  useEffect(() => {
    if (id) {
      const fetchVehicle = async () => {
        try {
          const response = await getVehicleById(id);
          setVehicle(response.data);
        } catch (err) {
          setError("Impossible de charger le véhicule. Veuillez réessayer plus tard.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchVehicle();
    } else {
      setError("ID de véhicule non valide.");
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
          <Link href="/" className="mt-6 btn-primary">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return <div>Véhicule non trouvé</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-custom py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{vehicle.name}</h1>
          <p className="text-xl text-gray-600">{vehicle.brand}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Image & Main Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <Image
                src={vehicle.imageUrl || '/images/placeholder.png'}
                alt={vehicle.name}
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">
                {vehicle.description || "Aucune description disponible."}
              </p>
            </div>
          </div>

          {/* Right Column - Details & Pricing */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-8 sticky top-24">
              {/* Pricing */}
              <div className="mb-8">
                {vehicle.forSale && vehicle.price && (
                  <div className="mb-4">
                    <p className="text-lg text-gray-600">Prix de vente</p>
                    <p className="text-4xl font-bold text-primary-600">
                      {vehicle.price.toLocaleString()} XAF
                    </p>
                  </div>
                )}
                {vehicle.forRent && vehicle.dailyRate && (
                  <div>
                    <p className="text-lg text-gray-600">Tarif journalier</p>
                    <p className="text-4xl font-bold text-secondary-600">
                      {vehicle.dailyRate.toLocaleString()} XAF
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 mb-8">
                {vehicle.forSale && <button className="btn-primary w-full">Acheter maintenant</button>}
                {vehicle.forRent && <button className="btn-secondary w-full">Réserver pour la location</button>}
              </div>

              {/* Details List */}
              <h3 className="text-xl font-bold mb-4">Détails du véhicule</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <Car size={20} className="text-gray-500" />
                  <span><strong>Catégorie:</strong> {vehicle.category}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Wrench size={20} className="text-gray-500" />
                  <span><strong>Transmission:</strong> {vehicle.transmission}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Fuel size={20} className="text-gray-500" />
                  <span><strong>Carburant:</strong> {vehicle.fuelType}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Calendar size={20} className="text-gray-500" />
                  <span><strong>Année:</strong> {vehicle.year}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Gauge size={20} className="text-gray-500" />
                  <span><strong>Kilométrage:</strong> {vehicle.mileage.toLocaleString()} km</span>
                </li>
                 <li className="flex items-center gap-3">
                  <Palette size={20} className="text-gray-500" />
                  <span><strong>Couleur:</strong> {vehicle.color}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Gem size={20} className="text-gray-500" />
                   <span><strong>État:</strong> {vehicle.state}</span>
                 </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
