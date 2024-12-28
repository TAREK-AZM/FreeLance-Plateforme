package org.example.serviceplatform.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.example.serviceplatform.Entities.Enums.TypeCategory;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
      @Enumerated(EnumType.STRING)
    private TypeCategory name;        // Nom de la catégorie
    private String description; // Description de la catégorie

    @OneToMany(mappedBy = "category")

    private List<Service> services; // Liste des services appartenant à cette catégorie
}
