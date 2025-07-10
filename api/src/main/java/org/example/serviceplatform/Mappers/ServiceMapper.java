package org.example.serviceplatform.Mappers;

import org.example.serviceplatform.DTO.ServiceClient2DTO;
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
                .image(service.getImage())
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
                .image(service.getImage())
                .prestataire(PrestataireMapper.toPrestataireDTO(service.getPrestataire()))
                .category(service.getCategory())
                .build();

    }
    public static ServiceClient2DTO toServiceClient2DTO(Service service){
        return ServiceClient2DTO.builder()
                .id(service.getId())
                .description(service.getDescription())
                .titre(service.getTitre())
                .prix(service.getPrix())
                .status(service.getStatus())
                .image(service.getImage())
                .prestataire(PrestataireMapper.toPrestProfilDTO(service.getPrestataire()))
                .category(service.getCategory())


                .build();
    }
}
