package com.stilles.stilles_auto.controller;

import com.stilles.stilles_auto.dto.AccessoryDTO;
import com.stilles.stilles_auto.service.AccessoryService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@RestController
@RequestMapping("/api/accessories")
@AllArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class AccessoryController {

    private final AccessoryService accessoryService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public Mono<ResponseEntity<AccessoryDTO>> createAccessory(@Valid @RequestBody AccessoryDTO accessoryDTO) {
        return accessoryService.createAccessory(accessoryDTO)
            .map(created -> ResponseEntity.status(HttpStatus.CREATED).body(created));
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<AccessoryDTO>> getAccessory(@PathVariable UUID id) {
        return accessoryService.getAccessoryById(id)
            .map(ResponseEntity::ok);
    }

    @GetMapping
    public Flux<AccessoryDTO> getAllAccessories() {
        return accessoryService.getAllAccessories();
    }

    @GetMapping("/active")
    public Flux<AccessoryDTO> getActiveAccessories() {
        return accessoryService.getActiveAccessories();
    }

    @GetMapping("/search")
    public Flux<AccessoryDTO> searchAccessories(@RequestParam String query) {
        return accessoryService.searchAccessories(query);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public Mono<ResponseEntity<AccessoryDTO>> updateAccessory(@PathVariable UUID id, @Valid @RequestBody AccessoryDTO accessoryDTO) {
        return accessoryService.updateAccessory(id, accessoryDTO)
            .map(ResponseEntity::ok);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Mono<ResponseEntity<Void>> deleteAccessory(@PathVariable UUID id) {
        return accessoryService.deleteAccessory(id)
            .then(Mono.just(ResponseEntity.noContent().<Void>build()));
    }
}
