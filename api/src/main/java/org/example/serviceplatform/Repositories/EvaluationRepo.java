package org.example.serviceplatform.Repositories;

import org.example.serviceplatform.Entities.Evaluation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EvaluationRepo extends JpaRepository<Evaluation, Integer> {
    List<Evaluation> findByServiceId(Integer serviceId);
}
