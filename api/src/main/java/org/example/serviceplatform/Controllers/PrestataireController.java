package org.example.serviceplatform.Controllers;

import org.example.serviceplatform.DPO.PrestataireProfilDTO;
import org.example.serviceplatform.DPO.ServiceDTO;
import org.example.serviceplatform.Entities.Prestataire;
import org.example.serviceplatform.Entities.Service;
import org.example.serviceplatform.Entities.Utilisateur;
import org.example.serviceplatform.Repositories.PrestataireRepo;
import org.example.serviceplatform.Repositories.ServiceRepo;
import org.example.serviceplatform.Services.PrestataireService;
import org.example.serviceplatform.Services.ServiceService;
import org.example.serviceplatform.Services.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/prestataire")
public class PrestataireController {
    @Autowired
    private PrestataireService prestataireService;
    @Autowired
    private ServiceService serviceService;
    @Autowired
    private ServiceRepo serviceRepo;
    @Autowired
    private PrestataireRepo prestataireRepo;


    ///////     get  les infos personnels de prestataire     //////////
    @GetMapping("/profil")
    public PrestataireProfilDTO profil() {
        Integer idPrest=7;    //le id de user authentifié
       return prestataireService.getPrestataire(idPrest);
    }
    ///////     UPDATE  les infos personnels de prestataire     //////////






    /////////////delete profil////////////////////////




   ////////////////voir les demandes /////////////////////



    /////////////////////voir mes service////////////
    @GetMapping("/mesServices")
    public List<ServiceDTO> getMesServices() {
        Integer idPrest=7;
        return serviceService.getServices(idPrest);

  }
//    @GetMapping("/mesServices")
//    public List<Service> getMesServices() {
//        Integer idPrest=7;
//        Prestataire prest=prestataireRepo.findById(idPrest).orElse(null);
//        return prest.getServices();
//
//    }

    //////////////m








}
