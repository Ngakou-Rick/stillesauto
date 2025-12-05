package com.stilles.stilles_auto.repository.api;

import com.stilles.stilles_auto.entity.Accessory;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface AccessoryRepositoryApi {
    Mono<Accessory> findById(Long id);
    Flux<Accessory> findAll();
    Mono<Accessory> save(Accessory accessory);
    Mono<Void> deleteById(Long id);
    Flux<Accessory> findByActiveTrue();
    Flux<Accessory> findByNameContainingIgnoreCase(String name);
}
