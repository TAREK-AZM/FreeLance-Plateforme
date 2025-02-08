package org.example.serviceplatform.Services;

import org.example.serviceplatform.DTO.ServiceClientDTO;
import org.example.serviceplatform.DTO.ServiceDTO;
import org.example.serviceplatform.Entities.Category;
import org.example.serviceplatform.Entities.Prestataire;
import org.example.serviceplatform.Entities.Service;
import org.example.serviceplatform.Mappers.ServiceMapper;
import org.example.serviceplatform.Repositories.CategoryRepo;
import org.example.serviceplatform.Repositories.PrestataireRepo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class CategoryService {
    @Autowired
    private CategoryRepo categoryRepo;
    @Autowired
    private PrestataireRepo prestataireRepo;

    public List<Category> getAllCategories() {
             return categoryRepo.findAll();
    }
    public List<ServiceClientDTO> getAllServicesByCategory(Integer categoryId) {
        Category category = categoryRepo.findById(categoryId).get();
        return category.getServices().stream().map(ServiceMapper::toServiceClientDTO).collect(Collectors.toList());
    }

}
