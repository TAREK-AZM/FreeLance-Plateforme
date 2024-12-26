package org.example.serviceplatform.DPO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.example.serviceplatform.Entities.Competence;
import org.example.serviceplatform.Entities.Region;

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
    private Region region;
    List<Competence> competences;
    List<CertificationDTO> certifications;

}
