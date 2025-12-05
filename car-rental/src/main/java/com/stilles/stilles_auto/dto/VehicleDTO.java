package com.stilles.stilles_auto.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleDTO {
    private UUID id;
    private String brand;
    private String model;
    private Integer year;
    private String fuelType;
    private String color;
    private Long mileage;
    private String licensePlate;
    private String vin;
    private String vehicleType;
    private String status;
    private BigDecimal dailyRentalPrice;
    private BigDecimal salePrice;
    private String description;
    private String imageUrl;
    private Boolean available;
}
