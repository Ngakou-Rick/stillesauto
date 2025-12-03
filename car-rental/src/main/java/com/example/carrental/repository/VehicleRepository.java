package com.example.carrental.repository;

import com.example.carrental.model.Vehicle;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRepository extends R2dbcRepository<Vehicle, Long> {
}
