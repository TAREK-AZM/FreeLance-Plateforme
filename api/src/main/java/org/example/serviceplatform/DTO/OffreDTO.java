package org.example.serviceplatform.DTO;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class OffreDTO {
    private String title;
    private String description;
    private LocalDateTime creationDate;

}