package com.stilles.stilles_auto.mapper;

import com.stilles.stilles_auto.dto.SaleDTO;
import com.stilles.stilles_auto.entity.Sale;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface SaleMapper {
    SaleMapper INSTANCE = Mappers.getMapper(SaleMapper.class);

    SaleDTO saleToSaleDTO(Sale sale);
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Sale saleDTOToSale(SaleDTO saleDTO);
}
