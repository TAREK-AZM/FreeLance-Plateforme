package org.example.serviceplatform.Repositories;

import org.example.serviceplatform.Entities.Client;
import org.example.serviceplatform.Entities.Commentaire;
import org.example.serviceplatform.Entities.Evaluation;
import org.example.serviceplatform.Entities.Service;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentaireRepo extends JpaRepository<Commentaire, Integer> {

    List<Commentaire> findByServiceId(int serviceId);
    List<Commentaire> findByClientAndService(Client client, Service service);
}
