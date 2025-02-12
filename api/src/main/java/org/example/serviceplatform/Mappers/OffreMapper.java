package org.example.serviceplatform.Mappers;

import org.example.serviceplatform.DTO.OffreDTO;
import org.example.serviceplatform.Entities.Offre;

public class OffreMapper {
    public static OffreDTO toOffreDTO(Offre offre) {
        return OffreDTO.builder()
                .id(offre.getId())
                .title(offre.getTitle())
                .description(offre.getDescription())
                .image(offre.getImage())
                .dateCreation(offre.getDateCreation())
                .dateExpiration(offre.getDateExpiration())
                .ville(offre.getVille())
                .status(offre.getStatus())
                .prix(offre.getPrix())
                .build();
    }
}
