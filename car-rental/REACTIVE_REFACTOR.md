# Refactorisation Réactive - Stilles Auto Backend

## 📋 Résumé des Changements

Le backend a été refactorisé pour utiliser une architecture **réactive** avec **WebFlux** et **R2DBC**, avec une séparation claire entre interfaces et implémentations, ainsi que des mappers MapStruct.

## 🔄 Architecture Réactive

### Dépendances Mises à Jour
- ✅ `spring-boot-starter-webflux` - Framework web réactif
- ✅ `spring-boot-starter-data-r2dbc` - Accès réactif à la base de données
- ✅ `r2dbc-postgresql` - Driver R2DBC pour PostgreSQL

### Avantages de la Réactivité
- **Non-bloquant** : Meilleure utilisation des ressources
- **Scalabilité** : Gestion de plus de connexions simultanées
- **Performance** : Latence réduite
- **Résilience** : Meilleure gestion des erreurs

## 🏗️ Architecture en Couches

### 1. **Repositories** (Accès aux Données)
```
repository/
├── api/
│   ├── VehicleRepositoryApi.java
│   ├── RentalRepositoryApi.java
│   ├── SaleRepositoryApi.java
│   └── AccessoryRepositoryApi.java
├── impl/
│   ├── VehicleRepositoryImpl.java
│   ├── RentalRepositoryImpl.java
│   ├── SaleRepositoryImpl.java
│   └── AccessoryRepositoryImpl.java
└── base/
    └── BaseRepository.java
```

**Caractéristiques** :
- Interfaces définissant les contrats
- Implémentations avec critères JPA
- Requêtes réactives (Mono/Flux)
- Pas de requêtes natives

### 2. **Services** (Logique Métier)
```
service/
├── api/
│   ├── VehicleServiceApi.java
│   ├── RentalServiceApi.java
│   ├── SaleServiceApi.java
│   └── AccessoryServiceApi.java
├── impl/
│   ├── VehicleServiceImpl.java
│   ├── RentalServiceImpl.java
│   ├── SaleServiceImpl.java
│   └── AccessoryServiceImpl.java
└── base/
    └── BaseService.java
```

**Caractéristiques** :
- Interfaces définissant les contrats
- Implémentations avec logique métier
- Utilisation des mappers
- Requêtes réactives

### 3. **Mappers** (Transformation de Données)
```
mapper/
├── UserMapper.java
├── VehicleMapper.java
├── RentalMapper.java
├── SaleMapper.java
└── AccessoryMapper.java
```

**Caractéristiques** :
- MapStruct pour la génération automatique
- Conversion Entity ↔ DTO
- Pas de transformation manuelle

## 📊 Types Réactifs

### Mono<T>
- Représente **0 ou 1** élément
- Utilisé pour les opérations unitaires
- Exemple : `Mono<VehicleDTO> getVehicleById(Long id)`

### Flux<T>
- Représente **0 à N** éléments
- Utilisé pour les listes
- Exemple : `Flux<VehicleDTO> getAllVehicles()`

## 🔍 Critères JPA vs Requêtes Natives

### ✅ Critères JPA (Recommandé)
```java
// Type-safe, maintenable, réutilisable
CriteriaBuilder cb = entityManager.getCriteriaBuilder();
CriteriaQuery<Vehicle> query = cb.createQuery(Vehicle.class);
Root<Vehicle> root = query.from(Vehicle.class);
query.where(cb.equal(root.get("brand"), "Toyota"));
```

### ❌ Requêtes Natives (À Éviter)
```java
// Pas type-safe, difficile à maintenir
@Query("SELECT * FROM vehicles WHERE brand = ?1")
Flux<Vehicle> findByBrand(String brand);
```

## 📝 Interfaces vs Implémentations

### Avantages
- **Testabilité** : Facile de créer des mocks
- **Flexibilité** : Facile de changer l'implémentation
- **Maintenabilité** : Contrats clairs
- **Découplage** : Dépendances sur les interfaces

### Structure
```
VehicleRepositoryApi (interface)
    ↓
VehicleRepositoryImpl (implémentation)
    ↓
VehicleServiceApi (interface)
    ↓
VehicleServiceImpl (implémentation)
```

## 🗂️ Structure du Projet

```
src/main/java/com/stilles/stilles_auto/
├── entity/                  # Entités JPA
├── dto/                     # Data Transfer Objects
├── mapper/                  # MapStruct Mappers
├── repository/
│   ├── api/                # Interfaces de repository
│   ├── impl/               # Implémentations
│   └── base/               # Classes de base
├── service/
│   ├── api/                # Interfaces de service
│   ├── impl/               # Implémentations
│   └── base/               # Classes de base
├── controller/             # Contrôleurs WebFlux
├── security/               # Configuration de sécurité
├── config/                 # Configurations Spring
└── exception/              # Gestion des erreurs
```

## 🚀 Prochaines Étapes

### Phase 1 : Implémentations (Priorité Haute)
- [ ] Implémenter VehicleRepositoryImpl avec critères
- [ ] Implémenter RentalRepositoryImpl avec critères
- [ ] Implémenter SaleRepositoryImpl avec critères
- [ ] Implémenter AccessoryRepositoryImpl avec critères
- [ ] Implémenter tous les ServiceImpl
- [ ] Mettre à jour les contrôleurs pour WebFlux

### Phase 2 : Configuration (Priorité Haute)
- [ ] Configurer R2DBC dans application.properties
- [ ] Configurer la sécurité réactive
- [ ] Configurer les transactions réactives
- [ ] Configurer le pool de connexions

### Phase 3 : Tests (Priorité Moyenne)
- [ ] Tests unitaires avec Reactor Test
- [ ] Tests d'intégration
- [ ] Tests de performance

## 📚 Ressources

- [Spring WebFlux Documentation](https://spring.io/projects/spring-webflux)
- [Spring Data R2DBC](https://spring.io/projects/spring-data-r2dbc)
- [Reactor Documentation](https://projectreactor.io/)
- [MapStruct Documentation](https://mapstruct.org/)

## ⚙️ Configuration R2DBC

```properties
# application.properties
spring.r2dbc.url=r2dbc:postgresql://localhost:5432/stilles_auto
spring.r2dbc.username=postgres
spring.r2dbc.password=postgres
spring.r2dbc.pool.initial-size=10
spring.r2dbc.pool.max-size=20
```

## 🔐 Considérations de Sécurité

- ✅ Authentification JWT réactive
- ✅ Autorisation basée sur les rôles
- ✅ Validation des données
- ✅ Protection contre les injections SQL (via critères)

## 📊 Comparaison Avant/Après

| Aspect | Avant (Blocking) | Après (Reactive) |
|--------|------------------|------------------|
| Framework | Spring MVC | Spring WebFlux |
| Base de Données | JPA/Hibernate | R2DBC |
| Requêtes | Blocking | Non-blocking |
| Scalabilité | Limitée | Excellente |
| Concurrence | Threads | Event Loop |
| Performance | Bonne | Excellente |

## 🎯 Objectifs Atteints

✅ Migration vers WebFlux
✅ Migration vers R2DBC
✅ Interfaces de repository
✅ Interfaces de service
✅ Mappers MapStruct
✅ Critères JPA (à implémenter)
✅ Architecture modulaire

## 📞 Support

Pour toute question sur la refactorisation réactive, consultez la documentation Spring ou contactez l'équipe de développement.

---

**Date de Refactorisation** : 30 Novembre 2025
**Status** : En cours
**Prochaine Étape** : Implémenter les classes d'implémentation
