package org.example.serviceplatform.Repositories;

import org.example.serviceplatform.Entities.Client;
import org.example.serviceplatform.Entities.Evaluation;
import org.example.serviceplatform.Entities.Service;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EvaluationRepo extends JpaRepository<Evaluation, Integer> {
    List<Evaluation> findByServiceId(Integer serviceId);


    Optional<Evaluation> findByClientAndService(Client client, Service service);
}
