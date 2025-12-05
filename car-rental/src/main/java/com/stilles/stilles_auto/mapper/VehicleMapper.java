package com.stilles.stilles_auto.mapper;

import com.stilles.stilles_auto.dto.VehicleDTO;
import com.stilles.stilles_auto.entity.Vehicle;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface VehicleMapper {
    VehicleMapper INSTANCE = Mappers.getMapper(VehicleMapper.class);

    VehicleDTO vehicleToVehicleDTO(Vehicle vehicle);
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Vehicle vehicleDTOToVehicle(VehicleDTO vehicleDTO);
}
