package org.example.serviceplatform.Services;

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
    //////////////// Get Detials Service/////////
    public ServiceDTO getService(Integer id) {
        return ServiceMapper.toServiceDTO( serviceRepo.findById(id).orElseThrow(()->new RuntimeException("Service not found")));
    }
    //////// store service//////////
    public void storeService(Integer id, Service service, MultipartFile imageFile) {
        if (id == null || service == null) {
            throw new IllegalArgumentException("L'id du prestataire et le service ne peuvent pas être null.");
        }
        Prestataire prest = prestataireRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Prestataire non trouvé avec l'id : " + id));
        if (service.getCategory() == null || service.getCategory().getName() == null) {
            throw new IllegalArgumentException("La catégorie du service doit être spécifiée.");
        }
        Category cat = categoryRepo.findByName(service.getCategory().getName())
                .orElseThrow(() -> new RuntimeException("Catégorie non trouvée : " + service.getCategory().getName()));
        Service serv = Service.builder()
                .titre(service.getTitre())
                .description(service.getDescription())
                .prix(service.getPrix())
                .status(service.getStatus())
                .category(cat)
                .prestataire(prest)
                .build();
        // 📂 Gérer l'upload d'image
        if (imageFile != null && !imageFile.isEmpty()) {
            String UPLOAD_DIR = "src/main/resources/images/services/";

            try {
                // 📁 Vérifier si le dossier existe, sinon le créer
                Path uploadPath = Paths.get(UPLOAD_DIR);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                // 🏷️ Définir un nom de fichier unique
                String fileName = "service_" + service.getId() + "_" + System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
                Path filePath = uploadPath.resolve(fileName);

                // 📥 Écrire le fichier sur le disque
                Files.write(filePath, imageFile.getBytes());

                // 🔗 Mettre à jour l'URL de l'image
                serv.setImage("/api/services/images/" + fileName);
               // prest.getServices().add(serv);
            } catch (IOException e) {
                throw new RuntimeException("Erreur lors de l'enregistrement de l'image : " + e.getMessage());
            }
        }
        prestataireRepo.save(prest);
    }



        ////////UpdateService/////////
    public void updateService(Service service,MultipartFile imageFile) {
        Service serviceToUpdate=serviceRepo.findById(service.getId()).orElseThrow(()->new RuntimeException("aucun service trouvé "));
        serviceToUpdate.setDescription(service.getDescription());
        serviceToUpdate.setPrix(service.getPrix());
        serviceToUpdate.setTitre(service.getTitre());
        serviceToUpdate.setStatus(service.getStatus());

        // 📂 Gérer l'upload d'image
        if (imageFile != null && !imageFile.isEmpty()) {
            String UPLOAD_DIR = "src/main/resources/images/services/";

            try {
                // 📁 Vérifier si le dossier existe, sinon le créer
                Path uploadPath = Paths.get(UPLOAD_DIR);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }
                // 🚀 **SUPPRESSION DE L'ANCIENNE IMAGE**
                if (serviceToUpdate.getImage() != null) {
                    Path oldImagePath = Paths.get(UPLOAD_DIR + serviceToUpdate.getImage().replace("/api/services/images/", ""));
                    if (Files.exists(oldImagePath)) {
                        Files.delete(oldImagePath); // 🚨 Supprimer l'ancienne image
                    }
                }

                // 🏷️ Définir un nom de fichier unique
                String fileName = "service_" + service.getId() + "_" + System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
                Path filePath = uploadPath.resolve(fileName);

                // 📥 Écrire le fichier sur le disque
                Files.write(filePath, imageFile.getBytes());

                // 🔗 Mettre à jour l'URL de l'image
                serviceToUpdate.setImage("/api/services/images/" + fileName);
            } catch (IOException e) {
                throw new RuntimeException("Erreur lors de l'enregistrement de l'image : " + e.getMessage());
            }
        }
        serviceRepo.save(serviceToUpdate);
    }
    ///////////delete service///////////
    public void deleteService(Integer id) {
        serviceRepo.deleteById(id);
    }
}
