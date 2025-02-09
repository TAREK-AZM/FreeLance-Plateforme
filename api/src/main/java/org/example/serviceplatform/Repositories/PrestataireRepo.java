package org.example.serviceplatform.Repositories;

import org.example.serviceplatform.Entities.Prestataire;
import org.example.serviceplatform.Entities.Service;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PrestataireRepo extends JpaRepository<Prestataire, Integer> {
    Optional<Prestataire> findByEmail(String email);
    Optional<Prestataire> findById(Integer id);
}
