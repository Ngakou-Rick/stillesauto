'use client';

import TestimonialCard from './TestimonialCard';

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
