package com.example.carrental.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.math.BigDecimal;
import java.util.List;

@Table("vehicles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {
    @Id
    private Long id;
    private String brand;
    private String model;
    private int year;
    private String fuelType;
    private String color;
    private int mileage;
    private List<String> photos;
    private VehicleStatus status;
    private BigDecimal price;
    private String history;
}
