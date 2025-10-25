# Stilles Auto - Plateforme de Location et Vente de Véhicules

Une plateforme web moderne et professionnelle pour la location, la vente de véhicules, accessoires automobiles et l'accompagnement import/export au Cameroun.

## 🚀 Fonctionnalités

### Gestion des Véhicules
- **Catalogue complet** avec recherche et filtrage avancés
- **Location** : Réservation en ligne avec calendrier de disponibilité
- **Vente** : Véhicules neufs et d'occasion avec fiches détaillées
- **Système d'avis** : Les clients peuvent noter et commenter

### E-commerce Accessoires
- Catalogue d'accessoires automobiles
- Panier d'achat intégré
- Gestion des stocks en temps réel
- Système de notation et avis

### Import/Export
- Accompagnement complet pour l'importation/exportation
- Gestion documentaire
- Suivi de dossier en ligne
- Informations sur les procédures douanières

### Espace Client
- Tableau de bord personnel
- Historique des locations et achats
- Gestion des favoris
- Suivi des commandes

## 🛠️ Technologies Utilisées

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript
- **Styling** : TailwindCSS
- **Icônes** : Lucide React
- **Animations** : Framer Motion
- **Utilitaires** : clsx, tailwind-merge

## 📦 Installation

1. **Installer les dépendances** :
```bash
npm install
```

2. **Lancer le serveur de développement** :
```bash
npm run dev
```

3. **Ouvrir dans le navigateur** :
```
http://localhost:3000
```

## 🏗️ Structure du Projet

```
stilles-auto/
├── app/                      # Pages et routes Next.js
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Page d'accueil
│   ├── location/            # Page location
│   ├── vente/               # Page vente
│   ├── accessoires/         # Page accessoires
│   ├── import-export/       # Page import/export
│   ├── contact/             # Page contact
│   ├── panier/              # Page panier
│   ├── compte/              # Page compte utilisateur
│   └── vehicules/[id]/      # Page détails véhicule
├── components/              # Composants réutilisables
│   ├── layout/             # Navbar, Footer
│   ├── home/               # Composants page d'accueil
│   ├── vehicles/           # Composants véhicules
│   └── accessories/        # Composants accessoires
├── data/                    # Données de démonstration
│   ├── vehicles.ts
│   └── accessories.ts
├── lib/                     # Utilitaires
│   └── utils.ts
├── types/                   # Définitions TypeScript
│   └── index.ts
└── public/                  # Assets statiques
    ├── cars/               # Images véhicules
    └── logo/               # Logos entreprise
```

## 🎨 Design

Le design suit une approche moderne et professionnelle avec :
- **Palette de couleurs** : Bleu primaire, rouge accent, gris foncé
- **Typographie** : Inter (corps), Montserrat (titres)
- **Composants** : Cards avec hover effects, animations fluides
- **Responsive** : Optimisé pour mobile, tablette et desktop

## 🌍 Localisation

- Interface en **Français** (langue principale)
- Support prévu pour l'**Anglais**
- Devise : **XAF** (Franc CFA)

## 💳 Paiements

Modes de paiement prévus :
- Cartes bancaires (Visa, MasterCard)
- MTN Mobile Money
- Orange Money

## 📱 Pages Principales

1. **Accueil** : Hero carousel, services, véhicules vedettes
2. **Location** : Catalogue avec filtres avancés
3. **Vente** : Véhicules à vendre avec recherche
4. **Accessoires** : Boutique e-commerce
5. **Import/Export** : Informations et demande de devis
6. **Contact** : Formulaire et informations de contact
7. **Détails Véhicule/Accessoire** : Fiche complète avec avis
8. **Panier** : Gestion des achats
9. **Compte** : Espace client personnel

## 🚧 Développement Futur

- [ ] Backend API (Node.js/Express ou Django)
- [ ] Base de données (PostgreSQL/MongoDB)
- [ ] Authentification (JWT/OAuth)
- [ ] Système de paiement en ligne
- [ ] Notifications email/SMS
- [ ] Chat en direct
- [ ] Panel d'administration
- [ ] Application mobile (React Native)

## 📄 License

© 2024 Stilles Auto. Tous droits réservés.

## 👥 Contact

- **Email** : contact@stillesauto.cm
- **Téléphone** : +237 123 456 789
- **Adresse** : Douala & Yaoundé, Cameroun
