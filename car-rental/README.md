# Stilles Auto - Vehicle Rental & Sales Platform

Une plateforme complète pour la gestion de location et vente de véhicules, ainsi que la vente d'accessoires et l'import-export de véhicules.

## 🚀 Fonctionnalités

### Gestion des Utilisateurs
- Inscription et connexion sécurisées avec JWT
- Gestion des profils utilisateurs
- Trois rôles : ADMIN, EMPLOYEE, CLIENT
- Authentification basée sur les rôles

### Gestion des Véhicules
- Catalogue complet des véhicules
- Recherche avancée par marque, modèle, type
- Gestion du statut (disponible, loué, en vente, en maintenance)
- Informations détaillées : kilométrage, carburant, couleur, photos

### Location de Véhicules
- Réservation de véhicules
- Gestion des contrats de location
- Suivi des retours et inspections
- Calcul automatique des frais supplémentaires

### Vente de Véhicules
- Mise en ligne de véhicules à vendre
- Manifestation d'intérêt des clients
- Suivi des transactions

### Accessoires
- Catalogue d'accessoires
- Commande en ligne
- Gestion du stock

### Import-Export
- Gestion des demandes d'import-export
- Suivi du processus

## 🛠️ Stack Technique

- **Framework** : Spring Boot 4.0.0
- **Language** : Java 21
- **Database** : PostgreSQL
- **Security** : Spring Security + JWT
- **Build** : Maven
- **ORM** : JPA/Hibernate

## 📋 Prérequis

- Java 21+
- PostgreSQL 12+
- Maven 3.6+

## ⚙️ Installation

### 1. Cloner le projet
```bash
git clone <repository-url>
cd stilles_auto
```

### 2. Configurer la base de données
Créer une base de données PostgreSQL :
```sql
CREATE DATABASE stilles_auto;
```

### 3. Configurer les propriétés
Éditer `src/main/resources/application.properties` :
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/stilles_auto
spring.datasource.username=postgres
spring.datasource.password=your_password
app.jwt.secret=your-secret-key-change-this-in-production
```

### 4. Construire le projet
```bash
mvn clean install
```

### 5. Lancer l'application
```bash
mvn spring-boot:run
```

L'API sera disponible sur `http://localhost:8080`

## 📚 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion

### Véhicules
- `GET /api/vehicles` - Lister tous les véhicules
- `GET /api/vehicles/{id}` - Détails d'un véhicule
- `GET /api/vehicles/available` - Véhicules disponibles
- `GET /api/vehicles/search?query=` - Recherche
- `POST /api/vehicles` - Créer un véhicule (ADMIN/EMPLOYEE)
- `PUT /api/vehicles/{id}` - Modifier un véhicule (ADMIN/EMPLOYEE)
- `DELETE /api/vehicles/{id}` - Supprimer un véhicule (ADMIN)

### Locations
- `GET /api/rentals` - Lister les locations (ADMIN/EMPLOYEE)
- `GET /api/rentals/{id}` - Détails d'une location
- `GET /api/rentals/client/{clientId}` - Locations d'un client
- `POST /api/rentals` - Créer une location
- `PATCH /api/rentals/{id}/status` - Mettre à jour le statut

### Ventes
- `GET /api/sales` - Lister les ventes
- `GET /api/sales/{id}` - Détails d'une vente
- `GET /api/sales/vehicle/{vehicleId}` - Ventes d'un véhicule
- `POST /api/sales` - Créer une vente (ADMIN/EMPLOYEE)
- `POST /api/sales/{id}/interested` - Manifester son intérêt

### Accessoires
- `GET /api/accessories` - Lister les accessoires
- `GET /api/accessories/{id}` - Détails d'un accessoire
- `GET /api/accessories/active` - Accessoires actifs
- `POST /api/accessories` - Créer un accessoire (ADMIN/EMPLOYEE)
- `PUT /api/accessories/{id}` - Modifier un accessoire (ADMIN/EMPLOYEE)
- `DELETE /api/accessories/{id}` - Supprimer un accessoire (ADMIN)

## 🔐 Sécurité

- Authentification JWT
- Chiffrement des mots de passe avec BCrypt
- Contrôle d'accès basé sur les rôles (RBAC)
- CORS configuré
- Protection contre les attaques courantes

## 📊 Structure du Projet

```
src/main/java/com/stilles/stilles_auto/
├── entity/              # Entités JPA
├── repository/          # Repositories Spring Data
├── service/             # Services métier
├── controller/          # Contrôleurs REST
├── dto/                 # Data Transfer Objects
├── security/            # Configuration de sécurité
├── config/              # Configurations Spring
└── StillesAutoApplication.java
```

## 🔄 Flux de Travail

### Location
1. Client recherche un véhicule
2. Client crée une réservation
3. Employé confirme la réservation
4. Client récupère le véhicule
5. Client retourne le véhicule
6. Inspection et calcul des frais
7. Clôture de la location

### Vente
1. Employé ajoute un véhicule à la vente
2. Client manifeste son intérêt
3. Négociation
4. Finalisation de la vente

## 📝 Notes de Développement

- Les timestamps sont gérés automatiquement (createdAt, updatedAt)
- Les enums sont utilisés pour les statuts
- Les relations sont lazy-loaded pour la performance
- Validation des données avec Jakarta Validation

## 🚀 Déploiement

Pour déployer en production :

1. Générer une clé JWT sécurisée
2. Configurer les variables d'environnement
3. Utiliser un fichier `application-prod.properties`
4. Activer HTTPS
5. Configurer les CORS appropriés

## 📞 Support

Pour toute question ou problème, veuillez créer une issue dans le repository.

## 📄 Licence

Ce projet est sous licence propriétaire.
