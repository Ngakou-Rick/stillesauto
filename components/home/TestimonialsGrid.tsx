'use client';

import TestimonialCard from './TestimonialCard';
import { testimonials } from '@/data/testimonials';

export default function TestimonialsGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">Ce que Disent Nos Clients</h2>
          <p className="section-subtitle">
            Découvrez les avis de nos clients satisfaits à travers le Cameroun
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
