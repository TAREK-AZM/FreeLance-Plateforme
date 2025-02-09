package org.example.serviceplatform.Repositories;

import org.example.serviceplatform.Entities.Utilisateur;
import org.example.serviceplatform.Entities.Validation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ValidationRepo extends JpaRepository<Validation, Integer> {
    Optional<Validation> findByCode(String code);

    List<Validation> findByUser(Utilisateur user);

    @Modifying
    @Query(value = "DELETE FROM validation WHERE user_id = :userId", nativeQuery = true)
    void deleteByUserId(@Param("userId") Integer userId);
    void deleteByUser(Utilisateur User);
}