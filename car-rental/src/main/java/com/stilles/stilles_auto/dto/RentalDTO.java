package com.stilles.stilles_auto.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RentalDTO {
    private UUID id;
    private UUID vehicleId;
    private UUID clientId;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String pickupLocation;
    private String returnLocation;
    private BigDecimal totalPrice;
    private BigDecimal depositAmount;
    private String status;
    private String contractPath;
    private String notes;
}
