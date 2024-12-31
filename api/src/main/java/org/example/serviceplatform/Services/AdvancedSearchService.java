package org.example.serviceplatform.Services;

import org.example.serviceplatform.DTO.ServiceClientDTO;
import org.example.serviceplatform.DTO.ServiceDTO;
import org.example.serviceplatform.Entities.Region;
import org.example.serviceplatform.Entities.Service;
import org.example.serviceplatform.Mappers.ServiceMapper;
import org.example.serviceplatform.Repositories.ServiceRepo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
@org.springframework.stereotype.Service
public class AdvancedSearchService {
    @Autowired
    private ServiceRepo serviceRepo;

    /**
     * Recherche avancée des services en fonction des mots-clés et des données de localisation.
     */
    public List<ServiceClientDTO> searchMatchingServices(String userPrompt) {
        // Extraction des mots-clés (API Groq)
        List<String> keywords = extractKeywordsFromPrompt(userPrompt);

        // Extraction des informations de localisation
        Map<String, String> locationData = extractLocationFromPrompt(userPrompt);

        // Recherche des services correspondants
        return serviceRepo.findAll().stream()
                .filter(service -> isServiceMatching(service, keywords, locationData))
                .map(ServiceMapper::toServiceClientDTO)
                .collect(Collectors.toList());
    }

    /**
     * Vérifie si un service correspond aux mots-clés et à la localisation.
     */
    private boolean isServiceMatching(Service service, List<String> keywords, Map<String, String> locationData) {
        String combinedText = (service.getTitre() + " " + service.getDescription()).toLowerCase();

        // Correspondance des mots-clés
        boolean keywordMatch = keywords.stream().anyMatch(combinedText::contains);

        // Correspondance des données de localisation
        boolean locationMatch = true;
        Region region = service.getPrestataire().getRegion();
        if (region != null) {
            String regionText = (region.getVille() + " " + region.getProvince() + " " + region.getAdresse()).toLowerCase();
            locationMatch = locationData.values().stream()
                    .anyMatch(location -> isFuzzyMatch(regionText, location));
        }

        return keywordMatch && locationMatch;
    }

    /**
     * Vérifie une correspondance approximative (fautes d'orthographe, etc.).
     */
    private boolean isFuzzyMatch(String text, String keyword) {
        if (text.contains(keyword.toLowerCase())) {
            return true;
        }
        return levenshteinDistance(text, keyword.toLowerCase()) <= 2; // Tolérance de 2 caractères
    }

    /**
     * Calcul de la distance de Levenshtein.
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
     * Convertit un service en ServiceClientDTO.
     */

    /**
     * Extraction des mots-clés à partir du texte utilisateur.
     */
    private List<String> extractKeywordsFromPrompt(String prompt) {
        // Appel à l'API Groq ou implémentation locale
        return Arrays.asList(prompt.toLowerCase().split("\\s+")); // Simplifié pour exemple
    }

    /**
     * Extraction des données de localisation à partir du texte utilisateur.
     */
    private Map<String, String> extractLocationFromPrompt(String prompt) {
        Map<String, String> locationData = new HashMap<>();
        // Recherche des noms de villes, adresses, etc. (peut être enrichi avec une API ou une base de données)
        locationData.put("ville", extractPattern(prompt, ".*?(\\b[Rr]abat\\b|\\b[Cc]asablanca\\b|\\b[Ff]ès\\b).*"));
        return locationData;
    }

    /**
     * Extraction d'une chaîne correspondant à un motif.
     */
    private String extractPattern(String text, String regex) {
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(text);
        return matcher.find() ? matcher.group(1) : "";
    }
}
