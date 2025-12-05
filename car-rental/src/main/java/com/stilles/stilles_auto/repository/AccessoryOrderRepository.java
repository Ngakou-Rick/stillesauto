package com.stilles.stilles_auto.repository;

import com.stilles.stilles_auto.entity.AccessoryOrder;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
import reactor.core.publisher.Flux;

@Repository
public interface AccessoryOrderRepository extends ReactiveCrudRepository<AccessoryOrder, UUID> {
    Flux<AccessoryOrder> findByClientId(UUID clientId);
    Flux<AccessoryOrder> findByAccessoryId(UUID accessoryId);
    Flux<AccessoryOrder> findByStatus(String status);
}
