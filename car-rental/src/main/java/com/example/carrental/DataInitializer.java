package com.example.carrental;

import com.example.carrental.model.ERole;
import com.example.carrental.model.Role;
import com.example.carrental.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        Flux.just(ERole.ROLE_USER, ERole.ROLE_ADMIN, ERole.ROLE_MODERATOR)
            .flatMap(roleName -> roleRepository.findByName(roleName)
                .switchIfEmpty(roleRepository.save(new Role(roleName)))
            )
            .blockLast();
    }
}
