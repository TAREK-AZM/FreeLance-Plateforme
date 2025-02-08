package org.example.serviceplatform.Entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Offre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title; // Titre de l'offre
    private String description; // Description de l'offre
    private LocalDateTime dateCreation; // Date de création de l'offre

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client; // Client ayant posté l'offre

    @OneToMany(mappedBy = "offre", cascade = CascadeType.ALL)
    private List<Postulation> postulats; // Liste des postulats pour cette offre
}

