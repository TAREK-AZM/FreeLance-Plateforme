package org.example.serviceplatform.Entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity
@DiscriminatorValue("Client")
@Data
@NoArgsConstructor
@SuperBuilder
public class Client extends Utilisateur {

    // Relation avec la table `Favoris`
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private List<Favoris> favoris;

    // Relation avec la table `Commentaire`
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private List<Commentaire> commentaires;

    // Relation avec la table `DemandeClient`
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private List<DemandeClient> demandes;

    // Relation avec la table `Evaluation`
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private List<Evaluation> evaluations;


    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private List<Offre> offres; // Liste des offres postées par le client




    // Vous pouvez ajouter des méthodes ou des champs spécifiques au client ici
}
