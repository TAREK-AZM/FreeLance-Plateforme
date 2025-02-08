package org.example.serviceplatform.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PrestataireDTO {
    private Integer id;
    private String prenom;
    private String nom;
    private String email;
    private String telephone;
    private String description;
    private String imageUrl;
    private String adresse;
    private String ville;

}
