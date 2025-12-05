package com.stilles.stilles_auto.mapper;

import com.stilles.stilles_auto.dto.RentalDTO;
import com.stilles.stilles_auto.entity.Rental;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface RentalMapper {
    RentalMapper INSTANCE = Mappers.getMapper(RentalMapper.class);

    RentalDTO rentalToRentalDTO(Rental rental);
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Rental rentalDTOToRental(RentalDTO rentalDTO);
}
