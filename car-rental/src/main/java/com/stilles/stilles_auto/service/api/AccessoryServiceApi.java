package com.stilles.stilles_auto.service.api;

import com.stilles.stilles_auto.dto.AccessoryDTO;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface AccessoryServiceApi {
    Mono<AccessoryDTO> createAccessory(AccessoryDTO accessoryDTO);
    Mono<AccessoryDTO> getAccessoryById(Long id);
    Flux<AccessoryDTO> getAllAccessories();
    Flux<AccessoryDTO> getActiveAccessories();
    Flux<AccessoryDTO> searchAccessories(String name);
    Mono<AccessoryDTO> updateAccessory(Long id, AccessoryDTO accessoryDTO);
    Mono<Void> deleteAccessory(Long id);
}
