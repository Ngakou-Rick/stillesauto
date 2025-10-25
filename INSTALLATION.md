# Guide d'Installation - Stilles Auto

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- **Node.js** (version 18 ou supérieure) : [Télécharger Node.js](https://nodejs.org/)
- **npm** ou **yarn** (gestionnaire de paquets)
- Un éditeur de code (VS Code recommandé)

## 🚀 Installation

### 1. Vérifier Node.js

Ouvrez un terminal et vérifiez que Node.js est installé :

```bash
node --version
npm --version
```

### 2. Installer les dépendances

Dans le dossier du projet `stilles-auto`, exécutez :

```bash
npm install
```

Cette commande va installer toutes les dépendances nécessaires :
- Next.js 14
- React 18
- TypeScript
- TailwindCSS
- Lucide React (icônes)
- Framer Motion (animations)
- Et autres utilitaires

### 3. Lancer le serveur de développement

Une fois les dépendances installées, lancez :

```bash
npm run dev
```

Le serveur de développement démarrera sur `http://localhost:3000`

### 4. Ouvrir dans le navigateur

Ouvrez votre navigateur et accédez à :
```
http://localhost:3000
```

## 🛠️ Commandes Disponibles

```bash
# Lancer en mode développement
npm run dev

# Créer une version de production
npm run build

# Lancer la version de production
npm start

# Vérifier le code (linting)
npm run lint
```

## 📁 Structure des Fichiers

```
stilles-auto/
├── app/                    # Pages et routes
├── components/             # Composants réutilisables
├── data/                   # Données de démonstration
├── lib/                    # Utilitaires
├── types/                  # Types TypeScript
├── public/                 # Assets statiques
│   ├── cars/              # Images des véhicules
│   └── logo/              # Logos de l'entreprise
├── package.json           # Dépendances du projet
├── tailwind.config.ts     # Configuration TailwindCSS
└── tsconfig.json          # Configuration TypeScript
```

## 🎨 Personnalisation

### Couleurs

Les couleurs sont définies dans `tailwind.config.ts` :
- **Primary** : Bleu (utilisé pour les boutons principaux)
- **Accent** : Rouge (utilisé pour les éléments d'accent)
- **Dark** : Gris foncé (utilisé pour le texte)

### Données

Les données de démonstration se trouvent dans :
- `data/vehicles.ts` : Liste des véhicules
- `data/accessories.ts` : Liste des accessoires

Vous pouvez modifier ces fichiers pour ajouter vos propres données.

## 🌐 Déploiement

### Vercel (Recommandé)

1. Créez un compte sur [Vercel](https://vercel.com)
2. Importez votre projet GitHub
3. Vercel détectera automatiquement Next.js et déploiera votre site

### Autres plateformes

Le projet peut également être déployé sur :
- Netlify
- AWS Amplify
- Digital Ocean
- Heroku

## 🔧 Résolution de Problèmes

### Erreur "Module not found"

```bash
# Supprimez node_modules et réinstallez
rm -rf node_modules
npm install
```

### Port 3000 déjà utilisé

```bash
# Utilisez un autre port
npm run dev -- -p 3001
```

### Erreurs TypeScript

```bash
# Vérifiez la configuration TypeScript
npx tsc --noEmit
```

## 📞 Support

Pour toute question ou problème :
- Email : contact@stillesauto.cm
- Téléphone : +237 123 456 789

## 🎯 Prochaines Étapes

1. **Backend** : Connecter à une API backend
2. **Base de données** : Intégrer PostgreSQL ou MongoDB
3. **Authentification** : Implémenter JWT ou OAuth
4. **Paiements** : Intégrer MTN MoMo et Orange Money
5. **Admin Panel** : Créer un tableau de bord administrateur

---

Bon développement ! 🚀
