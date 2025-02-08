package org.example.serviceplatform.Repositories;

import org.example.serviceplatform.Entities.Commentaire;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentaireRepo extends JpaRepository<Commentaire, Integer> {

    List<Commentaire> findByServiceId(int serviceId);
}
