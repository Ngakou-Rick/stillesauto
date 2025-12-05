package com.stilles.stilles_auto.service;

import com.stilles.stilles_auto.dto.AuthRequest;
import com.stilles.stilles_auto.dto.AuthResponse;
import com.stilles.stilles_auto.dto.RegisterRequest;
import com.stilles.stilles_auto.entity.User;
import com.stilles.stilles_auto.repository.UserRepository;
import com.stilles.stilles_auto.security.JwtTokenProvider;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@AllArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public Mono<AuthResponse> register(RegisterRequest request) {
        return userRepository.existsByEmail(request.getEmail())
            .flatMap(exists -> {
                if (exists) {
                    return Mono.error(new RuntimeException("Email already registered"));
                }
                User user = User.builder()
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .firstName(request.getFirstName())
                    .lastName(request.getLastName())
                    .phone(request.getPhone())
                    .address(request.getAddress())
                    .city(request.getCity())
                    .postalCode(request.getPostalCode())
                    .country(request.getCountry())
                    .role(request.getRole())
                    .active(true)
                    .build();
                return userRepository.save(user);
            })
            .map(user -> buildAuthResponse(user, jwtTokenProvider.generateToken(user)));
    }

    public Mono<AuthResponse> login(AuthRequest request) {
        return userRepository.findByEmail(request.getEmail())
            .flatMap(user -> {
                if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                    return Mono.just(buildAuthResponse(user, jwtTokenProvider.generateToken(user)));
                }
                return Mono.error(new RuntimeException("Invalid credentials"));
            })
            .switchIfEmpty(Mono.error(new RuntimeException("User not found")));
    }

    private AuthResponse buildAuthResponse(User user, String token) {
        return new AuthResponse(
            token,
            "Bearer",
            user.getId(),
            user.getEmail(),
            user.getFirstName(),
            user.getLastName(),
            user.getRole()
        );
    }
}
