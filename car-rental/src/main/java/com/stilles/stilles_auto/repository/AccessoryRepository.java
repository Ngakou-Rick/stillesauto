package com.stilles.stilles_auto.repository;

import com.stilles.stilles_auto.entity.Accessory;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
import reactor.core.publisher.Flux;

@Repository
public interface AccessoryRepository extends ReactiveCrudRepository<Accessory, UUID> {
    Flux<Accessory> findByActiveTrue();
    Flux<Accessory> findByNameContainingIgnoreCase(String name);
}
