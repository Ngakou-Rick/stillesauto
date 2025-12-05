package com.stilles.stilles_auto.repository;

import com.stilles.stilles_auto.entity.Sale;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
import reactor.core.publisher.Flux;

@Repository
public interface SaleRepository extends ReactiveCrudRepository<Sale, UUID> {
    Flux<Sale> findByVehicleId(UUID vehicleId);
    Flux<Sale> findByBuyerId(UUID buyerId);
    Flux<Sale> findByStatus(String status);
}
