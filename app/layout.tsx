import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import AppInitializer from '@/components/AppInitializer';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: "Stilles Auto - Location & Vente de Véhicules au Cameroun",
  description: "Votre partenaire de confiance pour la location, la vente de véhicules, accessoires automobiles et l'accompagnement import/export au Cameroun.",
  keywords: "location voiture Cameroun, vente voiture Cameroun, accessoires auto, import export véhicules",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={montserrat.variable}>
        <AppInitializer />
        {children}
      </body>
    </html>
  );
}