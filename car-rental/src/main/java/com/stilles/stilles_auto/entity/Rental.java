package com.stilles.stilles_auto.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Table(name = "rentals")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Rental {
    @Id
    private UUID id;

    @Column("vehicle_id")
    private UUID vehicleId;

    @Column("client_id")
    private UUID clientId;

    @Column("start_date")
    private LocalDateTime startDate;

    @Column("end_date")
    private LocalDateTime endDate;

    @Column("pickup_location")
    private String pickupLocation;

    @Column("return_location")
    private String returnLocation;

    @Column("total_price")
    private BigDecimal totalPrice;

    @Column("deposit_amount")
    private BigDecimal depositAmount;

    @Column("status")
    private String status;

    @Column("contract_path")
    private String contractPath;

    @Column("notes")
    private String notes;

    @Column("created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column("updated_at")
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    public enum RentalStatus {
        PENDING,
        CONFIRMED,
        ACTIVE,
        RETURNED,
        CANCELLED
    }
}
