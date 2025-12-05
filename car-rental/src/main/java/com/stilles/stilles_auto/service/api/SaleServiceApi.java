package com.stilles.stilles_auto.service.api;

import com.stilles.stilles_auto.dto.SaleDTO;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface SaleServiceApi {
    Mono<SaleDTO> createSale(SaleDTO saleDTO);
    Mono<SaleDTO> getSaleById(Long id);
    Flux<SaleDTO> getAllSales();
    Flux<SaleDTO> getSalesByVehicle(Long vehicleId);
    Flux<SaleDTO> getSalesByBuyer(Long buyerId);
    Mono<SaleDTO> updateSaleStatus(Long id, String status);
    Mono<SaleDTO> markAsInterested(Long id, Long buyerId);
    Mono<Void> deleteSale(Long id);
}
