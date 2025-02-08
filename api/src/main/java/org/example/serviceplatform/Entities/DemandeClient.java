package org.example.serviceplatform.Entities;

import jakarta.persistence.*;
import lombok.Data;
import org.example.serviceplatform.Entities.Enums.StatusDemande;

import java.time.LocalDateTime;
@Data
@Entity
public class DemandeClient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Enumerated(EnumType.STRING)
    private StatusDemande status; // ex: enAttente, enCours, terminé,annulé
    private LocalDateTime dateDemande;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private Service service; //

    // Getters, setters, et constructeurs
}
