package com.stilles.stilles_auto.repository.api;

import com.stilles.stilles_auto.entity.Sale;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface SaleRepositoryApi {
    Mono<Sale> findById(Long id);
    Flux<Sale> findAll();
    Mono<Sale> save(Sale sale);
    Mono<Void> deleteById(Long id);
    Flux<Sale> findByVehicleId(Long vehicleId);
    Flux<Sale> findByBuyerId(Long buyerId);
    Flux<Sale> findByStatus(Sale.SaleStatus status);
}
