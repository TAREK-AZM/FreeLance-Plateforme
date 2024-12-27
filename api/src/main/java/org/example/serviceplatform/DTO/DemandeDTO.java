package org.example.serviceplatform.DTO;

import lombok.Builder;
import lombok.Data;
import org.example.serviceplatform.Entities.Client;
import org.example.serviceplatform.Entities.Service;

import java.time.LocalDateTime;

@Data
@Builder
public class DemandeDTO {
    private Integer id;
    private String status;
    private LocalDateTime dateDemande;
    private Service service;
    private ClientDTO client;
}