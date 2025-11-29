'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Accessory } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Star, ShoppingCart, Info, Package } from 'lucide-react';

interface AccessoryCardProps {
  accessory: Accessory;
}

export default function AccessoryCard({ accessory }: AccessoryCardProps) {
  const isLowStock = accessory.stock < 10;

  return (
    <div className="card group flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <Package size={64} className="text-gray-300" />
        </div>
        {/* Stock Badge */}
        {isLowStock && (
          <div className="absolute top-3 left-3">
            <span className="bg-accent-600 text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-md">
              Stock limité
            </span>
          </div>
        )}
        {/* Rating */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
          <Star className="text-yellow-500 fill-yellow-500" size={12} />
          <span className="font-semibold text-xs">{accessory.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Brand */}
        <p className="text-xs text-primary-600 font-semibold mb-1 uppercase tracking-wide">
          {accessory.brand}
        </p>

        {/* Title */}
        <h3 className="text-base font-bold text-dark-900 mb-1.5 group-hover:text-primary-600 transition-colors line-clamp-2">
          {accessory.name}
        </h3>
        
        {/* Category */}
        <p className="text-gray-600 mb-2 text-xs capitalize">
          {accessory.category.replace('_', ' ')}
        </p>

        {/* Description */}
        <p className="text-gray-700 text-xs mb-3 line-clamp-2 flex-grow">
          {accessory.description}
        </p>

        {/* Stock Info */}
        <div className="flex items-center gap-2 mb-3">
          <Package size={14} className="text-gray-500 flex-shrink-0" />
          <span className={`text-xs ${isLowStock ? 'text-accent-600 font-semibold' : 'text-gray-600'}`}>
            {accessory.stock} en stock
          </span>
        </div>

        {/* Price */}
        <div className="border-t pt-3 mb-3">
          <p className="text-xl font-bold text-primary-600">
            {formatPrice(accessory.price)}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button 
            className="flex-1 btn-primary flex items-center justify-center gap-1.5 py-2 text-xs font-semibold"
            disabled={accessory.stock === 0}
          >
            <ShoppingCart size={14} />
            <span>Ajouter</span>
          </button>
          <Link
            href={`/accessoires/${accessory.id}`}
            className="flex-1 btn-secondary flex items-center justify-center gap-1.5 py-2 text-xs font-semibold"
          >
            <Info size={14} />
            <span>Détails</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
