package org.example.serviceplatform.Mappers;

import org.example.serviceplatform.DTO.FavorisDTO;
import org.example.serviceplatform.DTO.ServiceDTO;
import org.example.serviceplatform.Entities.Favoris;


public class FavorisMapper {
    public static FavorisDTO toFavorisDTO(Favoris favoris) {
        ServiceDTO  serviceDTO = ServiceMapper.toServiceDTO( favoris.getService());
        return FavorisDTO.builder()
                .id(favoris.getId())
                .dateAjout(favoris.getDateAjout())
                .serviceDTO(serviceDTO)
                .build();
    }
}
