package com.example.carrental.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("roles")
@Getter
@Setter
@NoArgsConstructor
public class Role {
    @Id
    private Integer id;

    private ERole name;

    public Role(ERole name) {
        this.name = name;
    }
}
