import { FileText, Globe2, Shield, Clock, CheckCircle, ArrowRight, Package, Truck, FileCheck } from 'lucide-react';
import Link from 'next/link';

export default function ImportExportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="gradient-bg text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display">
            Import/Export de Véhicules
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Nous vous accompagnons dans toutes vos démarches d'importation et d'exportation de véhicules au Cameroun
          </p>
        </div>
      </div>

      {/* Services Overview */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Nos Services d'Accompagnement</h2>
            <p className="section-subtitle">
              Un service complet pour simplifier vos démarches
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe2 className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Recherche de Véhicules</h3>
              <p className="text-gray-600">
                Nous trouvons le véhicule de vos rêves partout dans le monde
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Gestion Documentaire</h3>
              <p className="text-gray-600">
                Préparation et gestion de tous les documents nécessaires
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Dédouanement</h3>
              <p className="text-gray-600">
                Assistance complète pour les procédures douanières
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Transport & Livraison</h3>
              <p className="text-gray-600">
                Organisation du transport jusqu'à votre porte
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Notre Processus</h2>
            <p className="section-subtitle">
              Un accompagnement étape par étape pour votre tranquillité d'esprit
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="flex gap-6 mb-12">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Consultation Initiale</h3>
                <p className="text-gray-600 mb-4">
                  Nous discutons de vos besoins, de votre budget et du type de véhicule que vous recherchez. Nous vous fournissons un devis détaillé et transparent.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="text-primary-600" size={20} />
                    <span>Analyse de vos besoins</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="text-primary-600" size={20} />
                    <span>Devis personnalisé gratuit</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6 mb-12">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Recherche & Sélection</h3>
                <p className="text-gray-600 mb-4">
                  Notre équipe recherche le véhicule idéal selon vos critères. Nous vous présentons plusieurs options avec photos et rapports détaillés.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="text-primary-600" size={20} />
                    <span>Recherche internationale</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="text-primary-600" size={20} />
                    <span>Inspection pré-achat</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6 mb-12">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Documentation & Achat</h3>
                <p className="text-gray-600 mb-4">
                  Nous gérons toute la paperasse : contrat d'achat, certificat d'origine, facture commerciale, etc. Paiement sécurisé.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="text-primary-600" size={20} />
                    <span>Préparation des documents</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="text-primary-600" size={20} />
                    <span>Transaction sécurisée</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-6 mb-12">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Expédition & Dédouanement</h3>
                <p className="text-gray-600 mb-4">
                  Organisation du transport maritime ou aérien. Gestion complète des formalités douanières au Cameroun.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="text-primary-600" size={20} />
                    <span>Transport international</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="text-primary-600" size={20} />
                    <span>Dédouanement complet</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  5
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Livraison & Immatriculation</h3>
                <p className="text-gray-600 mb-4">
                  Livraison de votre véhicule à l'adresse de votre choix. Assistance pour l'immatriculation et la mise en circulation.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="text-primary-600" size={20} />
                    <span>Livraison à domicile</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="text-primary-600" size={20} />
                    <span>Aide à l'immatriculation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Required */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Documents Nécessaires</h2>
            <p className="section-subtitle">
              Liste des documents requis pour l'importation au Cameroun
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FileCheck className="text-primary-600 mb-4" size={32} />
              <h3 className="font-bold mb-2">Pièce d'identité</h3>
              <p className="text-gray-600 text-sm">Carte nationale d'identité ou passeport valide</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <FileCheck className="text-primary-600 mb-4" size={32} />
              <h3 className="font-bold mb-2">Facture commerciale</h3>
              <p className="text-gray-600 text-sm">Facture d'achat du véhicule</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <FileCheck className="text-primary-600 mb-4" size={32} />
              <h3 className="font-bold mb-2">Certificat d'origine</h3>
              <p className="text-gray-600 text-sm">Document attestant l'origine du véhicule</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <FileCheck className="text-primary-600 mb-4" size={32} />
              <h3 className="font-bold mb-2">Titre de propriété</h3>
              <p className="text-gray-600 text-sm">Document prouvant la propriété du véhicule</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <FileCheck className="text-primary-600 mb-4" size={32} />
              <h3 className="font-bold mb-2">Connaissement</h3>
              <p className="text-gray-600 text-sm">Bill of Lading pour le transport maritime</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <FileCheck className="text-primary-600 mb-4" size={32} />
              <h3 className="font-bold mb-2">Certificat de conformité</h3>
              <p className="text-gray-600 text-sm">Attestation de conformité aux normes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
            Prêt à Importer Votre Véhicule ?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour obtenir un devis gratuit et personnalisé
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary bg-white text-primary-900 hover:bg-gray-100 text-lg px-10 py-4">
              Demander un Devis
            </Link>
            <Link href="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-primary-900 text-lg px-10 py-4">
              Nous Contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
