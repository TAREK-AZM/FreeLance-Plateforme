package org.example.serviceplatform.Entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.serviceplatform.Entities.Enums.StatutOffre;

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
    @Column(length = 4000)
    private String description;// Description de l'offre
    private float prix;
    private LocalDateTime dateCreation;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dateExpiration;//
    private String ville;
    @Enumerated(EnumType.STRING)
    private StatutOffre status;
    private String image;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client; // Client ayant posté l'offre

    @OneToMany(mappedBy = "offre", cascade = CascadeType.ALL)
    private List<Postulation> postulats; // Liste des postulats pour cette offre
}

