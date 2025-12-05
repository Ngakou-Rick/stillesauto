package com.stilles.stilles_auto.service.api;

import com.stilles.stilles_auto.dto.RentalDTO;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface RentalServiceApi {
    Mono<RentalDTO> createRental(RentalDTO rentalDTO);
    Mono<RentalDTO> getRentalById(Long id);
    Flux<RentalDTO> getAllRentals();
    Flux<RentalDTO> getRentalsByClient(Long clientId);
    Mono<RentalDTO> updateRentalStatus(Long id, String status);
    Mono<Void> deleteRental(Long id);
}
