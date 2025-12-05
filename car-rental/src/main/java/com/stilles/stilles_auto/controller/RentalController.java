package com.stilles.stilles_auto.controller;

import com.stilles.stilles_auto.dto.RentalDTO;
import com.stilles.stilles_auto.service.RentalService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@RestController
@RequestMapping("/api/rentals")
@AllArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class RentalController {

    private final RentalService rentalService;

    @PostMapping
    @PreAuthorize("hasRole('CLIENT') or hasRole('EMPLOYEE')")
    public Mono<ResponseEntity<RentalDTO>> createRental(@Valid @RequestBody RentalDTO rentalDTO) {
        return rentalService.createRental(rentalDTO)
            .map(created -> ResponseEntity.status(HttpStatus.CREATED).body(created));
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<RentalDTO>> getRental(@PathVariable UUID id) {
        return rentalService.getRentalById(id)
            .map(ResponseEntity::ok);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public Flux<RentalDTO> getAllRentals() {
        return rentalService.getAllRentals();
    }

    @GetMapping("/client/{clientId}")
    public Flux<RentalDTO> getRentalsByClient(@PathVariable UUID clientId) {
        return rentalService.getRentalsByClient(clientId);
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public Flux<RentalDTO> getRentalsByStatus(@PathVariable String status) {
        return rentalService.getRentalsByStatus(status);
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public Mono<ResponseEntity<RentalDTO>> updateRentalStatus(@PathVariable UUID id, @RequestParam String status) {
        return rentalService.updateRentalStatus(id, status)
            .map(ResponseEntity::ok);
    }
}
