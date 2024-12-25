package org.example.serviceplatform.Entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Evaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    private Service service;

    private float etoiles; // Note donnée au service



}
