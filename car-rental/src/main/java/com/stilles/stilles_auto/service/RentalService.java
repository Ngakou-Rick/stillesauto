package com.stilles.stilles_auto.service;

import com.stilles.stilles_auto.dto.RentalDTO;
import com.stilles.stilles_auto.entity.Rental;
import com.stilles.stilles_auto.repository.RentalRepository;
import com.stilles.stilles_auto.repository.VehicleRepository;
import com.stilles.stilles_auto.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Service
@AllArgsConstructor
public class RentalService {

    private final RentalRepository rentalRepository;
    private final VehicleRepository vehicleRepository;
    private final UserRepository userRepository;

    public Mono<RentalDTO> createRental(RentalDTO rentalDTO) {
        return Mono.zip(
            vehicleRepository.findById(rentalDTO.getVehicleId()),
            userRepository.findById(rentalDTO.getClientId())
        ).flatMap(tuple -> {
            Rental rental = Rental.builder()
                .vehicleId(tuple.getT1().getId())
                .clientId(tuple.getT2().getId())
                .startDate(rentalDTO.getStartDate())
                .endDate(rentalDTO.getEndDate())
                .pickupLocation(rentalDTO.getPickupLocation())
                .returnLocation(rentalDTO.getReturnLocation())
                .totalPrice(rentalDTO.getTotalPrice())
                .depositAmount(rentalDTO.getDepositAmount())
                .status(Rental.RentalStatus.PENDING.name())
                .notes(rentalDTO.getNotes())
                .build();
            return rentalRepository.save(rental);
        }).map(this::mapToDTO);
    }

    public Mono<RentalDTO> getRentalById(UUID id) {
        return rentalRepository.findById(id).map(this::mapToDTO);
    }

    public Flux<RentalDTO> getAllRentals() {
        return rentalRepository.findAll().map(this::mapToDTO);
    }

    public Flux<RentalDTO> getRentalsByClient(UUID clientId) {
        return rentalRepository.findByClientId(clientId).map(this::mapToDTO);
    }

    public Flux<RentalDTO> getRentalsByStatus(String status) {
        return rentalRepository.findByStatus(status).map(this::mapToDTO);
    }

    public Mono<RentalDTO> updateRentalStatus(UUID id, String status) {
        return rentalRepository.findById(id)
            .flatMap(rental -> {
                rental.setStatus(status);
                return rentalRepository.save(rental);
            })
            .map(this::mapToDTO);
    }

    private RentalDTO mapToDTO(Rental rental) {
        return new RentalDTO(
            rental.getId(),
            rental.getVehicleId(),
            rental.getClientId(),
            rental.getStartDate(),
            rental.getEndDate(),
            rental.getPickupLocation(),
            rental.getReturnLocation(),
            rental.getTotalPrice(),
            rental.getDepositAmount(),
            rental.getStatus(),
            rental.getContractPath(),
            rental.getNotes()
        );
    }
}
