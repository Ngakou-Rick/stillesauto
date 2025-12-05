package com.stilles.stilles_auto.mapper;

import com.stilles.stilles_auto.dto.AccessoryDTO;
import com.stilles.stilles_auto.entity.Accessory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface AccessoryMapper {
    AccessoryMapper INSTANCE = Mappers.getMapper(AccessoryMapper.class);

    AccessoryDTO accessoryToAccessoryDTO(Accessory accessory);
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Accessory accessoryDTOToAccessory(AccessoryDTO accessoryDTO);
}
