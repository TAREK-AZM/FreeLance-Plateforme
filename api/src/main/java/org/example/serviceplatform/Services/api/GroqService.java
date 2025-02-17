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

    /**
     * Méthode qui interroge l'API Groq et récupère des mots-clés optimisés en fonction du prompt et des mots-clés valides.
     * Ici, nous envoyons un prompt avec des explications claires pour générer des mots-clés.
     */
    public List<String> hGroq(String userPrompt, List<String> validKeywords) {
        // Configurer les en-têtes
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.set("Content-Type", "application/json");

        // Construire le corps de la requête avec un prompt clair et concis
        String requestBody = """
        {
            "model": "llama3-8b-8192",
            "messages": [
                {
                    "role": "user",
                    "content": "Extrait les mots-clés essentiels de la phrase suivante, en excluant les mots inutiles comme 'je', 'cherche', etc. Retourne uniquement les mots-clés pertinents, séparés par des virgules, sans aucune autre explication ou texte. Phrase : '%s'"
                }
            ]
        }
        """.formatted(userPrompt);

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        // Envoyer la requête à l'API Groq
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity, Map.class);

        // Analyser la réponse pour extraire les mots-clés
        Map<String, Object> responseBody = response.getBody();
        List<String> extractedKeywords = new ArrayList<>();

        if (responseBody != null && responseBody.containsKey("choices")) {
            List<?> choices = (List<?>) responseBody.get("choices");
            if (!choices.isEmpty()) {
                // Convertir le premier élément en Map pour accéder à "message"
                Map<?, ?> choice = (Map<?, ?>) choices.get(0);
                Map<?, ?> message = (Map<?, ?>) choice.get("message");
                if (message != null && message.containsKey("content")) {
                    String content = (String) message.get("content");

                    // Nettoyer la réponse pour ne garder que les mots-clés
                    extractedKeywords = Arrays.stream(content.split(","))
                            .map(String::trim) // Supprimer les espaces inutiles
                            .filter(keyword -> !keyword.isEmpty()) // Ignorer les chaînes vides
                            .collect(Collectors.toList());


                }
                System.out.println("----------------------mots-clés optimisés depuis groq------------------");
                System.out.println(extractedKeywords);
            }
        }

        // Filtrer les mots-clés extraits pour ne garder que ceux qui existent dans la base de données
        // extractedKeywords.retainAll(validKeywords);
        System.out.println("----------------------AAAListe des mots-clés optimisés------------------");
        System.out.println(extractedKeywords);
        return extractedKeywords;
    }
}