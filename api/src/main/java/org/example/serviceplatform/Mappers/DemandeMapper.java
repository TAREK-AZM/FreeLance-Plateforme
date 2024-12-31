package org.example.serviceplatform.Mappers;

import org.example.serviceplatform.DTO.DemandeDTO;
import org.example.serviceplatform.Entities.DemandeClient;

public class DemandeMapper {
    public static DemandeDTO toDemandeDTO(DemandeClient demande) {
        return DemandeDTO.builder()
                .id(demande.getId())
                .status(demande.getStatus().toString())
                .dateDemande(demande.getDateDemande())
                .service(ServiceMapper.toServiceDTO(demande.getService()) )
                .client(ClientMapper.toClientDTO(demande.getClient()))
                .build();
    }
}
