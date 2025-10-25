'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="gradient-bg text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display">
            Contactez-Nous
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Notre équipe est à votre écoute pour répondre à toutes vos questions
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Douala Office */}
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Douala</h3>
              <p className="text-gray-600 mb-2">Akwa, Boulevard de la Liberté</p>
              <p className="text-gray-600">Face à l'Hôtel Akwa Palace</p>
            </div>

            {/* Yaoundé Office */}
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Yaoundé</h3>
              <p className="text-gray-600 mb-2">Bastos, Avenue Kennedy</p>
              <p className="text-gray-600">Près de l'Ambassade de France</p>
            </div>

            {/* Phone */}
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Téléphone</h3>
              <p className="text-gray-600 mb-2">+237 123 456 789</p>
              <p className="text-gray-600">+237 987 654 321</p>
            </div>

            {/* Email */}
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Email</h3>
              <p className="text-gray-600 mb-2">contact@stillesauto.cm</p>
              <p className="text-gray-600">info@stillesauto.cm</p>
            </div>
          </div>

          {/* Contact Form & Hours */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold mb-6">Envoyez-nous un Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">
                      Nom Complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="+237 XXX XXX XXX"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                      Sujet *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="location">Location de véhicule</option>
                      <option value="vente">Achat de véhicule</option>
                      <option value="accessoires">Accessoires</option>
                      <option value="import-export">Import/Export</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="input-field resize-none"
                    placeholder="Décrivez votre demande..."
                  />
                </div>

                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                  <Send size={20} />
                  <span>Envoyer le Message</span>
                </button>
              </form>
            </div>

            {/* Business Hours & Map */}
            <div className="space-y-8">
              {/* Business Hours */}
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Clock className="text-primary-600" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold">Horaires</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="font-semibold">Lundi - Vendredi</span>
                    <span className="text-gray-600">8h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="font-semibold">Samedi</span>
                    <span className="text-gray-600">8h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Dimanche</span>
                    <span className="text-gray-600">9h00 - 14h00</span>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-primary-600 text-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Besoin d'Aide ?</h3>
                <p className="mb-6">
                  Notre équipe est disponible pour répondre à toutes vos questions par téléphone ou email.
                </p>
                <div className="space-y-3">
                  <a
                    href="tel:+237123456789"
                    className="block bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold text-center hover:bg-gray-100 transition-colors"
                  >
                    Appelez-nous
                  </a>
                  <a
                    href="mailto:contact@stillesauto.cm"
                    className="block bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-white/30 transition-colors"
                  >
                    Envoyez un Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Nos Agences</h2>
            <p className="section-subtitle">
              Visitez-nous dans l'une de nos agences à Douala ou Yaoundé
            </p>
          </div>
          <div className="bg-gray-200 rounded-xl overflow-hidden h-96 flex items-center justify-center">
            <p className="text-gray-600 text-lg">Carte Google Maps - Intégration à venir</p>
          </div>
        </div>
      </section>
    </div>
  );
}
