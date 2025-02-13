package org.example.serviceplatform.Mappers;

import org.example.serviceplatform.DTO.ClientDTO;
import org.example.serviceplatform.Entities.Client;

public class ClientMapper {
    public static ClientDTO toClientDTO(Client client) {
        return ClientDTO.builder()
                .id(client.getId())
                .nom(client.getNom())
                .prenom(client.getPrenom())
                .email(client.getEmail())
                .telephone(client.getTelephone())
                .score(client.getScore())
                .ville(client.getVille())
                .adresse(client.getAdresse())
                .imageUrl(client.getImageUrl())
                .build();

    }
}
