'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Accessory } from '@/types';
import { Star, Package } from 'lucide-react';

interface AccessoryCardProps {
  accessory: Accessory;
}

export default function AccessoryCard({ accessory }: AccessoryCardProps) {
  const imageUrl = accessory.images?.[0] ?? '/images/placeholder-accessory.jpg';

  return (
    <Link href={`/accessoires/${accessory.id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={accessory.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Badge stock */}
          <span className={`absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-full ${
            accessory.stock > 0
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {accessory.stock > 0 ? `${accessory.stock} en stock` : 'Rupture'}
          </span>
        </div>

        {/* Contenu */}
        <div className="p-4">
          <p className="text-blue-600 text-xs font-semibold uppercase tracking-wide mb-1">
            {accessory.category}
          </p>
          <h3 className="font-bold text-gray-900 text-base leading-tight mb-1">
            {accessory.name}
          </h3>
          <p className="text-gray-400 text-sm mb-3">{accessory.brand}</p>

          {/* Note */}
          {accessory.averageRating && (
            <div className="flex items-center gap-1 mb-3">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium text-gray-700">
                {accessory.averageRating.toFixed(1)}
              </span>
              <span className="text-sm text-gray-400">
                ({accessory.reviewCount} avis)
              </span>
            </div>
          )}

          {/* Prix */}
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">
              {accessory.price.toLocaleString('fr-FR')} FCFA
            </span>
            <span className="bg-blue-600 text-white text-sm px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors">
              Voir
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}