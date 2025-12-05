package com.stilles.stilles_auto.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Table(name = "accessories")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Accessory {
    @Id
    private UUID id;

    @Column("name")
    private String name;

    @Column("description")
    private String description;

    @Column("price")
    private BigDecimal price;

    @Column("stock")
    private Integer stock;

    @Column("image_url")
    private String imageUrl;

    @Column("active")
    @Builder.Default
    private Boolean active = true;

    @Column("created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column("updated_at")
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();
}
