package com.stilles.stilles_auto.config;

import com.stilles.stilles_auto.security.AuthenticationManager;
import com.stilles.stilles_auto.security.SecurityContextRepository;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;
import reactor.core.publisher.Mono;

@Configuration
@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
@AllArgsConstructor
public class SecurityConfig {

    private final AuthenticationManager authenticationManager;
    private final SecurityContextRepository securityContextRepository;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        return http
            .exceptionHandling(spec -> spec
                .authenticationEntryPoint((swe, e) -> 
                    Mono.fromRunnable(() -> swe.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED))
                )
                .accessDeniedHandler((swe, e) -> 
                    Mono.fromRunnable(() -> swe.getResponse().setStatusCode(HttpStatus.FORBIDDEN))
                )
            )
            .csrf(spec -> spec.disable())
            .formLogin(spec -> spec.disable())
            .httpBasic(spec -> spec.disable())
            .authenticationManager(authenticationManager)
            .securityContextRepository(securityContextRepository)
            .authorizeExchange(spec -> spec
                .pathMatchers("/api/auth/**").permitAll()
                .pathMatchers("/api/vehicles/search", "/api/vehicles/available").permitAll()
                .pathMatchers("/api/accessories").permitAll()
                .pathMatchers(HttpMethod.POST, "/api/vehicles", "/api/sales").hasAnyRole("ADMIN", "EMPLOYEE")
                .pathMatchers(HttpMethod.POST, "/api/rentals").hasAnyRole("ADMIN", "EMPLOYEE", "CLIENT")
                .pathMatchers(HttpMethod.PUT, "/api/vehicles/**", "/api/sales/**", "/api/rentals/**").hasAnyRole("ADMIN", "EMPLOYEE")
                .pathMatchers(HttpMethod.DELETE, "/api/vehicles/**", "/api/sales/**", "/api/rentals/**").hasRole("ADMIN")
                .anyExchange().authenticated()
            )
            .build();
    }
}
