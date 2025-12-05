package com.stilles.stilles_auto.repository.api;

import com.stilles.stilles_auto.entity.Rental;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface RentalRepositoryApi {
    Mono<Rental> findById(Long id);
    Flux<Rental> findAll();
    Mono<Rental> save(Rental rental);
    Mono<Void> deleteById(Long id);
    Flux<Rental> findByClientId(Long clientId);
    Flux<Rental> findByStatus(Rental.RentalStatus status);
}
