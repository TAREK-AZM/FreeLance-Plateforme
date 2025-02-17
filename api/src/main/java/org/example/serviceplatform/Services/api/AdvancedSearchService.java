package org.example.serviceplatform.Services.api;

import org.example.serviceplatform.DTO.ServiceClientDTO;
import org.example.serviceplatform.Entities.Competence;
import org.example.serviceplatform.Entities.Service;
import org.example.serviceplatform.Mappers.ServiceMapper;
import org.example.serviceplatform.Repositories.CategoryRepo;
import org.example.serviceplatform.Repositories.CompetenceRepo;
import org.example.serviceplatform.Repositories.ServiceRepo;
import org.springframework.beans.factory.annotation.Autowired;


import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class AdvancedSearchService {

    @Autowired
    private ServiceRepo serviceRepo;

    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private GroqService groqService;  // Utilisation du service Groq pour obtenir des mots-clés optimisés
    @Autowired
    private CompetenceRepo competenceRepo;

    /**
     * Recherche dynamique des services en fonction des mots-clés et de la localisation extraits du prompt utilisateur.
     */
    public List<ServiceClientDTO> searchMatchingServices(String userPrompt) {
        // 1. Récupérer les mots-clés valides (services et catégories depuis la base de données)
        List<String> validKeywords = getValidKeywords();
        System.out.println("------------------------mots-clés valides------------------------");
        System.out.println(validKeywords);

        // 2. Utiliser l'API Groq pour obtenir des mots-clés optimisés
        List<String> optimizedKeywords = groqService.hGroq(userPrompt, validKeywords); // Filtrer les mots-clés via Groq
        System.out.println("------------------------mots-clés optimisés par Groq------------------------");
        System.out.println(optimizedKeywords);



        // 4. Recherche des services correspondants en filtrant selon les mots-clés OU les compétences
        return serviceRepo.findAll().stream()
                .filter(service -> isServiceMatching(service, optimizedKeywords))
                .map(ServiceMapper::toServiceClientDTO)
                .collect(Collectors.toList());
    }

    /**
     * Vérifie si un service correspond aux mots-clés OU aux compétences.
     */
    private boolean isServiceMatching(Service service, List<String> keywords) {
        // Vérification des mots-clés dans la description (priorité plus haute)
        String descriptionText = (service.getDescription() != null) ? service.getDescription().toLowerCase() : "";
        boolean keywordMatchInDescription = keywords.stream()
                .anyMatch(keyword -> isFuzzyMatch(descriptionText, keyword));

        if (keywordMatchInDescription) {
            return true;  // Si une correspondance est trouvée dans la description, on retourne true
        }

        // Si aucun match dans la description, vérifier dans le titre
        String titleText = (service.getTitre() != null) ? service.getTitre().toLowerCase() : "";
        boolean keywordMatchInTitle = keywords.stream()
                .anyMatch(keyword -> isFuzzyMatch(titleText, keyword));

        return keywordMatchInTitle;  // Retourner vrai si une correspondance est trouvée dans le titre
    }


    /**
     * Vérifie une correspondance approximative entre le texte et le mot-clé (corrections mineures comme les fautes d'orthographe).
     */
    private boolean isFuzzyMatch(String text, String keyword) {
        if (text.contains(keyword.toLowerCase())) {
            return true;
        }
        return levenshteinDistance(text, keyword.toLowerCase()) <= 2; // Tolérance de 2 caractères
    }

    /**
     * Calcul de la distance de Levenshtein (mesure de similarité entre deux chaînes de caractères).
     */
    private int levenshteinDistance(String a, String b) {
        int[][] dp = new int[a.length() + 1][b.length() + 1];
        for (int i = 0; i <= a.length(); i++) {
            for (int j = 0; j <= b.length(); j++) {
                if (i == 0) {
                    dp[i][j] = j;
                } else if (j == 0) {
                    dp[i][j] = i;
                } else {
                    dp[i][j] = Math.min(
                            Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1),
                            dp[i - 1][j - 1] + (a.charAt(i - 1) == b.charAt(j - 1) ? 0 : 1)
                    );
                }
            }
        }
        return dp[a.length()][b.length()];
    }


    /**
     * Récupérer les mots-clés valides depuis la base de données.
     * Cela inclut les titres des services et les noms des catégories.
     */
    public List<String> getValidKeywords() {
        // Récupérer tous les titres des services et les noms des catégories depuis la base de données
        List<String> serviceTitles = serviceRepo.findAll().stream()
                .map(service -> service.getTitre().toLowerCase()) // Récupérer les titres des services
                .collect(Collectors.toList());

        List<String> categoryNames = categoryRepo.findAll().stream()
                .map(category -> category.getName().toLowerCase()) // Récupérer les noms des catégories
                .collect(Collectors.toList());

        // Ajouter les noms des catégories aux mots-clés valides
        serviceTitles.addAll(categoryNames);

        return serviceTitles;
    }
}