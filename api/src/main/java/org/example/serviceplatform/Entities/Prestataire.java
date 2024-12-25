package org.example.serviceplatform.Entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity
@DiscriminatorValue("Prestataire") // Spécifie le type pour l'héritage "SINGLE_TABLE"
@Data
@NoArgsConstructor
@SuperBuilder
public class Prestataire extends Utilisateur {

    private String description; // Description du prestataire
    private String imageUrl;    // URL de l'image de profil du prestataire

    @OneToMany(mappedBy = "prestataire", cascade = CascadeType.ALL)
    private List<Service> services; // Liste des services proposés par le prestataire

    @OneToMany(mappedBy = "prestataire", cascade = CascadeType.ALL)
    private List<Certification> certifications; // Certifications du prestataire

    @ManyToMany(mappedBy = "prestataires", cascade = CascadeType.ALL)
    private List<Competence> competences; // Compétences du prestataire

    @OneToMany(mappedBy = "prestataire", cascade = CascadeType.ALL)
    private List<Postulation> postulats; // Liste des postulats effectués par ce prestataire


}