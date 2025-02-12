package org.example.serviceplatform.Repositories;

import org.example.serviceplatform.Entities.Favoris;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavorisRepo extends JpaRepository<Favoris, Integer> {
}
