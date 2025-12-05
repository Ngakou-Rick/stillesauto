package com.stilles.stilles_auto.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Table(name = "accessory_orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccessoryOrder {
    @Id
    private UUID id;

    @Column("accessory_id")
    private UUID accessoryId;

    @Column("client_id")
    private UUID clientId;

    @Column("quantity")
    private Integer quantity;

    @Column("total_price")
    private BigDecimal totalPrice;

    @Column("status")
    private String status;

    @Column("notes")
    private String notes;

    @Column("created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column("updated_at")
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    public enum OrderStatus {
        PENDING,
        CONFIRMED,
        SHIPPED,
        DELIVERED,
        CANCELLED
    }
}
