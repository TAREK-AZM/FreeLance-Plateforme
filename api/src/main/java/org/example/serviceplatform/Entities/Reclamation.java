package org.example.serviceplatform.Entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reclamation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String subject; // Sujet de la réclamation
    private String content; // Contenu ou description de la réclamation
    private LocalDateTime date; // Date de création de la réclamation

    private String status; // Statut de la réclamation (ex: "EN_ATTENTE", "TRAITÉE", "FERMÉE")



    @ManyToOne
    @JoinColumn(name = "user_id") // Clé étrangère vers l'utilisateur
    private Utilisateur utilisateur; // Correspond au "mappedBy" dans l'entité Utilisateur

}