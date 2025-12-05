package com.stilles.stilles_auto.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaleDTO {
    private UUID id;
    private UUID vehicleId;
    private UUID buyerId;
    private BigDecimal askingPrice;
    private BigDecimal soldPrice;
    private String status;
    private String buyerNotes;
    private String sellerNotes;
}
