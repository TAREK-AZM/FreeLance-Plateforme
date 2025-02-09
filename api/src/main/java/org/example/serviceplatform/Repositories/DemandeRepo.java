package org.example.serviceplatform.Repositories;

import org.example.serviceplatform.Entities.Client;
import org.example.serviceplatform.Entities.DemandeClient;
import org.example.serviceplatform.Entities.Enums.StatusDemande;
import org.example.serviceplatform.Entities.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DemandeRepo extends JpaRepository<DemandeClient, Integer> {

    @Query("SELECT d FROM DemandeClient d WHERE d.service.prestataire.id = :prestataireId")
    List<DemandeClient> findDemandesByPrestataireId(@Param("prestataireId") Integer prestataireId);

    boolean existsByServiceAndClientAndStatusIn(Service service, Client client, List<StatusDemande> list);
}
