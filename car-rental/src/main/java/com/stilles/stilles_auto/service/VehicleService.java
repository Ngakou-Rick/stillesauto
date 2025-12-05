package com.stilles.stilles_auto.service;

import com.stilles.stilles_auto.dto.VehicleDTO;
import com.stilles.stilles_auto.entity.Vehicle;
import com.stilles.stilles_auto.repository.VehicleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Service
@AllArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public Mono<VehicleDTO> createVehicle(VehicleDTO vehicleDTO) {
        Vehicle vehicle = mapToEntity(vehicleDTO);
        return vehicleRepository.save(vehicle).map(this::mapToDTO);
    }

    public Mono<VehicleDTO> getVehicleById(UUID id) {
        return vehicleRepository.findById(id).map(this::mapToDTO);
    }

    public Flux<VehicleDTO> getAllVehicles() {
        return vehicleRepository.findAll().map(this::mapToDTO);
    }

    public Flux<VehicleDTO> getAvailableVehicles() {
        return vehicleRepository.findByAvailableTrue().map(this::mapToDTO);
    }

    public Flux<VehicleDTO> searchVehicles(String searchTerm) {
        return vehicleRepository.searchByBrandOrModel(searchTerm).map(this::mapToDTO);
    }

    public Flux<VehicleDTO> getVehiclesByBrand(String brand) {
        return vehicleRepository.findByBrand(brand).map(this::mapToDTO);
    }

    public Flux<VehicleDTO> getVehiclesByStatus(String status) {
        return vehicleRepository.findByStatus(status).map(this::mapToDTO);
    }

    public Mono<VehicleDTO> updateVehicle(UUID id, VehicleDTO vehicleDTO) {
        return vehicleRepository.findById(id)
            .flatMap(vehicle -> {
                vehicle.setBrand(vehicleDTO.getBrand());
                vehicle.setModel(vehicleDTO.getModel());
                vehicle.setYear(vehicleDTO.getYear());
                vehicle.setColor(vehicleDTO.getColor());
                vehicle.setMileage(vehicleDTO.getMileage());
                vehicle.setDescription(vehicleDTO.getDescription());
                vehicle.setImageUrl(vehicleDTO.getImageUrl());
                vehicle.setDailyRentalPrice(vehicleDTO.getDailyRentalPrice());
                vehicle.setSalePrice(vehicleDTO.getSalePrice());
                return vehicleRepository.save(vehicle);
            })
            .map(this::mapToDTO);
    }

    public Mono<Void> deleteVehicle(UUID id) {
        return vehicleRepository.deleteById(id);
    }

    private VehicleDTO mapToDTO(Vehicle vehicle) {
        return new VehicleDTO(
            vehicle.getId(),
            vehicle.getBrand(),
            vehicle.getModel(),
            vehicle.getYear(),
            vehicle.getFuelType(),
            vehicle.getColor(),
            vehicle.getMileage(),
            vehicle.getLicensePlate(),
            vehicle.getVin(),
            vehicle.getVehicleType(),
            vehicle.getStatus(),
            vehicle.getDailyRentalPrice(),
            vehicle.getSalePrice(),
            vehicle.getDescription(),
            vehicle.getImageUrl(),
            vehicle.getAvailable()
        );
    }

    private Vehicle mapToEntity(VehicleDTO dto) {
        return Vehicle.builder()
            .brand(dto.getBrand())
            .model(dto.getModel())
            .year(dto.getYear())
            .fuelType(dto.getFuelType())
            .color(dto.getColor())
            .mileage(dto.getMileage())
            .licensePlate(dto.getLicensePlate())
            .vin(dto.getVin())
            .vehicleType(dto.getVehicleType())
            .status(dto.getStatus())
            .dailyRentalPrice(dto.getDailyRentalPrice())
            .salePrice(dto.getSalePrice())
            .description(dto.getDescription())
            .imageUrl(dto.getImageUrl())
            .available(dto.getAvailable() != null ? dto.getAvailable() : true)
            .build();
    }
}
