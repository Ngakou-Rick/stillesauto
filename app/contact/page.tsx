'use client';

import { useState } from 'react';
import { contactService } from '@/lib/services/contact.service';
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await contactService.sendMessage(form);
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-blue-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-blue-200 text-lg">
            Notre équipe est disponible pour répondre à toutes vos questions
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Infos contact */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Nos coordonnées</h2>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex items-start gap-4">
              <div className="bg-blue-50 p-3 rounded-xl flex-shrink-0">
                <Phone size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Téléphone</p>
                <a href="tel:+237123456789" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">
                  +237 123 456 789
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-50 p-3 rounded-xl flex-shrink-0">
                <Mail size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Email</p>
                <a href="mailto:contact@stillesauto.cm" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">
                  contact@stillesauto.cm
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-50 p-3 rounded-xl flex-shrink-0">
                <MapPin size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Adresse</p>
                <p className="text-gray-500 text-sm">Yaoundé, Cameroun</p>
              </div>
            </div>
          </div>

          {/* Horaires */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Horaires d'ouverture</h3>
            <div className="space-y-2 text-sm">
              {[
                { jour: 'Lundi — Vendredi', heure: '8h00 — 18h00' },
                { jour: 'Samedi', heure: '9h00 — 16h00' },
                { jour: 'Dimanche', heure: 'Fermé' },
              ].map((h) => (
                <div key={h.jour} className="flex justify-between">
                  <span className="text-gray-500">{h.jour}</span>
                  <span className={`font-medium ${h.heure === 'Fermé' ? 'text-red-500' : 'text-gray-900'}`}>
                    {h.heure}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Envoyer un message</h2>

            {/* Succès */}
            {success && (
              <div className="flex items-center gap-3 bg-green-50 text-green-700 px-4 py-4 rounded-xl mb-6 border border-green-100">
                <CheckCircle size={20} />
                <div>
                  <p className="font-semibold">Message envoyé !</p>
                  <p className="text-sm">Nous vous répondrons dans les plus brefs délais.</p>
                </div>
              </div>
            )}

            {/* Erreur */}
            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-6 border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jean Dupont"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="vous@exemple.com"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone <span className="text-gray-400 font-normal">(optionnel)</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+237 6XX XXX XXX"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <option value="">Choisir un sujet</option>
                    <option value="Location">Location de véhicule</option>
                    <option value="Vente">Achat de véhicule</option>
                    <option value="Accessoires">Accessoires</option>
                    <option value="Import/Export">Import / Export</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre demande..."
                  required
                  rows={5}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading
                  ? <><Loader2 size={18} className="animate-spin" /> Envoi en cours...</>
                  : <><Send size={18} /> Envoyer le message</>
                }
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}