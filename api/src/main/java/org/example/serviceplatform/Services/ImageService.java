package org.example.serviceplatform.Services;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Service
public class ImageService {

    // Répertoire des images
    private static final String IMAGE_DIR = "uploads/images/services/";

    // Méthode pour récupérer l'image
    public ResponseEntity<Resource> getImage(String imageName) {
        try {
            // Créer un objet Path pour le fichier image
            Path imagePath = Paths.get(IMAGE_DIR + imageName);

            // Charger l'image
            Resource resource = new FileSystemResource(imagePath);

            // Vérifier si l'image existe
            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            // Retourner l'image avec le type MIME
            return ResponseEntity.ok()
                    .contentType(org.springframework.http.MediaType.IMAGE_JPEG) // Ajustez le type MIME si nécessaire
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }
}
