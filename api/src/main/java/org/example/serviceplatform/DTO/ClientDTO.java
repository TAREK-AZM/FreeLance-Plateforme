package org.example.serviceplatform.DTO;

import lombok.Builder;
import lombok.Data;
import org.example.serviceplatform.Entities.Region;

@Data
@Builder
public class ClientDTO {
    private Integer id;
    private String nom;
    private String prenom;
    private String email;
    private String telephone;
    private Integer score;
    private Region region;
}
