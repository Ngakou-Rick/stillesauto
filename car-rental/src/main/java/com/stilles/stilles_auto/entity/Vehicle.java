package com.stilles.stilles_auto.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Table(name = "vehicles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vehicle {
    @Id
    private UUID id;

    @Column("brand")
    private String brand;

    @Column("model")
    private String model;

    @Column("year")
    private Integer year;

    @Column("fuel_type")
    private String fuelType;

    @Column("color")
    private String color;

    @Column("mileage")
    private Long mileage;

    @Column("license_plate")
    private String licensePlate;

    @Column("vin")
    private String vin;

    @Column("vehicle_type")
    private String vehicleType;

    @Column("status")
    private String status;

    @Column("daily_rental_price")
    private BigDecimal dailyRentalPrice;

    @Column("sale_price")
    private BigDecimal salePrice;

    @Column("description")
    private String description;

    @Column("image_url")
    private String imageUrl;

    @Column("available")
    @Builder.Default
    private Boolean available = true;

    @Column("created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column("updated_at")
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    public enum FuelType {
        GASOLINE,
        DIESEL,
        HYBRID,
        ELECTRIC,
        LPG
    }

    public enum VehicleType {
        SEDAN,
        SUV,
        TRUCK,
        VAN,
        COUPE,
        HATCHBACK,
        STATION_WAGON
    }

    public enum VehicleStatus {
        AVAILABLE,
        RENTED,
        FOR_SALE,
        MAINTENANCE,
        SOLD
    }
}
