package org.example.serviceplatform.Services;

import org.example.serviceplatform.DTO.ServiceClient2DTO;
import org.example.serviceplatform.DTO.ServiceClientDTO;
import org.example.serviceplatform.DTO.ServiceDTO;
import org.example.serviceplatform.Entities.Category;
import org.example.serviceplatform.Entities.Prestataire;
import org.example.serviceplatform.Entities.Service;
import org.example.serviceplatform.Mappers.ServiceMapper;
import org.example.serviceplatform.Repositories.CategoryRepo;
import org.example.serviceplatform.Repositories.PrestataireRepo;
import org.example.serviceplatform.Repositories.ServiceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class ServiceService {
    @Autowired
    private ServiceRepo serviceRepo;
    @Autowired
    private PrestataireRepo prestataireRepo;
    @Autowired
    private CategoryRepo categoryRepo;

    ///////get all services ////////////
    public List<ServiceClientDTO> getAllServices() {
      return   serviceRepo.findAll().stream().map(ServiceMapper::toServiceClientDTO).collect(Collectors.toList());
    }
    //////////// GETserices///////////
    public List<ServiceDTO> getServices(Integer id) {
        Prestataire prest=prestataireRepo.findById(id).orElse(null);
        return prest.getServices().stream().map(ServiceMapper::toServiceDTO).collect(Collectors.toList()) ;
    }
    public ServiceClient2DTO getDetailstoClient(Integer id) {

        return ServiceMapper.toServiceClient2DTO( serviceRepo.findById(id).orElseThrow(()->new RuntimeException("Service not found")));
    }

    //////////////// Get Detials Service/////////
    public ServiceDTO getService(Integer id) {
        return ServiceMapper.toServiceDTO( serviceRepo.findById(id).orElseThrow(()->new RuntimeException("Service not found")));
    }
    //////// store service//////////
    public void storeService(Integer id, Service service, MultipartFile imageFile) {
        if (id == null || service == null) {
            throw new IllegalArgumentException("L'id du prestataire et le service ne peuvent pas être null.");
        }

        // Récupérer le prestataire
        Prestataire prest = prestataireRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Prestataire non trouvé avec l'id : " + id));

        // Vérifier la catégorie
        if (service.getCategory() == null || service.getCategory().getName() == null) {
            throw new IllegalArgumentException("La catégorie du service doit être spécifiée.");
        }

        // Récupérer la catégorie
        Category cat = categoryRepo.findByName(service.getCategory().getName())
                .orElseThrow(() -> new RuntimeException("Catégorie non trouvée : " + service.getCategory().getName()));

        // Créer et sauvegarder le service
        Service serv = Service.builder()
                .titre(service.getTitre())
                .description(service.getDescription())
                .prix(service.getPrix())
                .status(service.getStatus())
                .category(cat)
                .prestataire(prest)
                .build();

        // Sauvegarder le service pour obtenir un ID
        Service savedService = serviceRepo.save(serv); // 👈 Sauvegarder d'abord

        // 📂 Gérer l'upload d'image
        if (imageFile != null && !imageFile.isEmpty()) {
            String UPLOAD_DIR = "uploads/images/services/";

            try {
                // 📁 Vérifier si le dossier existe, sinon le créer
                Path uploadPath = Paths.get(UPLOAD_DIR);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                // 🏷️ Définir un nom de fichier unique avec l'ID du service
                String fileName = "service_" + savedService.getId() + "_" + System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
                Path filePath = uploadPath.resolve(fileName);

                // 📥 Écrire le fichier sur le disque
                Files.write(filePath, imageFile.getBytes());

                // 🔗 Mettre à jour l'URL de l'image
                savedService.setImage("/images/services/" + fileName); // Ajouter un '/' au début
                prest.getServices().add(savedService);
            } catch (IOException e) {
                throw new RuntimeException("Erreur lors de l'enregistrement de l'image : " + e.getMessage());
            }
        }

        // Sauvegarder le prestataire avec le nouveau service
        prestataireRepo.save(prest);
    }

  //update service
    public void updateService(Service service, MultipartFile imageFile) {
        // 🔍 Vérifier si le service existe
        Service serviceToUpdate = serviceRepo.findById(service.getId())
                .orElseThrow(() -> new RuntimeException("Aucun service trouvé avec l'ID : " + service.getId()));

        // 🛠️ Mettre à jour les champs du service
        serviceToUpdate.setDescription(service.getDescription());
        serviceToUpdate.setPrix(service.getPrix());
        serviceToUpdate.setTitre(service.getTitre());
        serviceToUpdate.setStatus(service.getStatus());

        // 📂 Gérer l'upload d'image
        if (imageFile != null && !imageFile.isEmpty()) {
            String UPLOAD_DIR = "uploads/images/services/";

            try {
                // 📁 Vérifier si le dossier existe, sinon le créer
                Path uploadPath = Paths.get(UPLOAD_DIR);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                // 🚀 **SUPPRESSION DE L'ANCIENNE IMAGE**
                if (serviceToUpdate.getImage() != null) {
                    String oldImagePathStr = serviceToUpdate.getImage().replace("/images/services/", "");
                    Path oldImagePath = Paths.get(UPLOAD_DIR + oldImagePathStr);
                    System.out.println("Suppression de l'ancienne image : " + oldImagePath);
                    // Si l'ancienne image existe, la supprimer
                    if (Files.exists(oldImagePath)) {
                        Files.delete(oldImagePath); // 🚨 Supprimer l'ancienne image
                    }
                }

                // 🏷️ Définir un nom de fichier unique pour la nouvelle image
                String fileName = "service_" + service.getId() + "_" + System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
                Path filePath = uploadPath.resolve(fileName);

                // 📥 Écrire le fichier sur le disque
                Files.write(filePath, imageFile.getBytes());

                // 🔗 Mettre à jour l'URL de l'image
                serviceToUpdate.setImage("/images/services/" + fileName);
            } catch (IOException e) {
                throw new RuntimeException("Erreur lors de l'enregistrement de l'image : " + e.getMessage());
            }
        }

        // 💾 Sauvegarder le service mis à jour
        serviceRepo.save(serviceToUpdate);
    }

    ///////////delete service///////////
    public void deleteService(Integer id) {
        serviceRepo.deleteById(id);
    }
}
