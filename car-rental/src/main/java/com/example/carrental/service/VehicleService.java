package com.example.carrental.service;

import com.example.carrental.model.Vehicle;
import com.example.carrental.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    public Flux<Vehicle> findAll() {
        return vehicleRepository.findAll();
    }

    public Mono<Vehicle> findById(Long id) {
        return vehicleRepository.findById(id);
    }

    public Mono<Vehicle> save(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public Mono<Vehicle> update(Long id, Vehicle vehicle) {
        return vehicleRepository.findById(id)
                .flatMap(existingVehicle -> {
                    existingVehicle.setBrand(vehicle.getBrand());
                    existingVehicle.setModel(vehicle.getModel());
                    existingVehicle.setYear(vehicle.getYear());
                    existingVehicle.setFuelType(vehicle.getFuelType());
                    existingVehicle.setColor(vehicle.getColor());
                    existingVehicle.setMileage(vehicle.getMileage());
                    existingVehicle.setPhotos(vehicle.getPhotos());
                    existingVehicle.setStatus(vehicle.getStatus());
                    existingVehicle.setPrice(vehicle.getPrice());
                    existingVehicle.setHistory(vehicle.getHistory());
                    return vehicleRepository.save(existingVehicle);
                });
    }

    public Mono<Void> deleteById(Long id) {
        return vehicleRepository.deleteById(id);
    }
}
