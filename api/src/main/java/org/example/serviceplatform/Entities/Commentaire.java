package org.example.serviceplatform.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Commentaire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String content; // Contenu du commentaire
    private LocalDateTime datePosted; // Date de publication

    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)

    private Service service; // Service associé au commentaire

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)

    private Client client; // Client ayant laissé le commentaire
}

