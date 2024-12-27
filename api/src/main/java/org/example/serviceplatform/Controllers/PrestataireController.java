package org.example.serviceplatform.Controllers;

import org.example.serviceplatform.DTO.CertificationDTO;
import org.example.serviceplatform.DTO.DemandeDTO;
import org.example.serviceplatform.DTO.PrestataireProfilDTO;
import org.example.serviceplatform.Entities.Certification;
import org.example.serviceplatform.Entities.Prestataire;
import org.example.serviceplatform.Entities.Service;
import org.example.serviceplatform.Repositories.CertificationRepo;
import org.example.serviceplatform.Repositories.DemandeRepo;
import org.example.serviceplatform.Repositories.PrestataireRepo;
import org.example.serviceplatform.Repositories.ServiceRepo;
import org.example.serviceplatform.Services.CertificationService;
import org.example.serviceplatform.Services.DemandeService;
import org.example.serviceplatform.Services.PrestataireService;
import org.example.serviceplatform.Services.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prestataire")
public class PrestataireController {
    @Autowired
    private PrestataireService prestataireService;
    @Autowired
    private ServiceService serviceService;
    @Autowired
    private DemandeRepo demandeRepo;
    @Autowired
    private ServiceRepo serviceRepo;
    @Autowired
    private PrestataireRepo prestataireRepo;
    @Autowired
    private DemandeService demandeService;
    @Autowired
    private CertificationService certificationService;
    @Autowired
    private CertificationRepo certificationRepo;

                            //////////////////////////////GESTION DE PROFIL /////////////////////



    ///////get  les infos personnels de prestataire
    @GetMapping("/profil")
    public PrestataireProfilDTO profil() {
        Integer idPrest=1;    //le id de user authentifié
       return prestataireService.getPrestataire(idPrest);
    }
    /////// UPDATE  les infos personnels de prestataire
    @PutMapping("/profil")
    public ResponseEntity<String> updateProfil(@RequestBody PrestataireProfilDTO prestataireProfilDTO) {
        Integer idPrest=1;
         prestataireService.updatePrestataire(idPrest,prestataireProfilDTO);
          return ResponseEntity.ok("Profil updated");
    }





                    ////////////////////////////// Gestion de certification//////////////////////////////

    @PostMapping("/certification/add")
    public ResponseEntity<String>  ajouterCertification(@RequestBody Certification certification) {
        Integer idPrest=1;
        certificationService.StoreCertification(idPrest,certification);
         return ResponseEntity.ok("Certification stored");

    }
    @DeleteMapping("/certification/{idCert}/delete")
    public ResponseEntity<String>  deleteCertification(@PathVariable Integer idCert) {
        certificationService.DeleteCertification(idCert);
        return ResponseEntity.ok("Certification deleted");
    }
    @PutMapping("/certification/update")
    public ResponseEntity<String>  updateCertification(@RequestBody Certification certification) {
         certificationService.UpdateCertification(certification);
        return ResponseEntity.ok("Certification updated");
    }


                     //////////////////////////// Gestion des demandes clients////////////////////




   ////////////////voir les demandes /////////////////////
    @GetMapping("/demandes")
    public List<DemandeDTO> demandes() {
        Integer idPrest=1;
        return demandeService.getDemandes(idPrest);
    }

    /////// accepter une demande/////////
    @PatchMapping("/demandes/{idDemande}/accepter")
    public ResponseEntity<String> accepterDemande(@PathVariable Integer idDemande) {
        demandeService.accepterDemande(idDemande);
        return ResponseEntity.ok("le demande est acceptée!");
    }
    ///////////annuler une demande////////////
    @PatchMapping("/demandes/{idDemande}/annuler")
    public ResponseEntity<String> annulerDemande(@PathVariable Integer idDemande) {
        demandeService.accepterDemande(idDemande);
        return ResponseEntity.ok("la demande est annulée");
    }




                   ///////////////////////////////GESTION DES SERVICES ///////////////////////

    /////////////////////voir mes service////////////
    @GetMapping("/mesServices")
    public List<Service> getMesServices() {
        Integer idPrest=1;
        return serviceService.getServices(idPrest);
 }
    /////////ajouter une service//////////
    @PostMapping("/mesServices/add")
    public ResponseEntity<String>  addService(@RequestBody Service service) {
        Integer idPrest=1;
         serviceService.storeService(idPrest,service);
        return ResponseEntity.ok("votre service est bien ajoutée");

    }

    //////////////modifier une service///////
    @PutMapping("/mesServices")
    public ResponseEntity<String> updateService(@RequestBody Service service )  {
        serviceService.updateService(service);
        return ResponseEntity.ok("la service est update");
    }
    //////// le details d'une service/////////
    @GetMapping("/mesServices/{idService}/serviceDetails")
    public Service afficherService(@PathVariable Integer idService) {
        return serviceService.getService(idService);
    }
    /////////delete une service////////////
    @DeleteMapping("/mesServices/{idService}/delete")
    public ResponseEntity<String>  deleteService(@PathVariable Integer idService) {
        serviceService.deleteService(idService);
        return ResponseEntity.ok("la service est delete");
    }










}
