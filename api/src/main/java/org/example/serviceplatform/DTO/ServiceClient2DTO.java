package org.example.serviceplatform.DTO;

import lombok.Builder;
import lombok.Data;
import org.example.serviceplatform.Entities.Category;
@Data
@Builder
public class ServiceClient2DTO {
    private Integer id;
    private String titre;
    private String description;
    private Double prix; // Prix du service
    private Boolean status;
    private String image;
    private PrestataireProfilDTO prestataire;
    private Category category;
}
