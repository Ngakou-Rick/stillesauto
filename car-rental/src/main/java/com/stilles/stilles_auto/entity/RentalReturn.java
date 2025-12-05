package com.stilles.stilles_auto.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Table(name = "rental_returns")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RentalReturn {
    @Id
    private UUID id;

    @Column("rental_id")
    private UUID rentalId;

    @Column("return_date")
    private LocalDateTime returnDate;

    @Column("final_mileage")
    private Long finalMileage;

    @Column("damage_description")
    private String damageDescription;

    @Column("damage_charge")
    @Builder.Default
    private BigDecimal damageCharge = BigDecimal.ZERO;

    @Column("refund_amount")
    @Builder.Default
    private BigDecimal refundAmount = BigDecimal.ZERO;

    @Column("inspection_notes")
    private String inspectionNotes;

    @Column("created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column("updated_at")
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();
}
