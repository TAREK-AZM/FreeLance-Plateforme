package org.example.serviceplatform.Repositories;

import org.example.serviceplatform.Entities.Region;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegionRepo extends JpaRepository<Region, Integer> {
}
