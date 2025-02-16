package org.example.serviceplatform.Services;

import org.example.serviceplatform.Entities.Certification;
import org.example.serviceplatform.Entities.Prestataire;
import org.example.serviceplatform.Repositories.CertificationRepo;
import org.example.serviceplatform.Repositories.PrestataireRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class CertificationService {
    @Autowired
    CertificationRepo certificationRepo;
    @Autowired
    private PrestataireRepo prestataireRepo;

    public void StoreCertification(Integer id, Certification certification, MultipartFile imageFile) {
        Prestataire prestataire = prestataireRepo.findById(id).get();
        Certification c = new Certification();
        if(certificationRepo.existsByImageUrl(certification.getImageUrl())){
            throw new RuntimeException("Certification already exists");
        }
        c.setImageUrl(certification.getImageUrl());
        c.setName(certification.getName());
        c.setDescription(certification.getDescription());
        c.setPrestataire(prestataire);

        certificationRepo.save(c);

        // 📂 Gérer l'upload d'image
        if (imageFile != null && !imageFile.isEmpty()) {
            String UPLOAD_DIR = "uploads/images/certifications/";

            try {
                // 📁 Vérifier si le dossier existe, sinon le créer
                Path uploadPath = Paths.get(UPLOAD_DIR);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                // 🏷️ Définir un nom de fichier unique avec l'ID du service
                String fileName = "certification_" + c.getId() + "_" + System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
                Path filePath = uploadPath.resolve(fileName);

                // 📥 Écrire le fichier sur le disque
                Files.write(filePath, imageFile.getBytes());

                // 🔗 Mettre à jour l'URL de l'image
                c.setImageUrl("/images/certifications/" + fileName); // Ajouter un '/' au début
                prestataire.getCertifications().add(c);

            } catch (IOException e) {
                throw new RuntimeException("Erreur lors de l'enregistrement de l'image : " + e.getMessage());
            }

        }
        certificationRepo.save(c);

    }
    public void UpdateCertification(Certification certification, MultipartFile imageFile) {
        // 🔍 Vérifier si la certification existe
        Certification c = certificationRepo.findById(certification.getId())
                .orElseThrow(() -> new RuntimeException("Certification non trouvée avec l'ID : " + certification.getId()));

        // 🛠️ Mettre à jour les informations de la certification
        c.setImageUrl(certification.getImageUrl());
        c.setName(certification.getName());
        c.setDescription(certification.getDescription());

        // 📂 Gérer l'upload d'image
        if (imageFile != null && !imageFile.isEmpty()) {
            String UPLOAD_DIR = "uploads/images/certifications/";

            try {
                // 📁 Vérifier si le dossier existe, sinon le créer
                Path uploadPath = Paths.get(UPLOAD_DIR);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                // 🚀 **SUPPRESSION DE L'ANCIENNE IMAGE**
                if (c.getImageUrl() != null) {
                    // Récupérer l'ancienne image à partir de l'URL
                    String oldImagePathStr = c.getImageUrl().replace("/images/certification/", "");
                    Path oldImagePath = Paths.get(UPLOAD_DIR + oldImagePathStr);

                    // Si l'ancienne image existe, la supprimer
                    if (Files.exists(oldImagePath)) {
                        Files.delete(oldImagePath); // 🚨 Supprimer l'ancienne image
                    }
                }

                // 🏷️ Définir un nom de fichier unique pour la nouvelle image
                String fileName = "certification_" + c.getId() + "_" + System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
                Path filePath = uploadPath.resolve(fileName);

                // 📥 Écrire le fichier sur le disque
                Files.write(filePath, imageFile.getBytes());

                // 🔗 Mettre à jour l'URL de l'image dans la certification
                c.setImageUrl("/images/certification/" + fileName);

            } catch (IOException e) {
                throw new RuntimeException("Erreur lors de l'enregistrement de l'image : " + e.getMessage());
            }
        }

        // 💾 Sauvegarder la certification mise à jour
        certificationRepo.save(c);
    }


    public void DeleteCertification(Integer id) {
        Certification c = certificationRepo.findById(id).get();
        certificationRepo.delete(c);
    }
}
