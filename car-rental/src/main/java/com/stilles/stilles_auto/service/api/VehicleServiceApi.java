package com.stilles.stilles_auto.service.api;

import com.stilles.stilles_auto.dto.VehicleDTO;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface VehicleServiceApi {
    Mono<VehicleDTO> createVehicle(VehicleDTO vehicleDTO);
    Mono<VehicleDTO> getVehicleById(Long id);
    Flux<VehicleDTO> getAllVehicles();
    Flux<VehicleDTO> getAvailableVehicles();
    Flux<VehicleDTO> searchVehicles(String searchTerm);
    Flux<VehicleDTO> getVehiclesByBrand(String brand);
    Mono<VehicleDTO> updateVehicle(Long id, VehicleDTO vehicleDTO);
    Mono<Void> deleteVehicle(Long id);
}
