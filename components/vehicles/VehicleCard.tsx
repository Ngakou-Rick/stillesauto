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
    <div className="card group">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Status Badge */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {vehicle.forRent && (
            <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Location
            </span>
          )}
          {vehicle.forSale && (
            <span className="bg-accent-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Vente
            </span>
          )}
        </div>
        {/* Rating */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
          <Star className="text-yellow-500 fill-yellow-500" size={16} />
          <span className="font-semibold text-sm">{vehicle.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-dark-900 mb-2 group-hover:text-primary-600 transition-colors">
          {vehicle.name}
        </h3>
        
        {/* Category & Year */}
        <p className="text-gray-600 mb-4 capitalize">
          {vehicle.category} • {vehicle.year}
        </p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-gray-700">
            <Fuel size={18} className="text-primary-600" />
            <span className="text-sm capitalize">{vehicle.fuelType}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Settings size={18} className="text-primary-600" />
            <span className="text-sm capitalize">{vehicle.transmission}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Users size={18} className="text-primary-600" />
            <span className="text-sm">{vehicle.seats} places</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <span className="text-sm font-semibold">{vehicle.mileage.toLocaleString()} km</span>
          </div>
        </div>

        {/* Price */}
        <div className="border-t pt-4 mb-4">
          {vehicle.forSale && (
            <div className="mb-2">
              <p className="text-sm text-gray-600">Prix de vente</p>
              <p className="text-2xl font-bold text-primary-600">
                {formatPrice(vehicle.price)}
              </p>
            </div>
          )}
          {vehicle.forRent && vehicle.dailyRate && (
            <div>
              <p className="text-sm text-gray-600">Location/jour</p>
              <p className="text-xl font-bold text-accent-600">
                {formatPrice(vehicle.dailyRate)}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button className="flex-1 btn-primary flex items-center justify-center gap-2 py-2">
            <ShoppingCart size={18} />
            <span>Ajouter</span>
          </button>
          <Link
            href={`/vehicules/${vehicle.id}`}
            className="flex-1 btn-secondary flex items-center justify-center gap-2 py-2"
          >
            <Info size={18} />
            <span>Détails</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
