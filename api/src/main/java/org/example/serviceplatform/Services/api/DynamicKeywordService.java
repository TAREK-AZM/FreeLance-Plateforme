package org.example.serviceplatform.Services.api;

import org.example.serviceplatform.DTO.ServiceDTO;
import org.example.serviceplatform.Mappers.ServiceMapper;
import org.example.serviceplatform.Repositories.ServiceRepo;
import org.springframework.beans.factory.annotation.Autowired;


import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class DynamicKeywordService {

    @Autowired
    private ServiceRepo serviceRepo;

    // Récupère tous les mots-clés uniques des services
    public Set<String> extractKeywordsFromServices() {
        return serviceRepo.findAll().stream()
                .flatMap(service -> {
                    // Combine les titres et descriptions
                    String combinedText = service.getTitre() + " " + service.getDescription();
                    // Divise en mots, supprime les doublons et met en minuscule
                    return Arrays.stream(combinedText.split("\\s+"))
                            .map(String::toLowerCase)
                            .map(word -> word.replaceAll("[^a-zA-Z0-9éèàç]", "")); // Supprime les caractères spéciaux
                })
                .filter(word -> word.length() > 2) // Ignorer les mots trop courts
                .collect(Collectors.toSet());
    }

    public List<ServiceDTO> findMatchingServices(List<String> keywords) {
        // Recherche des services correspondant aux mots-clés dynamiques
        return  serviceRepo.findAll().stream()
                .filter(service -> {

                    String combinedText = (service.getTitre() + " " + service.getDescription()).toLowerCase();
                    return keywords.stream().anyMatch(combinedText::contains);
                })
                .map(ServiceMapper::toServiceDTO)
                .collect(Collectors.toList());
    }

}