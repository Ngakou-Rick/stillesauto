package com.stilles.stilles_auto.repository;

import com.stilles.stilles_auto.entity.ImportExportRequest;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
import reactor.core.publisher.Flux;

@Repository
public interface ImportExportRequestRepository extends ReactiveCrudRepository<ImportExportRequest, UUID> {
    Flux<ImportExportRequest> findByRequestType(String requestType);
    Flux<ImportExportRequest> findByStatus(String status);
}
