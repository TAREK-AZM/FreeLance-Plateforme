package org.example.serviceplatform.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String titre; // Titre du service
    private String description; // Description du service
    private Float prix; // Prix du service
    private Boolean status; // Disponibilité du service

    // Relation avec la table `Favoris`
    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL)
    private List<Favoris> favoris;

    // Relation avec la table `Commentaire`
    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL)
    private List<Commentaire> commentaires;

    // Relation avec la table `DemandeClient`
    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL)
    private List<DemandeClient> demandes;

    // Relation avec la table `Evaluation`
    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL)
    private List<Evaluation> evaluations;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne
    @JoinColumn(name = "prestataire_id", nullable = false)
    private Prestataire prestataire;
}
