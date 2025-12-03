package com.example.carrental.repository;

import com.example.carrental.model.ERole;
import com.example.carrental.model.Role;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface RoleRepository extends R2dbcRepository<Role, Integer> {
    Mono<Role> findByName(ERole name);
}
