package org.example.serviceplatform.Controllers;

import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
public class ImageController {

    private static final String BASE_DIRECTORY = "uploads/images/";

    @GetMapping("/api/images/{type}/{imageName}")
    public ResponseEntity<FileSystemResource> getImage(@PathVariable String type, @PathVariable String imageName) {
        // Déterminer le répertoire en fonction du type d'image
        String directory = getDirectoryByType(type);
        if (directory == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(null); // Retourne une erreur si le type n'est pas valide
        }

        // Construire le chemin complet du fichier
        Path imagePath = Paths.get(directory + imageName);
        File imageFile = imagePath.toFile();

        // Vérifier si le fichier existe
        if (imageFile.exists()) {
            try {
                // Déterminer le type de contenu en fonction de l'extension du fichier
                String contentType = Files.probeContentType(imagePath);
                if (contentType == null) {
                    contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE; // Type par défaut si inconnu
                }

                // Créer une ressource à partir du fichier
                FileSystemResource resource = new FileSystemResource(imageFile);

                // Retourner le fichier avec le type de contenu approprié
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType)) // Définir le Content-Type
                        .body(resource);
            } catch (Exception e) {
                // En cas d'erreur, retourner une erreur 500
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(null);
            }
        } else {
            // Si l'image n'existe pas, retourner une erreur 404
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }

    private String getDirectoryByType(String type) {
        // Retourne le chemin du répertoire en fonction du type d'image
        switch (type.toLowerCase()) {
            case "services":
                return BASE_DIRECTORY + "services/";
            case "offres":
                return BASE_DIRECTORY + "offres/";
            case "prestataires":
                return BASE_DIRECTORY + "prestataires/";
            case "clients":
                return BASE_DIRECTORY + "clients/";
            case "certifications":
                return BASE_DIRECTORY + "certifications/";
            default:
                return null; // Type non reconnu
        }
    }
}