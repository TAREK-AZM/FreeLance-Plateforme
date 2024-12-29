package org.example.serviceplatform.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.example.serviceplatform.Entities.Region;

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
    private Region region;

}
