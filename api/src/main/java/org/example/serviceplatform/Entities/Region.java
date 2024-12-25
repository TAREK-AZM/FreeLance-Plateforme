package org.example.serviceplatform.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.serviceplatform.Entities.Enums.Province;
import org.example.serviceplatform.Entities.Enums.Ville;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Region {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    private Ville ville; // Ville de la région

    @Enumerated(EnumType.STRING)
    private Province province; // Province de la région

    private String adresse; // Adresse complète de la région

    @OneToMany(cascade = CascadeType.ALL)
    private List<Utilisateur> utilisateurs;


}
