package org.example.serviceplatform.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;


import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;        // Nom de la catégorie
    @Column(length = 1000)
    private String description;// Description de la catégorie
    private  String image;

    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private List<Service> services; // Liste des services appartenant à cette catégorie
}
