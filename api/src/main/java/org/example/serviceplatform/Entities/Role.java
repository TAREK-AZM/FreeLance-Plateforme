package org.example.serviceplatform.Entities;

import jakarta.persistence.*;
import lombok.Data;

import org.example.serviceplatform.Entities.Enums.RoleType;

import java.util.List;

@Entity
@Data
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Enumerated(EnumType.STRING) // Indique que RoleType sera stocké comme une chaîne
    private RoleType roleName;

}
