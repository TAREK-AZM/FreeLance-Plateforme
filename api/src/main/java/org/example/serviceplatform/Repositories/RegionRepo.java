package org.example.serviceplatform.Repositories;

import org.example.serviceplatform.Entities.Enums.Province;
import org.example.serviceplatform.Entities.Enums.Ville;
import org.example.serviceplatform.Entities.Region;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RegionRepo extends JpaRepository<Region, Integer> {
    Region findByVilleAndProvinceAndAdresse(Ville ville, Province province, String adresse);
}
