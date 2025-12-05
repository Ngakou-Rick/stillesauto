package com.stilles.stilles_auto.controller;

import com.stilles.stilles_auto.dto.SaleDTO;
import com.stilles.stilles_auto.service.SaleService;
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
@RequestMapping("/api/sales")
@AllArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class SaleController {

    private final SaleService saleService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public Mono<ResponseEntity<SaleDTO>> createSale(@Valid @RequestBody SaleDTO saleDTO) {
        return saleService.createSale(saleDTO)
            .map(created -> ResponseEntity.status(HttpStatus.CREATED).body(created));
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<SaleDTO>> getSale(@PathVariable UUID id) {
        return saleService.getSaleById(id)
            .map(ResponseEntity::ok);
    }

    @GetMapping
    public Flux<SaleDTO> getAllSales() {
        return saleService.getAllSales();
    }

    @GetMapping("/vehicle/{vehicleId}")
    public Flux<SaleDTO> getSalesByVehicle(@PathVariable UUID vehicleId) {
        return saleService.getSalesByVehicle(vehicleId);
    }

    @GetMapping("/buyer/{buyerId}")
    public Flux<SaleDTO> getSalesByBuyer(@PathVariable UUID buyerId) {
        return saleService.getSalesByBuyer(buyerId);
    }

    @GetMapping("/status/{status}")
    public Flux<SaleDTO> getSalesByStatus(@PathVariable String status) {
        return saleService.getSalesByStatus(status);
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public Mono<ResponseEntity<SaleDTO>> updateSaleStatus(@PathVariable UUID id, @RequestParam String status) {
        return saleService.updateSaleStatus(id, status)
            .map(ResponseEntity::ok);
    }

    @PostMapping("/{id}/interested")
    @PreAuthorize("hasRole('CLIENT')")
    public Mono<ResponseEntity<SaleDTO>> markAsInterested(@PathVariable UUID id, @RequestParam UUID buyerId) {
        return saleService.markAsInterested(id, buyerId)
            .map(ResponseEntity::ok);
    }
}
