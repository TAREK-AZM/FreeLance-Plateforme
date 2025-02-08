package org.example.serviceplatform.Services.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.regex.*;
import java.util.stream.Collectors;

@Service
public class GroqService {

    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${groq.api.url}")
    private String apiUrl;

    public List<String> analyzeQuery(String userPrompt) {
        // Configurer les en-têtes
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.set("Content-Type", "application/json");

        // Construire le corps de la requête
        String requestBody = """
                {
                    "model": "llama3-8b-8192",
                    "messages": [
                        {
                            "role": "user",
                            "content": "%s"
                        }
                    ]
                }
                """.formatted(userPrompt);

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        // Envoyer la requête
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity, Map.class);

        // Analyser la réponse pour extraire les mots-clés
        Map<String, Object> responseBody = response.getBody();
        if (responseBody != null && responseBody.containsKey("choices")) {
            List<?> choices = (List<?>) responseBody.get("choices");
            if (!choices.isEmpty()) {
                // Convertir le premier élément en Map pour accéder à "message"
                Map<?, ?> choice = (Map<?, ?>) choices.get(0);
                Map<?, ?> message = (Map<?, ?>) choice.get("message");
                if (message != null && message.containsKey("content")) {
                    String content = (String) message.get("content");
                    return extractKeywords(content);
                }
            }
        }
        return Collections.emptyList();
    }

    /**
     * Extraire les mots-clés d'un texte
     * @param content Contenu textuel analysé
     * @return Liste des mots-clés extraits
     */
    private List<String> extractKeywords(String content) {
        // Utiliser une approche basée sur les expressions régulières pour extraire des mots significatifs
        Pattern pattern = Pattern.compile("\\b[a-zA-ZÀ-ÿ]{4,}\\b");
        Matcher matcher = pattern.matcher(content);

        List<String> keywords = new ArrayList<>();
        while (matcher.find()) {
            keywords.add(matcher.group().toLowerCase());
        }

        // Supprimer les doublons et retourner la liste
        return keywords.stream().distinct().collect(Collectors.toList());
    }
}
