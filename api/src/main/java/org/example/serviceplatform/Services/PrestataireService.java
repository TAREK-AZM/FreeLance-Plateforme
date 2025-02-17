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
import java.util.List;
import java.util.stream.Collectors;

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
        if (prestataireUpdated.getNom() != null) prestataire.setNom(prestataireUpdated.getNom());
        if (prestataireUpdated.getPrenom() != null) prestataire.setPrenom(prestataireUpdated.getPrenom());
        if (prestataireUpdated.getDescription() != null) prestataire.setDescription(prestataireUpdated.getDescription());
        if (prestataireUpdated.getEmail() != null) prestataire.setEmail(prestataireUpdated.getEmail());
        if (prestataireUpdated.getTelephone() != null) prestataire.setTelephone(prestataireUpdated.getTelephone());
        if (prestataireUpdated.getAdresse() != null) prestataire.setAdresse(prestataireUpdated.getAdresse());
        if (prestataireUpdated.getVille() != null) prestataire.setVille(prestataireUpdated.getVille());
        // 📂 Gérer l'upload d'image
        if (imageFile != null && !imageFile.isEmpty()) {
            String UPLOAD_DIR = "uploads/images/prestataires/";

            try {
                System.out.println("Avant suppression de l'ancienne image !");

                // 📁 Vérifier si le dossier existe, sinon le créer
                Path uploadPath = Paths.get(UPLOAD_DIR);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                // 🚀 **SUPPRESSION DE L'ANCIENNE IMAGE**
                if (prestataire.getImageUrl() != null) {
                    String oldImagePathStr = prestataire.getImageUrl().replace("/images/prestataires/", "");
                    Path oldImagePath = Paths.get(UPLOAD_DIR + oldImagePathStr);
                    System.out.println("Ancienne image : " + oldImagePath);
                    // Si l'ancienne image existe, la supprimer
                    if (Files.exists(oldImagePath)) {
                        System.out.println("Suppression de l'ancienne image...");
                        Files.delete(oldImagePath); // 🚨 Supprimer l'ancienne image
                    }
                }

                // 🏷️ Définir un nom de fichier unique pour la nouvelle image
                String fileName = "prestataire_" + idPrest + "_" + System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
                Path filePath = uploadPath.resolve(fileName);

                // 📥 Écrire le fichier sur le disque
                Files.write(filePath, imageFile.getBytes());

                // 🔗 Mettre à jour l'URL de l'image
                prestataire.setImageUrl("/images/prestataires/" + fileName);
            } catch (IOException e) {
                throw new RuntimeException("Erreur lors de l'enregistrement de l'image : " + e.getMessage());
            }
        }

        // 💾 Sauvegarder le prestataire mis à jour
        prestataireRepo.save(prestataire);
    }

    public List<PrestataireProfilDTO> getAllPrestataires(){
        return prestataireRepo.findAll().stream().map(PrestataireMapper::toPrestProfilDTO).collect(Collectors.toList());
    }



}
