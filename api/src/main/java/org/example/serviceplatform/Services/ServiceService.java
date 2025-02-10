package org.example.serviceplatform.Services;

import org.example.serviceplatform.DTO.ServiceDTO;
import org.example.serviceplatform.Entities.Category;
import org.example.serviceplatform.Entities.Prestataire;
import org.example.serviceplatform.Entities.Service;
import org.example.serviceplatform.Mappers.ServiceMapper;
import org.example.serviceplatform.Repositories.CategoryRepo;
import org.example.serviceplatform.Repositories.PrestataireRepo;
import org.example.serviceplatform.Repositories.ServiceRepo;
import org.springframework.beans.factory.annotation.Autowired;



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

    //////////// GETserices///////////
    public List<ServiceDTO> getServices(Integer id) {
        Prestataire prest=prestataireRepo.findById(id).orElse(null);
        return prest.getServices().stream().map(ServiceMapper::toServiceDTO).collect(Collectors.toList()) ;
    }
    //////////// GETserices///////////
    public List<ServiceDTO> getAllServices() {
        List<Service> services=serviceRepo.findAll();
        System.out.println("------>those are services<--------------"+services);
        return services.stream().map(ServiceMapper::toServiceDTO).collect(Collectors.toList()) ;
    }
    //////////////// Get Detials Service/////////
    public ServiceDTO getService(Integer id) {
        return ServiceMapper.toServiceDTO( serviceRepo.findById(id).orElseThrow(()->new RuntimeException("Service not found")));
    }
    //////// store service//////////
    public void storeService(Integer id, Service service) {
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
        prest.getServices().add(serv);
        prestataireRepo.save(prest);
    }



        ////////UpdateService/////////
    public void updateService(Service service) {
        Service serviceToUpdate=serviceRepo.findById(service.getId()).orElseThrow(()->new RuntimeException("aucun service trouvé "));
        serviceToUpdate.setDescription(service.getDescription());
        serviceToUpdate.setPrix(service.getPrix());
        serviceToUpdate.setTitre(service.getTitre());
        serviceToUpdate.setStatus(service.getStatus());
//        Category category=categoryRepo.findById(service.getCategory().getId()).orElse(null);
//        category.setDescription(service.getCategory().getDescription());
//        category.setName(service.getCategory().getName());
//        serviceToUpdate.setCategory(category);

        serviceRepo.save(serviceToUpdate);
    }
    ///////////delete service///////////
    public void deleteService(Integer id) {
        serviceRepo.deleteById(id);
    }
}
