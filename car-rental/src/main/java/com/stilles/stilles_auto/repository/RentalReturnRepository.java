package com.stilles.stilles_auto.repository;

import com.stilles.stilles_auto.entity.RentalReturn;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
import reactor.core.publisher.Mono;

@Repository
public interface RentalReturnRepository extends ReactiveCrudRepository<RentalReturn, UUID> {
    Mono<RentalReturn> findByRentalId(UUID rentalId);
}
