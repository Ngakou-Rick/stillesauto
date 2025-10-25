# 🚀 Démarrage Rapide - Stilles Auto

## Installation en 3 étapes

### 1️⃣ Installer les dépendances
```bash
cd stilles-auto
npm install
```

### 2️⃣ Lancer le serveur
```bash
npm run dev
```

### 3️⃣ Ouvrir dans le navigateur
```
http://localhost:3000
```

## ✨ Fonctionnalités Disponibles

### 🏠 Page d'Accueil
- **Carrousel Hero** avec 4 slides qui défilent automatiquement toutes les 5 secondes
- **Section Services** présentant les 4 services principaux
- **Véhicules en Vedette** avec 6 véhicules sélectionnés
- **Section "Pourquoi nous choisir"** avec 4 avantages
- **Accessoires Populaires** avec 4 produits mis en avant
- **Call-to-Action** pour encourager les conversions

### 🚗 Page Location (`/location`)
- Catalogue de véhicules disponibles à la location
- **Filtres avancés** : catégorie, carburant, transmission, prix
- **Barre de recherche** par marque/modèle
- Affichage du prix de location par jour
- Boutons "Ajouter" et "Détails"

### 💰 Page Vente (`/vente`)
- Catalogue de véhicules à vendre
- Mêmes filtres que la location
- Affichage du prix de vente
- Navigation vers les détails

### 🛍️ Page Accessoires (`/accessoires`)
- Catalogue d'accessoires automobiles
- Filtres par catégorie et prix
- Indication du stock disponible
- Badge "Stock limité" pour les produits < 10 unités

### 🌍 Page Import/Export (`/import-export`)
- Présentation des services d'accompagnement
- **Processus en 5 étapes** détaillé
- Liste des documents nécessaires
- Formulaire de demande de devis

### 📞 Page Contact (`/contact`)
- Informations des agences (Douala & Yaoundé)
- **Formulaire de contact** complet
- Horaires d'ouverture
- Carte (placeholder pour Google Maps)

### 🔍 Pages Détails
- **Véhicule** (`/vehicules/[id]`) :
  - Galerie d'images avec navigation
  - Spécifications techniques complètes
  - Liste des équipements
  - **Système d'avis** avec notation 5 étoiles
  - Formulaire pour laisser un avis
  - Carte de réservation sticky

- **Accessoire** (`/accessoires/[id]`) :
  - Image du produit
  - Informations détaillées
  - **Sélecteur de quantité**
  - Calcul du prix total
  - Système d'avis identique

### 🛒 Page Panier (`/panier`)
- Liste des articles ajoutés
- Modification de la quantité
- Suppression d'articles
- **Calcul automatique** : sous-total, livraison, total
- Livraison gratuite dès 50,000 XAF
- Modes de paiement acceptés

### 👤 Page Compte (`/compte`)
- Profil utilisateur
- Mes commandes
- Mes locations
- Mes favoris
- Paramètres et notifications

## 🎨 Design & UX

### Palette de Couleurs
- **Primary (Bleu)** : `#0284c7` - Boutons principaux, liens
- **Accent (Rouge)** : `#dc2626` - Éléments d'accent, badges
- **Dark** : `#0f172a` - Texte, footer

### Typographie
- **Titres** : Montserrat (Bold, 700-900)
- **Corps** : Inter (Regular, 400-600)

### Animations
- Transitions fluides (300ms)
- Hover effects sur les cards
- Carousel avec fade et scale
- Scroll indicator animé

### Responsive
- **Mobile First** : Optimisé pour mobile
- **Breakpoints** :
  - Mobile : < 768px
  - Tablet : 768px - 1024px
  - Desktop : > 1024px

## 📊 Données de Démonstration

### Véhicules (12 au total)
- Toyota Camry 2023 (Hybride)
- Range Rover Sport 2022 (SUV)
- Mercedes-Benz C-Class 2023 (Luxe)
- Toyota Hilux 2023 (Pick-up)
- BMW X5 2022 (SUV)
- Hyundai Tucson 2023 (SUV)
- Audi A6 2022 (Luxe)
- Ford Ranger 2023 (Pick-up)
- Nissan Patrol 2022 (SUV)
- Volkswagen Golf 2023 (Berline)
- Lexus RX 350 2022 (Luxe)
- Peugeot 3008 2023 (SUV)

### Accessoires (12 au total)
- Tapis de sol premium
- Dashcam Full HD
- Housse de siège en cuir
- Kit d'éclairage LED
- Chargeur USB rapide
- Organisateur de coffre
- Kit de nettoyage auto
- Support téléphone magnétique
- Extincteur portable
- Déflecteurs de fenêtre
- Compresseur d'air portable
- Alarme antivol

## 🔧 Personnalisation Rapide

### Modifier les couleurs
Éditez `tailwind.config.ts` :
```typescript
colors: {
  primary: { 600: '#VOTRE_COULEUR' },
  accent: { 600: '#VOTRE_COULEUR' },
}
```

### Ajouter des véhicules
Éditez `data/vehicles.ts` et ajoutez un objet Vehicle.

### Ajouter des accessoires
Éditez `data/accessories.ts` et ajoutez un objet Accessory.

### Modifier le logo
Remplacez les fichiers dans `public/logo/`.

### Ajouter des images
Placez vos images dans `public/cars/` ou `public/accessories/`.

## 📱 Fonctionnalités Futures

### Phase 2 - Backend
- [ ] API REST avec Node.js/Express
- [ ] Base de données PostgreSQL
- [ ] Authentification JWT
- [ ] Upload d'images

### Phase 3 - Paiements
- [ ] Intégration MTN Mobile Money
- [ ] Intégration Orange Money
- [ ] Passerelle de paiement par carte

### Phase 4 - Admin
- [ ] Dashboard administrateur
- [ ] Gestion des véhicules
- [ ] Gestion des commandes
- [ ] Statistiques et analytics

### Phase 5 - Avancé
- [ ] Notifications email/SMS
- [ ] Chat en direct
- [ ] Application mobile
- [ ] Système de réservation avancé

## 🐛 Dépannage

### Le serveur ne démarre pas
```bash
# Vérifiez Node.js
node --version  # Doit être >= 18

# Réinstallez les dépendances
rm -rf node_modules package-lock.json
npm install
```

### Les images ne s'affichent pas
- Vérifiez que les images sont dans `public/cars/` et `public/logo/`
- Redémarrez le serveur de développement

### Erreurs TypeScript
```bash
# Vérifiez les types
npm run build
```

## 📞 Besoin d'Aide ?

- 📧 Email : contact@stillesauto.cm
- 📱 Téléphone : +237 123 456 789
- 🌐 Site : www.stillesauto.cm (à venir)

---

**Bon développement ! 🎉**
