package org.example.serviceplatform.Repositories;

import org.example.serviceplatform.Entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepo extends JpaRepository<Client, Integer> {
    //Optional<Region> findByVilleAndProvinceAndAdresse(Ville ville, Province province, String adresse);
}
