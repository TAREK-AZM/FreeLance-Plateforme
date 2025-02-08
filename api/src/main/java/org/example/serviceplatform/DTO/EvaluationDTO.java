package org.example.serviceplatform.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EvaluationDTO {
    private Integer id;
    private float etoiles;
    private String clientNom; // Nom du client ayant fait l'évaluation
    private String serviceTitre; // Titre du service évalué
}