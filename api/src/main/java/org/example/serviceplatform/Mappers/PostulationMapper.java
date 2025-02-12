package org.example.serviceplatform.Mappers;

import org.example.serviceplatform.DTO.PostulationDTO;
import org.example.serviceplatform.Entities.Postulation;

public class PostulationMapper {

    public static PostulationDTO toPostulationDTO(Postulation postulation) {
        return PostulationDTO.builder()
                .id(postulation.getId())
                .description(postulation.getDescription())
                .datePostulation(postulation.getDatePostulation())
                .status(postulation.getStatus())
                .prix(postulation.getPrix())
                .prestataire(PrestataireMapper.toPrestataireDTO(postulation.getPrestataire()))
                .build();
    }

}
