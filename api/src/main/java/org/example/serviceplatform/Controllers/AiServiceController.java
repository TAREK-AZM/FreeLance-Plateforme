package org.example.serviceplatform.Controllers;

import org.example.serviceplatform.DTO.ServiceClientDTO;
import org.example.serviceplatform.Repositories.ServiceRepo;
import org.example.serviceplatform.Services.api.AdvancedSearchService;
import org.example.serviceplatform.Services.api.DynamicKeywordService;
import org.example.serviceplatform.Services.api.GroqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai/search")
@CrossOrigin(origins = "*")
public class AiServiceController {

    @Autowired
    private GroqService groqService;

    @Autowired
    private ServiceRepo serviceRepo;
    @Autowired
    private DynamicKeywordService dynamicKeywordService;
    @Autowired
     private AdvancedSearchService advancedSearchService;

//    @PostMapping
//    public List<Service> askAi(@RequestBody Map<String, String> request) {
//        String userPrompt = request.get("prompt");
//        String response = groqService.getResponseFromGroq(userPrompt);
//        // Filtrage des services basés sur la réponse d'OpenAI
//        List<Service> services = serviceRepo.findAll();
//        return services.stream()
//                .filter(service -> service.getDescription().contains(response) ||
//                        service.getTitre().contains(response))
//                .collect(Collectors.toList());
//
//    }

//    @PostMapping
//    public List<ServiceDTO> searchServices(@RequestBody Map<String, String> request) {
//        // Étape 1 : Analyse de la requête avec l'API AI
//        String userPrompt = request.get("prompt");
//        List<String> extractedKeywords = groqService.analyzeQuery(userPrompt);
//
//        // Étape 2 : Filtrage des services en fonction des mots-clés
//        //return serviceSearch.findMatchingServices(keywords);
//        Set<String> dynamicKeywords =  dynamicKeywordService.extractKeywordsFromServices();
//        List<String> filteredKeywords = extractedKeywords.stream()
//                .filter(dynamicKeywords::contains)
//                .collect(Collectors.toList());
//        return dynamicKeywordService.findMatchingServices(filteredKeywords);
//    }
@PostMapping
public List<ServiceClientDTO> searchServices(@RequestBody Map<String, String> request) {
    String clientRequest = request.get("prompt");
    return advancedSearchService.searchMatchingServices(clientRequest);
}


}






// Envoyer la requête à Groq
//        List<String> keywords = groqService.analyzeQuery(query);
//
//        // Rechercher les services basés sur les mots-clés
//        List<Service> services = serviceRepo.searchByKeywords(keywords);
//
//        // Mapper les résultats en DTO
//        return services.stream()
//                .map(ServiceMapper::toServiceDTO)
//                .collect(Collectors.toList());

