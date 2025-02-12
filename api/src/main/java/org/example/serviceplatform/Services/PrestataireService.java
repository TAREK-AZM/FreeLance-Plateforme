package org.example.serviceplatform.Services;

import org.example.serviceplatform.DTO.PrestataireProfilDTO;
import org.example.serviceplatform.Entities.Prestataire;
import org.example.serviceplatform.Mappers.PrestataireMapper;
import org.example.serviceplatform.Repositories.PrestataireRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class PrestataireService {
    @Autowired
    private PrestataireRepo prestataireRepo;


    ///////////////////////////         Profil         /////////////////////////////////
    public PrestataireProfilDTO getPrestataire(Integer id) {
        if (id == null) {
            throw new IllegalArgumentException("L'ID du prestataire ne peut pas être null.");
        }
        return PrestataireMapper.toPrestProfilDTO(prestataireRepo.findById(id).orElseThrow(()->new RuntimeException("not found ")));
    }
    public void updatePrestataire(Integer idPrest, Prestataire prestataireUpdated, MultipartFile imageFile) {
        // 🔍 Vérifier si le prestataire existe
        Prestataire prestataire = prestataireRepo.findById(idPrest)
                .orElseThrow(() -> new RuntimeException("Prestataire non trouvé avec l'ID: " + idPrest));

        // 🛠️ Mettre à jour les champs
        prestataire.setNom(prestataireUpdated.getNom());
        prestataire.setPrenom(prestataireUpdated.getPrenom());
        prestataire.setDescription(prestataireUpdated.getDescription());
        prestataire.setEmail(prestataireUpdated.getEmail());
        prestataire.setTelephone(prestataireUpdated.getTelephone());
        prestataire.setAdresse(prestataireUpdated.getAdresse());
        prestataire.setVille(prestataireUpdated.getVille());

        // 📂 Gérer l'upload d'image
        if (imageFile != null && !imageFile.isEmpty()) {
            String UPLOAD_DIR = "src/main/resources/static/images/prestataires/";

            try {
                // 📁 Vérifier si le dossier existe, sinon le créer
                Path uploadPath = Paths.get(UPLOAD_DIR);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                // 🏷️ Définir un nom de fichier unique
                String fileName = "prestataire_" + idPrest + "_" + System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
                Path filePath = uploadPath.resolve(fileName);

                // 📥 Écrire le fichier sur le disque
                Files.write(filePath, imageFile.getBytes());

                // 🔗 Mettre à jour l'URL de l'image
                prestataire.setImageUrl("/api/prestataires/images/" + fileName);
            } catch (IOException e) {
                throw new RuntimeException("Erreur lors de l'enregistrement de l'image : " + e.getMessage());
            }
        }

        // 💾 Sauvegarder le prestataire mis à jour
        prestataireRepo.save(prestataire);
    }

}
