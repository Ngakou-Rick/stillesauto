package com.stilles.stilles_auto.service;

import com.stilles.stilles_auto.dto.AccessoryDTO;
import com.stilles.stilles_auto.entity.Accessory;
import com.stilles.stilles_auto.repository.AccessoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Service
@AllArgsConstructor
public class AccessoryService {

    private final AccessoryRepository accessoryRepository;

    public Mono<AccessoryDTO> createAccessory(AccessoryDTO accessoryDTO) {
        Accessory accessory = mapToEntity(accessoryDTO);
        return accessoryRepository.save(accessory).map(this::mapToDTO);
    }

    public Mono<AccessoryDTO> getAccessoryById(UUID id) {
        return accessoryRepository.findById(id).map(this::mapToDTO);
    }

    public Flux<AccessoryDTO> getAllAccessories() {
        return accessoryRepository.findAll().map(this::mapToDTO);
    }

    public Flux<AccessoryDTO> getActiveAccessories() {
        return accessoryRepository.findByActiveTrue().map(this::mapToDTO);
    }

    public Flux<AccessoryDTO> searchAccessories(String name) {
        return accessoryRepository.findByNameContainingIgnoreCase(name).map(this::mapToDTO);
    }

    public Mono<AccessoryDTO> updateAccessory(UUID id, AccessoryDTO accessoryDTO) {
        return accessoryRepository.findById(id)
            .flatMap(accessory -> {
                accessory.setName(accessoryDTO.getName());
                accessory.setDescription(accessoryDTO.getDescription());
                accessory.setPrice(accessoryDTO.getPrice());
                accessory.setStock(accessoryDTO.getStock());
                accessory.setImageUrl(accessoryDTO.getImageUrl());
                accessory.setActive(accessoryDTO.getActive());
                return accessoryRepository.save(accessory);
            })
            .map(this::mapToDTO);
    }

    public Mono<Void> deleteAccessory(UUID id) {
        return accessoryRepository.deleteById(id);
    }

    private AccessoryDTO mapToDTO(Accessory accessory) {
        return new AccessoryDTO(
            accessory.getId(),
            accessory.getName(),
            accessory.getDescription(),
            accessory.getPrice(),
            accessory.getStock(),
            accessory.getImageUrl(),
            accessory.getActive()
        );
    }

    private Accessory mapToEntity(AccessoryDTO dto) {
        return Accessory.builder()
            .name(dto.getName())
            .description(dto.getDescription())
            .price(dto.getPrice())
            .stock(dto.getStock())
            .imageUrl(dto.getImageUrl())
            .active(dto.getActive() != null ? dto.getActive() : true)
            .build();
    }
}
