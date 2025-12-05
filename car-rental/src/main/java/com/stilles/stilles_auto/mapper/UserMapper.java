package com.stilles.stilles_auto.mapper;

import com.stilles.stilles_auto.dto.AuthResponse;
import com.stilles.stilles_auto.dto.RegisterRequest;
import com.stilles.stilles_auto.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    User registerRequestToUser(RegisterRequest registerRequest);

    @Mapping(target = "token", ignore = true)
    @Mapping(target = "type", ignore = true)
    AuthResponse userToAuthResponse(User user);
}
