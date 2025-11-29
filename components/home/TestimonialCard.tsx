'use client';

import { Testimonial } from '@/data/testimonials';
import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-primary-600 p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      {/* Quote Icon */}
      <div className="mb-4">
        <Quote className="text-primary-600 opacity-40" size={40} />
      </div>

      {/* Comment */}
      <p className="text-gray-700 text-base italic mb-6 leading-relaxed flex-grow">
        &quot;{testimonial.comment}&quot;
      </p>

      {/* Divider */}
      <div className="border-t border-gray-200 my-4" />

      {/* Author & Source */}
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-dark-900 text-sm">{testimonial.name}</p>
          <p className="text-xs text-primary-600 font-medium">{testimonial.source}</p>
        </div>
        {/* Rating */}
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={
                i < Math.floor(testimonial.rating)
                  ? 'text-yellow-500 fill-yellow-500'
                  : 'text-gray-300'
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
