package com.stilles.stilles_auto.service;

import com.stilles.stilles_auto.dto.SaleDTO;
import com.stilles.stilles_auto.entity.Sale;
import com.stilles.stilles_auto.repository.SaleRepository;
import com.stilles.stilles_auto.repository.VehicleRepository;
import com.stilles.stilles_auto.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Service
@AllArgsConstructor
public class SaleService {

    private final SaleRepository saleRepository;
    private final VehicleRepository vehicleRepository;
    private final UserRepository userRepository;

    public Mono<SaleDTO> createSale(SaleDTO saleDTO) {
        return vehicleRepository.findById(saleDTO.getVehicleId())
            .flatMap(vehicle -> {
                Sale sale = Sale.builder()
                    .vehicleId(vehicle.getId())
                    .askingPrice(saleDTO.getAskingPrice())
                    .status(Sale.SaleStatus.LISTED.name())
                    .buyerNotes(saleDTO.getBuyerNotes())
                    .sellerNotes(saleDTO.getSellerNotes())
                    .build();
                return saleRepository.save(sale);
            }).map(this::mapToDTO);
    }

    public Mono<SaleDTO> getSaleById(UUID id) {
        return saleRepository.findById(id).map(this::mapToDTO);
    }

    public Flux<SaleDTO> getAllSales() {
        return saleRepository.findAll().map(this::mapToDTO);
    }

    public Flux<SaleDTO> getSalesByVehicle(UUID vehicleId) {
        return saleRepository.findByVehicleId(vehicleId).map(this::mapToDTO);
    }

    public Flux<SaleDTO> getSalesByBuyer(UUID buyerId) {
        return saleRepository.findByBuyerId(buyerId).map(this::mapToDTO);
    }

    public Flux<SaleDTO> getSalesByStatus(String status) {
        return saleRepository.findByStatus(status).map(this::mapToDTO);
    }

    public Mono<SaleDTO> updateSaleStatus(UUID id, String status) {
        return saleRepository.findById(id)
            .flatMap(sale -> {
                sale.setStatus(status);
                return saleRepository.save(sale);
            })
            .map(this::mapToDTO);
    }

    public Mono<SaleDTO> markAsInterested(UUID id, UUID buyerId) {
        return Mono.zip(
            saleRepository.findById(id),
            userRepository.findById(buyerId)
        ).flatMap(tuple -> {
            Sale sale = tuple.getT1();
            sale.setBuyerId(tuple.getT2().getId());
            sale.setStatus(Sale.SaleStatus.INTERESTED.name());
            return saleRepository.save(sale);
        }).map(this::mapToDTO);
    }

    private SaleDTO mapToDTO(Sale sale) {
        return new SaleDTO(
            sale.getId(),
            sale.getVehicleId(),
            sale.getBuyerId(),
            sale.getAskingPrice(),
            sale.getSoldPrice(),
            sale.getStatus(),
            sale.getBuyerNotes(),
            sale.getSellerNotes()
        );
    }
}
