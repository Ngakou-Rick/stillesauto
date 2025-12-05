package com.stilles.stilles_auto.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Table(name = "sales")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Sale {
    @Id
    private UUID id;

    @Column("vehicle_id")
    private UUID vehicleId;

    @Column("buyer_id")
    private UUID buyerId;

    @Column("asking_price")
    private BigDecimal askingPrice;

    @Column("sold_price")
    private BigDecimal soldPrice;

    @Column("status")
    private String status;

    @Column("buyer_notes")
    private String buyerNotes;

    @Column("seller_notes")
    private String sellerNotes;

    @Column("created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column("updated_at")
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    public enum SaleStatus {
        LISTED,
        INTERESTED,
        NEGOTIATING,
        SOLD,
        CANCELLED
    }
}
