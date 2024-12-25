package org.example.serviceplatform.Entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String subject; // Titre de la notification
    private String message; // Contenu de la notification
    private LocalDateTime date; // Date de la notification

    private boolean isRead = false; // Indique si la notification a été lue

    @ManyToOne
    @JoinColumn(name = "receiver_id", nullable = false)
    private Utilisateur receiver; // Destinataire de la notification
}
