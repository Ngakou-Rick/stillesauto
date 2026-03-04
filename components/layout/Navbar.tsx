'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ShoppingCart, User, Globe, Phone, Mail, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth.store';
import { useCartStore } from '@/store/cart.store';
import { useRouter } from 'next/navigation';

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Location', href: '/location' },
  { name: 'Vente', href: '/vente' },
  { name: 'Accessoires', href: '/accessoires' },
  { name: 'Import/Export', href: '/import-export' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('FR');

  const { isAuthenticated, user, logout } = useAuthStore();
  const itemCount = useCartStore((state) => state.itemCount());
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push('/');
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-dark-900 text-white py-2 hidden md:block">
        <div className="container-custom">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+237123456789" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                <Phone size={16} />
                <span>+237 123 456 789</span>
              </a>
              <a href="mailto:contact@stillesauto.cm" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                <Mail size={16} />
                <span>contact@stillesauto.cm</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setLanguage(language === 'FR' ? 'EN' : 'FR')}
                className="flex items-center gap-2 hover:text-primary-400 transition-colors"
              >
                <Globe size={16} />
                <span>{language}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white shadow-lg'
            : 'bg-white/95 backdrop-blur-sm'
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo/Stilles_logo.jpg"
                  alt="Stilles Auto"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold font-display gradient-text">
                  Stilles Auto
                </h1>
                <p className="text-xs text-gray-600">Votre partenaire mobilité</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-dark-700 hover:text-primary-600 font-medium transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">

              {/* Panier */}
              <Link
                href="/panier"
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ShoppingCart className="text-dark-700" size={24} />
                {itemCount > 0 ? (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                ) : (
                  <span className="absolute -top-1 -right-1 bg-accent-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    0
                  </span>
                )}
              </Link>

              {/* Auth — Desktop */}
              {isAuthenticated ? (
                <div className="hidden md:flex items-center gap-3">
                  <Link
                    href="/compte"
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <User size={20} />
                    <span>{user?.firstName}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Se déconnecter"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <User size={20} />
                  <span>Connexion</span>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="text-dark-700" size={24} />
                ) : (
                  <Menu className="text-dark-700" size={24} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t animate-slide-down">
            <div className="container-custom py-4">
              <div className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-dark-700 hover:text-primary-600 font-medium py-2 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Auth — Mobile */}
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/compte"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors justify-center"
                    >
                      <User size={20} />
                      <span>{user?.firstName} — Mon Compte</span>
                    </Link>
                    <button
                      onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                      className="flex items-center gap-2 px-4 py-3 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-colors justify-center"
                    >
                      <LogOut size={20} />
                      <span>Se déconnecter</span>
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors justify-center"
                  >
                    <User size={20} />
                    <span>Connexion</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}