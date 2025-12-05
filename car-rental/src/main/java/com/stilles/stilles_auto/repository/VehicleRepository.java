package com.stilles.stilles_auto.repository;

import com.stilles.stilles_auto.entity.Vehicle;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
import reactor.core.publisher.Flux;

@Repository
public interface VehicleRepository extends ReactiveCrudRepository<Vehicle, UUID> {
    Flux<Vehicle> findByBrand(String brand);
    Flux<Vehicle> findByStatus(String status);
    Flux<Vehicle> findByAvailableTrue();

    @Query("SELECT * FROM vehicles WHERE brand ILIKE :searchTerm OR model ILIKE :searchTerm")
    Flux<Vehicle> searchByBrandOrModel(String searchTerm);
}
