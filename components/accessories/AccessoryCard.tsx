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
    <div className="card group">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <Package size={80} className="text-gray-300" />
        </div>
        {/* Stock Badge */}
        {isLowStock && (
          <div className="absolute top-4 left-4">
            <span className="bg-accent-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Stock limité
            </span>
          </div>
        )}
        {/* Rating */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
          <Star className="text-yellow-500 fill-yellow-500" size={16} />
          <span className="font-semibold text-sm">{accessory.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Brand */}
        <p className="text-sm text-primary-600 font-semibold mb-1">
          {accessory.brand}
        </p>

        {/* Title */}
        <h3 className="text-lg font-bold text-dark-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
          {accessory.name}
        </h3>
        
        {/* Category */}
        <p className="text-gray-600 mb-3 text-sm capitalize">
          {accessory.category.replace('_', ' ')}
        </p>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {accessory.description}
        </p>

        {/* Stock Info */}
        <div className="flex items-center gap-2 mb-4">
          <Package size={16} className="text-gray-500" />
          <span className={`text-sm ${isLowStock ? 'text-accent-600 font-semibold' : 'text-gray-600'}`}>
            {accessory.stock} en stock
          </span>
        </div>

        {/* Price */}
        <div className="border-t pt-4 mb-4">
          <p className="text-2xl font-bold text-primary-600">
            {formatPrice(accessory.price)}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button 
            className="flex-1 btn-primary flex items-center justify-center gap-2 py-2"
            disabled={accessory.stock === 0}
          >
            <ShoppingCart size={18} />
            <span>Ajouter</span>
          </button>
          <Link
            href={`/accessoires/${accessory.id}`}
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
