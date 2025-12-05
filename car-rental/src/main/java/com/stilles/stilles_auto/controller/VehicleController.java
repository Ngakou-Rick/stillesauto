package com.stilles.stilles_auto.controller;

import com.stilles.stilles_auto.dto.VehicleDTO;
import com.stilles.stilles_auto.service.VehicleService;
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
@RequestMapping("/api/vehicles")
@AllArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class VehicleController {

    private final VehicleService vehicleService;

    @PostMapping

    public Mono<ResponseEntity<VehicleDTO>> createVehicle(@Valid @RequestBody VehicleDTO vehicleDTO) {
        return vehicleService.createVehicle(vehicleDTO)
            .map(created -> ResponseEntity.status(HttpStatus.CREATED).body(created));
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<VehicleDTO>> getVehicle(@PathVariable UUID id) {
        return vehicleService.getVehicleById(id)
            .map(ResponseEntity::ok);
    }

    @GetMapping
    public Flux<VehicleDTO> getAllVehicles() {
        return vehicleService.getAllVehicles();
    }

    @GetMapping("/available")
    public Flux<VehicleDTO> getAvailableVehicles() {
        return vehicleService.getAvailableVehicles();
    }

    @GetMapping("/search")
    public Flux<VehicleDTO> searchVehicles(@RequestParam String query) {
        return vehicleService.searchVehicles(query);
    }

    @GetMapping("/brand/{brand}")
    public Flux<VehicleDTO> getVehiclesByBrand(@PathVariable String brand) {
        return vehicleService.getVehiclesByBrand(brand);
    }

    @GetMapping("/status/{status}")
    public Flux<VehicleDTO> getVehiclesByStatus(@PathVariable String status) {
        return vehicleService.getVehiclesByStatus(status);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public Mono<ResponseEntity<VehicleDTO>> updateVehicle(@PathVariable UUID id, @Valid @RequestBody VehicleDTO vehicleDTO) {
        return vehicleService.updateVehicle(id, vehicleDTO)
            .map(ResponseEntity::ok);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Mono<ResponseEntity<Void>> deleteVehicle(@PathVariable UUID id) {
        return vehicleService.deleteVehicle(id)
            .then(Mono.just(ResponseEntity.noContent().<Void>build()));
    }
}
