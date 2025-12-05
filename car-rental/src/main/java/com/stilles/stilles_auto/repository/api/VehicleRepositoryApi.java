package com.stilles.stilles_auto.repository.api;

import com.stilles.stilles_auto.entity.Vehicle;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface VehicleRepositoryApi {
    Mono<Vehicle> findById(Long id);
    Flux<Vehicle> findAll();
    Mono<Vehicle> save(Vehicle vehicle);
    Mono<Void> deleteById(Long id);
    Flux<Vehicle> findByAvailableTrue();
    Flux<Vehicle> findByBrand(String brand);
    Flux<Vehicle> searchByBrandOrModel(String searchTerm);
}
