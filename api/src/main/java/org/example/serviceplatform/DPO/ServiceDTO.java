package org.example.serviceplatform.DPO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceDTO {
    private Integer id;
    private String titre;
    private String description;
    private Float prix; // Prix du service
    private Boolean status; // Disponibilité du serv
}
