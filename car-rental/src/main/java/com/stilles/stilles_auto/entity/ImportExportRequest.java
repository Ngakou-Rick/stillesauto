package com.stilles.stilles_auto.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Table(name = "import_export_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImportExportRequest {
    @Id
    private UUID id;

    @Column("vehicle_brand")
    private String vehicleBrand;

    @Column("vehicle_model")
    private String vehicleModel;

    @Column("vehicle_year")
    private Integer vehicleYear;

    @Column("origin_country")
    private String originCountry;

    @Column("destination_country")
    private String destinationCountry;

    @Column("request_type")
    private String requestType;

    @Column("estimated_cost")
    private BigDecimal estimatedCost;

    @Column("status")
    private String status;

    @Column("notes")
    private String notes;

    @Column("document_path")
    private String documentPath;

    @Column("created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column("updated_at")
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    public enum RequestType {
        IMPORT,
        EXPORT
    }

    public enum RequestStatus {
        PENDING,
        APPROVED,
        IN_PROGRESS,
        COMPLETED,
        REJECTED
    }
}
