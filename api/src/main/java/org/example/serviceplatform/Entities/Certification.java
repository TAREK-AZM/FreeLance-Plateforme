package org.example.serviceplatform.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Certification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name; // Nom de la certification
    private String description; // Description ou détails de la certification
    private String imageUrl; // URL de l'image de la certification

    @ManyToOne
    @JoinColumn(name = "prestataire_id")
    @JsonIgnore
    private Prestataire prestataire; // Prestataire associé à la certification
}