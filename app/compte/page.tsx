'use client';

import { useState } from 'react';
import { User, ShoppingBag, Car, FileText, Settings, LogOut, Heart } from 'lucide-react';

export default function ComptePage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'rentals' | 'favorites' | 'settings'>('profile');

  const tabs = [
    { id: 'profile', label: 'Mon Profil', icon: User },
    { id: 'orders', label: 'Mes Commandes', icon: ShoppingBag },
    { id: 'rentals', label: 'Mes Locations', icon: Car },
    { id: 'favorites', label: 'Mes Favoris', icon: Heart },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="gradient-bg text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">
            Mon Compte
          </h1>
          <p className="text-xl text-white/90">
            Gérez vos informations et suivez vos commandes
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              {/* User Info */}
              <div className="text-center mb-6 pb-6 border-b">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={48} className="text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-1">Jean Dupont</h3>
                <p className="text-gray-600 text-sm">jean.dupont@email.com</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut size={20} />
                  <span className="font-medium">Déconnexion</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-3xl font-bold mb-8">Mon Profil</h2>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Prénom</label>
                        <input
                          type="text"
                          defaultValue="Jean"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Nom</label>
                        <input
                          type="text"
                          defaultValue="Dupont"
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="jean.dupont@email.com"
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Téléphone</label>
                      <input
                        type="tel"
                        defaultValue="+237 123 456 789"
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Adresse</label>
                      <textarea
                        rows={3}
                        defaultValue="Akwa, Douala, Cameroun"
                        className="input-field resize-none"
                      />
                    </div>

                    <button type="submit" className="btn-primary">
                      Enregistrer les Modifications
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-3xl font-bold mb-8">Mes Commandes</h2>
                  <div className="text-center py-12">
                    <ShoppingBag size={64} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Aucune commande pour le moment</p>
                  </div>
                </div>
              )}

              {activeTab === 'rentals' && (
                <div>
                  <h2 className="text-3xl font-bold mb-8">Mes Locations</h2>
                  <div className="text-center py-12">
                    <Car size={64} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Aucune location en cours</p>
                  </div>
                </div>
              )}

              {activeTab === 'favorites' && (
                <div>
                  <h2 className="text-3xl font-bold mb-8">Mes Favoris</h2>
                  <div className="text-center py-12">
                    <Heart size={64} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Aucun favori enregistré</p>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-3xl font-bold mb-8">Paramètres</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-4">Notifications</h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-600 rounded" />
                          <span>Recevoir les offres promotionnelles</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-600 rounded" />
                          <span>Notifications de nouvelles locations</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
                          <span>Newsletter hebdomadaire</span>
                        </label>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="text-xl font-bold mb-4">Sécurité</h3>
                      <button className="btn-secondary">
                        Changer le Mot de Passe
                      </button>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="text-xl font-bold mb-4 text-red-600">Zone de Danger</h3>
                      <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors">
                        Supprimer mon Compte
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
