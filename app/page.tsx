'use client';

import { useEffect, useState } from 'react';
import HeroCarousel from '@/components/home/HeroCarousel';
import VehicleCard from '@/components/vehicles/VehicleCard';
import AccessoryCard from '@/components/accessories/AccessoryCard';
import TestimonialsGrid from '@/components/home/TestimonialsGrid';
import { getVehicles, getAccessories } from '@/lib/api';
import { Vehicle, Accessory } from '@/types';
import Link from 'next/link';
import { Car, ShoppingBag, Globe2, Shield, Clock, Award, ArrowRight, CheckCircle } from 'lucide-react';

export default function Home() {
  const [featuredVehicles, setFeaturedVehicles] = useState<Vehicle[]>([]);
  const [featuredAccessories, setFeaturedAccessories] = useState<Accessory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vehiclesData, accessoriesData] = await Promise.all([
          getVehicles(),
          getAccessories(),
        ]);
        setFeaturedVehicles(vehiclesData.slice(0, 6));
        setFeaturedAccessories(accessoriesData.slice(0, 4));
      } catch (err) {
        setError("Impossible de charger les données. Veuillez réessayer plus tard.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Nos Services</h2>
            <p className="section-subtitle">
              Une gamme complète de services pour répondre à tous vos besoins automobiles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors">
                <Car className="text-primary-600 group-hover:text-white transition-colors" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Location de Véhicules</h3>
              <p className="text-gray-600 mb-4">
                Large choix de véhicules pour tous vos déplacements, courte ou longue durée.
              </p>
              <Link href="/location" className="text-primary-600 font-semibold flex items-center gap-2 group-hover:gap-4 transition-all">
                En savoir plus <ArrowRight size={18} />
              </Link>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-accent-600 transition-colors">
                <ShoppingBag className="text-accent-600 group-hover:text-white transition-colors" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Vente de Véhicules</h3>
              <p className="text-gray-600 mb-4">
                Véhicules neufs et d'occasion certifiés, garantis et au meilleur prix.
              </p>
              <Link href="/vente" className="text-primary-600 font-semibold flex items-center gap-2 group-hover:gap-4 transition-all">
                En savoir plus <ArrowRight size={18} />
              </Link>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors">
                <Globe2 className="text-primary-600 group-hover:text-white transition-colors" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Import/Export</h3>
              <p className="text-gray-600 mb-4">
                Accompagnement complet pour l'importation et l'exportation de véhicules.
              </p>
              <Link href="/import-export" className="text-primary-600 font-semibold flex items-center gap-2 group-hover:gap-4 transition-all">
                En savoir plus <ArrowRight size={18} />
              </Link>
            </div>

            {/* Service 4 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-accent-600 transition-colors">
                <ShoppingBag className="text-accent-600 group-hover:text-white transition-colors" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Accessoires Auto</h3>
              <p className="text-gray-600 mb-4">
                Large gamme d'accessoires de qualité pour personnaliser votre véhicule.
              </p>
              <Link href="/accessoires" className="text-primary-600 font-semibold flex items-center gap-2 group-hover:gap-4 transition-all">
                En savoir plus <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-20">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="section-title">Véhicules en Vedette</h2>
              <p className="section-subtitle text-left">
                Découvrez notre sélection de véhicules disponibles à la location et à la vente
              </p>
            </div>
            <Link href="/vente" className="btn-primary hidden md:flex items-center gap-2">
              Voir tout <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

          <div className="text-center mt-12 md:hidden">
            <Link href="/vente" className="btn-primary inline-flex items-center gap-2">
              Voir tous les véhicules <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 gradient-bg text-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
              Pourquoi Choisir Stilles Auto ?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Votre satisfaction est notre priorité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Fiabilité</h3>
              <p className="text-white/80">
                Véhicules régulièrement entretenus et contrôlés pour votre sécurité
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Disponibilité</h3>
              <p className="text-white/80">
                Service client disponible 7j/7 pour répondre à vos besoins
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <Award size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Qualité</h3>
              <p className="text-white/80">
                Sélection rigoureuse de véhicules et accessoires de qualité supérieure
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Transparence</h3>
              <p className="text-white/80">
                Prix clairs, sans frais cachés, pour une expérience en toute confiance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Accessories */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="section-title">Accessoires Populaires</h2>
              <p className="section-subtitle text-left">
                Équipez votre véhicule avec nos accessoires de qualité
              </p>
            </div>
            <Link href="/accessoires" className="btn-primary hidden md:flex items-center gap-2">
              Voir tout <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredAccessories.map((accessory) => (
              <AccessoryCard key={accessory.id} accessory={accessory} />
            ))}
          </div>

          <div className="text-center mt-12 md:hidden">
            <Link href="/accessoires" className="btn-primary inline-flex items-center gap-2">
              Voir tous les accessoires <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsGrid />

      {/* CTA Section */}
      <section className="py-20 bg-dark-900 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
            Prêt à Démarrer Votre Aventure ?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour trouver le véhicule parfait ou pour toute question sur nos services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-lg px-10 py-4">
              Nous Contacter
            </Link>
            <Link href="/location" className="btn-secondary text-lg px-10 py-4 bg-transparent border-white text-white hover:bg-white hover:text-dark-900">
              Louer un Véhicule
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
