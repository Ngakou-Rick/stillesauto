package com.stilles.stilles_auto.repository;

import com.stilles.stilles_auto.entity.Rental;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

import java.time.LocalDateTime;
import java.util.UUID;

@Repository
public interface RentalRepository extends ReactiveCrudRepository<Rental, UUID> {
    Flux<Rental> findByClientId(UUID clientId);
    Flux<Rental> findByVehicleId(UUID vehicleId);
    Flux<Rental> findByStatus(String status);
    Flux<Rental> findByStartDateBetween(LocalDateTime startDate, LocalDateTime endDate);
}
