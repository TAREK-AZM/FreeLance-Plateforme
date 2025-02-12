package org.example.serviceplatform.Repositories;

import org.example.serviceplatform.Entities.Offre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OffreRepo extends JpaRepository<Offre, Integer> {

   // List<Offre> findByClientId(int clientId);
}
