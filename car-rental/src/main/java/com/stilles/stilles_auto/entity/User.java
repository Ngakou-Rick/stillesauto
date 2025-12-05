package com.stilles.stilles_auto.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import java.time.LocalDateTime;
import java.util.UUID;

@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    private UUID id;

    @Column("email")
    private String email;

    @Column("password")
    private String password;

    @Column("first_name")
    private String firstName;

    @Column("last_name")
    private String lastName;

    @Column("phone")
    private String phone;

    @Column("address")
    private String address;

    @Column("city")
    private String city;

    @Column("postal_code")
    private String postalCode;

    @Column("country")
    private String country;

    @Column("role")
    private String role;

    @Column("active")
    @Builder.Default
    private Boolean active = true;

    @Column("created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column("updated_at")
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    public enum UserRole {
        ADMIN,
        EMPLOYEE,
        CLIENT
    }
}
