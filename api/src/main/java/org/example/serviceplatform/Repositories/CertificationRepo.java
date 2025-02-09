package org.example.serviceplatform.Repositories;

import org.example.serviceplatform.Entities.Certification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CertificationRepo extends JpaRepository<Certification, Integer> {
    boolean existsByImageUrl(String imageUrl);
}
