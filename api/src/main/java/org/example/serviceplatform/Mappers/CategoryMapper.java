package org.example.serviceplatform.Mappers;

import org.example.serviceplatform.DTO.CategoryDTO;
import org.example.serviceplatform.Entities.Category;

public class CategoryMapper {
    public static CategoryDTO toCategoryDTO(Category category) {
        return CategoryDTO.builder()
                .id(category.getId())
                .name(category.getName().name())
                .description(category.getDescription())
                .build();
    }
}
