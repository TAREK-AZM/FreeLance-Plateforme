package org.example.serviceplatform.Services;

import org.example.serviceplatform.DTO.OffreDTO;
import org.example.serviceplatform.Entities.Client;
import org.example.serviceplatform.Entities.Enums.StatutOffre;
import org.example.serviceplatform.Entities.Offre;
import org.example.serviceplatform.Mappers.OffreMapper;
import org.example.serviceplatform.Repositories.ClientRepo;
import org.example.serviceplatform.Repositories.OffreRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OffreService {
    @Autowired
    private OffreRepo offreRepo;
    @Autowired
    private ClientRepo clientRepo;


    public void createOffre(Integer clientId, Offre offreStored, MultipartFile imageFile){
        // Récupérer le client
        Client client = clientRepo.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        // Créer une nouvelle offre
        Offre offre = new Offre();
        offre.setTitle(offreStored.getTitle());
        offre.setDescription(offreStored.getDescription());
        offre.setPrix(offreStored.getPrix());
        offre.setDateCreation(LocalDateTime.now());
        offre.setDateExpiration(offreStored.getDateExpiration());
        offre.setVille(offreStored.getVille());
        offre.setStatus(StatutOffre.EN_COURS);
        offre.setClient(client);
        offreRepo.save(offre);
        // 📂 Gérer l'upload d'image
        if (imageFile != null && !imageFile.isEmpty()) {
            String UPLOAD_DIR = "uploads/images/offres/";

            try {
                // 📁 Vérifier si le dossier existe, sinon le créer
                Path uploadPath = Paths.get(UPLOAD_DIR);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                // 🏷️ Définir un nom de fichier unique
                String fileName = "offre_" + offre.getId() + "_" + System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
                Path filePath = uploadPath.resolve(fileName);

                // 📥 Écrire le fichier sur le disque
                Files.write(filePath, imageFile.getBytes());

                // 🔗 Mettre à jour l'URL de l'image
                offre.setImage("images/offres/" + fileName);

            } catch (IOException e) {
                throw new RuntimeException("Erreur lors de l'enregistrement de l'image : " + e.getMessage());
            }


        }
        // Sauvegarder l'offre
        offreRepo.save(offre);

    }
    public void updateOffre( Offre offreStored, MultipartFile imageFile){
        Offre offre=offreRepo.findById(offreStored.getId()).orElseThrow(() -> new RuntimeException("Offre not found"));
        offre.setTitle(offreStored.getTitle());
        offre.setDescription(offreStored.getDescription());
        offre.setDateExpiration(offreStored.getDateExpiration());
        offre.setVille(offreStored.getVille());
        offre.setPrix(offreStored.getPrix());
        offreRepo.save(offre);
        // 📂 Gérer l'upload d'image
        if (imageFile != null && !imageFile.isEmpty()) {
            String UPLOAD_DIR = "uploads/images/offres/";

            try {
                // 📁 Vérifier si le dossier existe, sinon le créer
                Path uploadPath = Paths.get(UPLOAD_DIR);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                // 🚀 **SUPPRESSION DE L'ANCIENNE IMAGE**
                if (offre.getImage() != null) {
                    String oldImagePathStr = offre.getImage().replace("/images/offres/", "");
                    Path oldImagePath = Paths.get(UPLOAD_DIR + oldImagePathStr);
                    System.out.println("Suppression de l'ancienne image : " + oldImagePath);
                    // Si l'ancienne image existe, la supprimer
                    if (Files.exists(oldImagePath)) {
                        Files.delete(oldImagePath); // 🚨 Supprimer l'ancienne image
                    }
                }

                // 🏷️ Définir un nom de fichier unique pour la nouvelle image
                String fileName = "offre_" + offre.getId() + "_" + System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
                Path filePath = uploadPath.resolve(fileName);

                // 📥 Écrire le fichier sur le disque
                Files.write(filePath, imageFile.getBytes());

                // 🔗 Mettre à jour l'URL de l'image
                offre.setImage("/images/offres/" + fileName);
            } catch (IOException e) {
                throw new RuntimeException("Erreur lors de l'enregistrement de l'image : " + e.getMessage());
            }
        }


    }
    public List<OffreDTO> getOffresOfClient(Integer idClient) {
        Client client=clientRepo.findById(idClient).orElseThrow(() -> new RuntimeException("Client not found"));
        return client.getOffres().stream().map(OffreMapper::toOffreDTO).collect(Collectors.toList());
    }

    public List<OffreDTO> getAllOffres(){
        return offreRepo.findAll().stream().map(OffreMapper::toOffreDTO).collect(Collectors.toList());
    }


}
