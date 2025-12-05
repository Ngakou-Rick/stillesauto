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

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, testimonials.length - itemsPerView);
        return prev === maxIndex ? 0 : prev + 1;
      });
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [autoPlay, itemsPerView]);

  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const handlePrev = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + itemsPerView
  );

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
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          {/* Navigation Buttons */}
          {testimonials.length > itemsPerView && (
            <div className="flex justify-center gap-4 mt-12">
              <button
                onClick={handlePrev}
                className="w-12 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label="Previous testimonials"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label="Next testimonials"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(Math.ceil(testimonials.length / itemsPerView))].map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setCurrentIndex(Math.min(index * itemsPerView, maxIndex))
                  }
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / itemsPerView) === index
                      ? 'bg-primary-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonials page ${index + 1}`}
                />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
