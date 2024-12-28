package org.example.serviceplatform.Repositories;

import org.example.serviceplatform.Entities.Category;
import org.example.serviceplatform.Entities.Enums.TypeCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepo extends JpaRepository<Category, Integer> {
    Optional<Category> findByName(TypeCategory categoryName);

}
