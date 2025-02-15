package org.example.serviceplatform.Services;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Service
public class ImageService {

    // Répertoire des images
    private static final String IMAGE_DIR = "uploads/images/";

    // Méthode pour récupérer l'image
    public ResponseEntity<Resource> getImage(String imagePath) {
        try {
            // Créer un objet Path pour le fichier image
            Path fullImagePath = Paths.get(IMAGE_DIR + imagePath);

            // Charger l'image
            Resource resource = new FileSystemResource(fullImagePath);
            System.out.println("---------------"+resource.getFilename());

            // Vérifier si l'image existe
            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            // Déterminer le type MIME en fonction de l'extension du fichier
            String contentType = Files.probeContentType(fullImagePath);
            return ResponseEntity.ok()
                    .contentType(org.springframework.http.MediaType.parseMediaType(contentType))
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }
}