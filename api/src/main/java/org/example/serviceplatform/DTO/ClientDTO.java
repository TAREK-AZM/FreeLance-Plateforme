package org.example.serviceplatform.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ClientDTO {
    private Integer id;
    private String nom;
    private String prenom;
    private String email;
    private String telephone;
    private Integer score;
    private String adresse;
    private String imageUrl;
    private String ville;
}
