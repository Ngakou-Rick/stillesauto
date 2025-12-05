'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Vehicle } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Star, Fuel, Users, Settings, ShoppingCart, Info } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <div className="card group flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <Image
           src={vehicle.imageUrl}
          alt={vehicle.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Status Badge */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {vehicle.forRent && (
            <span className="bg-primary-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-md">
              Location
            </span>
          )}
          {vehicle.forSale && (
            <span className="bg-accent-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-md">
              Vente
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-lg font-bold text-dark-900 mb-1 group-hover:text-primary-600 transition-colors line-clamp-2">
          {vehicle.name}
        </h3>
        
        {/* Category & Year */}
        <p className="text-gray-600 mb-3 capitalize text-sm">
          {vehicle.category} • {vehicle.year}
        </p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <Fuel size={16} className="text-primary-600 flex-shrink-0" />
            <span className="capitalize truncate">{vehicle.fuelType}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Settings size={16} className="text-primary-600 flex-shrink-0" />
            <span className="capitalize truncate">{vehicle.transmission}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <span className="font-semibold truncate">{vehicle.mileage.toLocaleString()} km</span>
          </div>
        </div>

        {/* Price */}
        <div className="border-t pt-3 mb-4 mt-auto">
          {vehicle.forSale && (
            <div className="mb-2">
              <p className="text-xs text-gray-600 mb-0.5">Prix de vente</p>
              <p className="text-xl font-bold text-primary-600">
                {formatPrice(vehicle.price)}
              </p>
            </div>
          )}
          {vehicle.forRent && vehicle.dailyRate && (
            <div>
              <p className="text-xs text-gray-600 mb-0.5">Location/jour</p>
              <p className="text-lg font-bold text-accent-600">
                {formatPrice(vehicle.dailyRate)}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="flex-1 btn-primary flex items-center justify-center gap-1.5 py-2 text-sm">
            <ShoppingCart size={16} />
            <span>Ajouter</span>
          </button>
          <Link
            href={`/vehicules/${vehicle.id}`}
            className="flex-1 btn-secondary flex items-center justify-center gap-1.5 py-2 text-sm"
          >
            <Info size={16} />
            <span>Détails</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
