package org.example.serviceplatform.Mappers;

import org.example.serviceplatform.DTO.ServiceClientDTO;
import org.example.serviceplatform.DTO.ServiceDTO;
import org.example.serviceplatform.Entities.Service;

public class ServiceMapper {
    public static ServiceDTO toServiceDTO(Service service){
        return ServiceDTO.builder()
                .id(service.getId())
                .description(service.getDescription())
                .titre(service.getTitre())
                .prix(service.getPrix())
                .status(service.getStatus())
                //.categoryDTO(CategoryMapper.toCategoryDTO(service.getCategory()))
                .category(service.getCategory())
                .build();

    }
    public static ServiceClientDTO toServiceClientDTO(Service service){
        return ServiceClientDTO.builder()
                .id(service.getId())
                .description(service.getDescription())
                .titre(service.getTitre())
                .prix(service.getPrix())
                .status(service.getStatus())
                .prestataire(PrestataireMapper.toPrestataireDTO(service.getPrestataire()))
                .category(service.getCategory())
                .build();

    }
}
