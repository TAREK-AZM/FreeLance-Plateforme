package org.example.serviceplatform.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.serviceplatform.Entities.Category;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceDTO {
    private Integer id;
    private String titre;
    private String description;
    private Double prix; // Prix du service;
    private Boolean status;
    private String image;
    //private CategoryDTO categoryDTO;// Disponibilité du serv
    private Category category;
}
