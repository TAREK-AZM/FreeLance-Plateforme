package org.example.serviceplatform.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.serviceplatform.Entities.Enums.CompetenceType;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Competence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Enumerated(EnumType.STRING)
    private CompetenceType name; // Nom de la compétence (ex : "Java", "Gestion de projet")


}
