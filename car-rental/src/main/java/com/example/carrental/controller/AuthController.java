package com.example.carrental.controller;

import com.example.carrental.model.ERole;
import com.example.carrental.model.User;
import com.example.carrental.model.UserRole;
import com.example.carrental.payload.request.LoginRequest;
import com.example.carrental.payload.request.SignupRequest;
import com.example.carrental.payload.response.JwtResponse;
import com.example.carrental.payload.response.MessageResponse;
import com.example.carrental.repository.RoleRepository;
import com.example.carrental.repository.UserRepository;
import com.example.carrental.repository.UserRoleRepository;
import com.example.carrental.security.jwt.JwtUtils;
import com.example.carrental.service.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private ReactiveAuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/signin")
    public Mono<ResponseEntity<?>> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authenticationToken = new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword());

        return authenticationManager.authenticate(authenticationToken)
                .map(authentication -> {
                    String jwt = jwtUtils.generateJwtToken(authentication);
                    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
                    List<String> roles = userDetails.getAuthorities().stream()
                            .map(item -> item.getAuthority())
                            .collect(Collectors.toList());
                    return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles));
                });
    }

    @PostMapping("/signup")
    public Mono<ResponseEntity<?>> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        return userRepository.existsByUsername(signUpRequest.getUsername())
                .flatMap(exists -> {
                    if (exists) {
                        return Mono.just(ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!")));
                    }
                    return userRepository.existsByEmail(signUpRequest.getEmail())
                            .flatMap(emailExists -> {
                                if (emailExists) {
                                    return Mono.just(ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!")));
                                }

                                User user = new User(signUpRequest.getUsername(),
                                        signUpRequest.getEmail(),
                                        encoder.encode(signUpRequest.getPassword()));

                                return userRepository.save(user)
                                    .flatMap(savedUser -> {
                                        Set<String> strRoles = signUpRequest.getRole();
                                        if (strRoles == null || strRoles.isEmpty()) {
                                            strRoles = new HashSet<>();
                                            strRoles.add("user");
                                        }

                                        return Flux.fromIterable(strRoles)
                                            .flatMap(roleStr -> {
                                                switch (roleStr) {
                                                    case "admin":
                                                        return roleRepository.findByName(ERole.ROLE_ADMIN);
                                                    case "mod":
                                                        return roleRepository.findByName(ERole.ROLE_MODERATOR);
                                                    default:
                                                        return roleRepository.findByName(ERole.ROLE_USER);
                                                }
                                            })
                                            .flatMap(role -> userRoleRepository.save(new UserRole(savedUser.getId(), role.getId())))
                                            .then(Mono.just(ResponseEntity.ok(new MessageResponse("User registered successfully!"))));
                                    });
                            });
                });
    }
}
