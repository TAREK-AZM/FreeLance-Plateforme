package org.example.serviceplatform.Repositories;

import org.example.serviceplatform.Entities.Service;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ServiceRepo extends JpaRepository<Service, Integer> {
}
