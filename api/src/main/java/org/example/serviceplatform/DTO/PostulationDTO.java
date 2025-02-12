package org.example.serviceplatform.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.serviceplatform.Entities.Enums.StatutPost;

import java.time.LocalDateTime;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostulationDTO {
    private Integer id;
    private String description;
    private Double prix;
    private StatutPost status;
    private LocalDateTime datePostulation;
    private PrestataireDTO prestataire;
}
