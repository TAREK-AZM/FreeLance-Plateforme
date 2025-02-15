package org.example.serviceplatform.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.serviceplatform.Entities.Client;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentaireDTO {
    private Integer id;
    private String content;
    private LocalDateTime datePosted;
    private ClientDTO client; // Client ayant laissé le commentaire


}
