# Migration R2DBC - Stilles Auto

## 📋 Résumé de la Migration

Conversion des entités JPA vers R2DBC pour une architecture réactive complète.

## ✅ Entités Migrées

### 1. **User.java** ✓
- ✅ Remplacement `@Entity` → `@Table` (R2DBC)
- ✅ Remplacement `@Id @GeneratedValue` → `@Id` (R2DBC)
- ✅ Remplacement `@Column` → `@Column` (R2DBC)
- ✅ Suppression des `@Enumerated` (stockage en String)
- ✅ Suppression des `@PreUpdate` (gestion manuelle)
- ✅ Ajout `@Builder.Default` pour les valeurs par défaut

### 2. **Vehicle.java** ✓
- ✅ Conversion complète vers R2DBC
- ✅ Enums stockés en String
- ✅ Timestamps avec `@Builder.Default`

### 3. **Rental.java** ✓
- ✅ Conversion complète vers R2DBC
- ✅ Remplacement des `@ManyToOne` par des IDs (vehicleId, clientId)
- ✅ Pas de jointures (R2DBC n'a pas de lazy loading)

### 4. **Sale.java** ✓
- ✅ Conversion complète vers R2DBC
- ✅ Remplacement des `@ManyToOne` par des IDs (vehicleId, buyerId)

### 5. **Accessory.java** ✓
- ✅ Conversion complète vers R2DBC
- ✅ Entité simple sans relations

## ⏳ À Faire

### Entités Restantes
- [ ] **AccessoryOrder.java** - À adapter
- [ ] **ImportExportRequest.java** - À adapter
- [ ] **RentalReturn.java** - À adapter

## 🔄 Changements Clés

### Avant (JPA)
```java
@Entity
@Table(name = "users")
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(nullable = false)
@Enumerated(EnumType.STRING)
@PreUpdate
```

### Après (R2DBC)
```java
@Table(name = "users")
@Id
@Column("column_name")
// Enums stockés en String
// Pas de @PreUpdate
@Builder.Default
```

## 📊 Différences JPA vs R2DBC

| Aspect | JPA | R2DBC |
|--------|-----|-------|
| **Annotations** | `@Entity` | `@Table` |
| **ID** | `@GeneratedValue` | Pas de génération auto |
| **Colonnes** | `@Column` | `@Column` |
| **Relations** | `@ManyToOne`, `@OneToMany` | Pas de support |
| **Enums** | `@Enumerated` | String uniquement |
| **Lazy Loading** | Supporté | Pas supporté |
| **Transactions** | Automatiques | Manuelles |

## 🎯 Avantages de R2DBC

- ✅ **Réactif** - Non-bloquant
- ✅ **Performant** - Moins de surcharge
- ✅ **Simple** - Pas de lazy loading complexe
- ✅ **Scalable** - Meilleure utilisation des ressources

## ⚠️ Limitations de R2DBC

- ❌ Pas de relations automatiques
- ❌ Pas de lazy loading
- ❌ Pas de cascade
- ❌ Gestion manuelle des IDs étrangers

## 🔧 Configuration R2DBC

```properties
# application.properties
spring.r2dbc.url=r2dbc:postgresql://localhost:5432/stilles_auto
spring.r2dbc.username=postgres
spring.r2dbc.password=postgres
spring.r2dbc.pool.initial-size=10
spring.r2dbc.pool.max-size=20
```

## 📝 Pattern pour les Entités R2DBC

```java
@Table(name = "table_name")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EntityName {
    @Id
    private Long id;

    @Column("column_name")
    private String fieldName;

    @Column("created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column("updated_at")
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();
}
```

## 🚀 Prochaines Étapes

1. ✅ Adapter toutes les entités
2. ⏳ Créer les RepositoryImpl avec critères
3. ⏳ Créer les ServiceImpl
4. ⏳ Adapter les contrôleurs
5. ⏳ Configurer R2DBC
6. ⏳ Tester la réactivité

## 📚 Ressources

- [Spring Data R2DBC](https://spring.io/projects/spring-data-r2dbc)
- [R2DBC Documentation](https://r2dbc.io/)
- [PostgreSQL R2DBC Driver](https://github.com/pgjdbc/r2dbc-postgresql)

---

**Date de Migration** : 30 Novembre 2025
**Status** : En cours (5/8 entités migrées)
**Prochaine Étape** : Adapter AccessoryOrder, ImportExportRequest, RentalReturn
