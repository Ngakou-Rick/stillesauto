'use client';

import { useState, useEffect } from 'react';
import TestimonialCard from './TestimonialCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
    {
      id: 1,
      name: "Jean Dupont",
      location: "Douala",
      avatar: "/images/avatars/avatar-1.jpg",
      rating: 5,
      title: "Service de location impeccable !",
      comment: "J'ai loué un SUV pour un week-end en famille. Le véhicule était en parfait état, propre et très confortable. Le processus de réservation était simple et rapide. Je recommande vivement !"
    },
    {
      id: 2,
      name: "Marie Dubois",
      location: "Yaoundé",
      avatar: "/images/avatars/avatar-2.jpg",
      rating: 5,
      title: "Achat d'une berline d'occasion",
      comment: "J'ai acheté une voiture d'occasion chez Stilles Auto et je suis très satisfaite. Le véhicule a été inspecté et certifié, et le prix était très compétitif. Le personnel était professionnel et serviable."
    },
    {
      id: 3,
      name: "Pierre Martin",
      location: "Bafoussam",
      avatar: "/images/avatars/avatar-3.jpg",
      rating: 4,
      title: "Importation facile et rapide",
      comment: "Grâce à Stilles Auto, j'ai pu importer le véhicule de mes rêves sans tracas. Ils se sont occupés de toutes les démarches administratives, de l'achat à la livraison. Un service clé en main que j'apprécie."
    },
    {
      id: 4,
      name: "Sophie N'jie",
      location: "Kribi",
      avatar: "/images/avatars/avatar-4.jpg",
      rating: 5,
      title: "Accessoires de qualité",
      comment: "J'ai trouvé tous les accessoires dont j'avais besoin pour personnaliser ma voiture. La qualité est au rendez-vous et les prix sont abordables. Je suis très contente de mes achats."
    },
    {
      id: 5,
      name: "Ahmed Bello",
      location: "Garoua",
      avatar: "/images/avatars/avatar-5.jpg",
      rating: 5,
      title: "Une expérience client exceptionnelle",
      comment: "Le service client est tout simplement excellent. Ils sont à l'écoute, réactifs et toujours prêts à aider. J'ai été très bien conseillé pour le choix de mon véhicule de location."
    },
    {
      id: 6,
      name: "Chloé Kamga",
      location: "Limbé",
      avatar: "/images/avatars/avatar-6.jpg",
      rating: 4,
      title: "Fiabilité et confiance",
      comment: "Je loue régulièrement des véhicules chez Stilles Auto pour mes déplacements professionnels. Je n'ai jamais eu de problème. C'est une entreprise fiable et digne de confiance."
    }
  ];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-play carousel
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [autoPlay]);

  const handlePrev = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

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

        {/* Carousel Container */}
        <div className="relative">
          {/* Testimonials Display */}
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-out">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`w-full flex-shrink-0 transition-opacity duration-500 ${
                    index === currentIndex ? 'opacity-100' : 'opacity-0 absolute'
                  }`}
                >
                  <div className="max-w-2xl mx-auto">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 md:-translate-x-20 w-12 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-20 w-12 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoPlay(false);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
