'use client';

import { Star, Quote } from 'lucide-react';

interface Testimonial {
    id: number;
    name: string;
    location: string;
    avatar: string;
    rating: number;
    title: string;
    comment: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg h-full flex flex-col">
      <Quote className="text-primary-200 mb-4" size={40} />
      <h3 className="text-xl font-bold mb-2">{testimonial.title}</h3>
      <p className="text-gray-600 mb-6 flex-grow">
        {testimonial.comment}
      </p>
      <div className="flex items-center">
        <div className="ml-4">
          <p className="font-bold text-dark-900">{testimonial.name}</p>
          <p className="text-sm text-gray-500">{testimonial.location}</p>
        </div>
        <div className="ml-auto flex">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="text-yellow-500 fill-yellow-500" size={20} />
          ))}
        </div>
      </div>
    </div>
  );
}
