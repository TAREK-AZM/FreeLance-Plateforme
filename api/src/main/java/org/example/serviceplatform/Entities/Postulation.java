package org.example.serviceplatform.Entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.serviceplatform.Entities.Enums.StatutPost;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class  Postulation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private LocalDateTime datePostulation; // Date de postulation
    private String description; // Description de la postulation
    private Double prix; // Prix proposé par le prestataire
    @Enumerated(EnumType.STRING)
    private StatutPost status; // statut de postulation

    @ManyToOne
    @JoinColumn(name = "prestataire_id", nullable = false)
    private Prestataire prestataire; // Prestataire postulant

    @ManyToOne
    @JoinColumn(name = "offre_id", nullable = false)
    private Offre offre; // Offre associée à la postulation
}

