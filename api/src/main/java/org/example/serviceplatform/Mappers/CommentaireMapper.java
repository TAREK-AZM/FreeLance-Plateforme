package org.example.serviceplatform.Mappers;

import org.example.serviceplatform.DTO.CommentaireDTO;
import org.example.serviceplatform.Entities.Commentaire;

public class CommentaireMapper {
    public static CommentaireDTO tocommentaireDTO(Commentaire commentaire) {
        return CommentaireDTO.builder()
                .id(commentaire.getId())
                .content(commentaire.getContent())
                .datePosted(commentaire.getDatePosted())
                .client(ClientMapper.toClientDTO(commentaire.getClient()))
                .build();
    }
}
