import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo/Stilles_logo.jpg"
                  alt="Stilles Auto"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold font-display">Stilles Auto</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Votre partenaire de confiance pour la location, la vente de véhicules et l'accompagnement import/export au Cameroun.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-primary-600 hover:bg-primary-700 rounded-full flex items-center justify-center transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-600 hover:bg-primary-700 rounded-full flex items-center justify-center transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-600 hover:bg-primary-700 rounded-full flex items-center justify-center transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-600 hover:bg-primary-700 rounded-full flex items-center justify-center transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6">Liens Rapides</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/location" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Location de Véhicules
                </Link>
              </li>
              <li>
                <Link href="/vente" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Vente de Véhicules
                </Link>
              </li>
              <li>
                <Link href="/accessoires" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Accessoires Auto
                </Link>
              </li>
              <li>
                <Link href="/import-export" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Import/Export
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-gray-400 hover:text-primary-400 transition-colors">
                  À Propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-6">Nos Services</h4>
            <ul className="space-y-3">
              <li className="text-gray-400">Location courte durée</li>
              <li className="text-gray-400">Location longue durée</li>
              <li className="text-gray-400">Vente véhicules neufs</li>
              <li className="text-gray-400">Vente véhicules d'occasion</li>
              <li className="text-gray-400">Accessoires automobiles</li>
              <li className="text-gray-400">Import/Export véhicules</li>
              <li className="text-gray-400">Assistance douanière</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold">Douala</p>
                  <p className="text-gray-400 text-sm">Akwa, Boulevard de la Liberté</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-primary-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold">Yaoundé</p>
                  <p className="text-gray-400 text-sm">Bastos, Avenue Kennedy</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary-400 flex-shrink-0" size={20} />
                <a href="tel:+237123456789" className="text-gray-400 hover:text-primary-400 transition-colors">
                  +237 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary-400 flex-shrink-0" size={20} />
                <a href="mailto:contact@stillesauto.cm" className="text-gray-400 hover:text-primary-400 transition-colors">
                  contact@stillesauto.cm
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="text-primary-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-gray-400 text-sm">Lun - Sam: 8h00 - 18h00</p>
                  <p className="text-gray-400 text-sm">Dim: 9h00 - 14h00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; 2024 Stilles Auto. Tous droits réservés.</p>
            <div className="flex gap-6">
              <Link href="/mentions-legales" className="hover:text-primary-400 transition-colors">
                Mentions Légales
              </Link>
              <Link href="/politique-confidentialite" className="hover:text-primary-400 transition-colors">
                Politique de Confidentialité
              </Link>
              <Link href="/cgv" className="hover:text-primary-400 transition-colors">
                CGV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
