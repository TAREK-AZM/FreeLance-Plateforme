package org.example.serviceplatform.Mappers;

import org.example.serviceplatform.DTO.EvaluationDTO;
import org.example.serviceplatform.Entities.Evaluation;

public class EvaluationMapper {
    public static EvaluationDTO toevalutationDTO(Evaluation evaluation) {
        return EvaluationDTO.builder()
                .id(evaluation.getId())
                .etoiles(evaluation.getEtoiles())
                .clientNom(evaluation.getClient().getNom())
                .serviceTitre(evaluation.getService().getTitre())
                .build();
    }

}
