package org.example.serviceplatform.Repositories;

import org.example.serviceplatform.Entities.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface ServiceRepo extends JpaRepository<Service, Integer> {

    @Query("SELECT s FROM Service s WHERE " +
            "LOWER(s.titre) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(s.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Service> searchByKeywords(@Param("keyword") String keyword);
}
