package org.example.serviceplatform.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.serviceplatform.Entities.Category;
import org.example.serviceplatform.Entities.Prestataire;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ServiceClientDTO {
    private Integer id;
    private String titre;
    private String description;
    private Double prix; // Prix du service
    private Boolean status;
    private String image;
    private PrestataireDTO prestataire;
    private Category category;
}
