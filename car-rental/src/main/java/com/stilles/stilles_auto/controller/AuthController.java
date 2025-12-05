package com.stilles.stilles_auto.controller;

import com.stilles.stilles_auto.dto.AuthRequest;
import com.stilles.stilles_auto.dto.AuthResponse;
import com.stilles.stilles_auto.dto.RegisterRequest;
import com.stilles.stilles_auto.service.AuthService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public Mono<ResponseEntity<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request)
            .map(response -> ResponseEntity.status(HttpStatus.CREATED).body(response));
    }

    @PostMapping("/login")
    public Mono<ResponseEntity<AuthResponse>> login(@Valid @RequestBody AuthRequest request) {
        return authService.login(request)
            .map(ResponseEntity::ok);
    }
}
