package org.example.serviceplatform.DTO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.example.serviceplatform.Entities.Competence;

import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PrestataireProfilDTO {
    private Integer id;
    private String prenom;
    private String nom;
    private String email;
    private String telephone;
    private String description;
    private String imageUrl;
    private String adresse;
    private String ville;
    List<Competence> competences;
    List<CertificationDTO> certifications;

}
