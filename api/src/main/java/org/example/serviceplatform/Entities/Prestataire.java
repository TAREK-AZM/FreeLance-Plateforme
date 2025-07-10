package org.example.serviceplatform.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Entity
@DiscriminatorValue("Prestataire") // Spécifie le type pour l'héritage "SINGLE_TABLE"
@Data
@NoArgsConstructor
@SuperBuilder
public class Prestataire extends Utilisateur {
    @Column(length = 4000)
    private String description; // Description du prestataire


    @OneToMany(mappedBy = "prestataire", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Service> services; // Liste des services proposés par le prestataire

    @OneToMany(mappedBy = "prestataire", cascade = CascadeType.ALL)
    private List<Certification> certifications; // Certifications du prestataire

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "prestataire_competence", // Nom de la table de liaison
            joinColumns = @JoinColumn(name = "prestataire_id"),
            inverseJoinColumns = @JoinColumn(name = "competence_id")
    )
    private List<Competence> competences = new ArrayList<>();

    @OneToMany(mappedBy = "prestataire", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Postulation> postulats; // Liste des postulats effectués par ce prestataire


}