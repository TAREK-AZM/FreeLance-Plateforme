package org.example.serviceplatform.Controllers;

import org.example.serviceplatform.DTO.*;
import org.example.serviceplatform.Entities.*;
import org.example.serviceplatform.Repositories.CertificationRepo;
import org.example.serviceplatform.Repositories.DemandeRepo;
import org.example.serviceplatform.Repositories.PrestataireRepo;
import org.example.serviceplatform.Repositories.ServiceRepo;
import org.example.serviceplatform.Services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.example.serviceplatform.DTO.ConversationDTO;
import org.example.serviceplatform.DTO.MessageDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@RestController
@RequestMapping("/api/prestataire")
public class PrestataireController {
    @Autowired
    private PrestataireService prestataireService;
    @Autowired
    private ServiceService serviceService;
    @Autowired
    private DemandeService demandeService;
    @Autowired
    private CertificationService certificationService;
    @Autowired
    private PostulationService postulationService;
    @Autowired
    private UtilisateurService utilisateurService;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private ConversationService conversationService;

    //////////////////////////////GESTION DE PROFIL /////////////////////



    ///////get  les infos personnels de prestataire
    @GetMapping("/profil")
    public PrestataireProfilDTO profil() {
        Integer idPrest=utilisateurService.getAuthenticatedUserId(); //le id de user authentifié
       return prestataireService.getPrestataire(idPrest);
    }
    /////// UPDATE  les infos personnels de prestataire
    @PutMapping("/profil")
    public ResponseEntity<String> updateProfil(@RequestBody Prestataire prestataire) {
        Integer idPrest=utilisateurService.getAuthenticatedUserId();
         prestataireService.updatePrestataire(idPrest,prestataire);
          return ResponseEntity.ok("Profil updated");
    }

                    ////////////////////////////// Gestion de certification//////////////////////////////

    @PostMapping("/certification/add")
    public ResponseEntity<String>  ajouterCertification(@RequestBody Certification certification) {
        Integer idPrest=utilisateurService.getAuthenticatedUserId();
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
        Integer idPrest=utilisateurService.getAuthenticatedUserId();
        return demandeService.getDemandes(idPrest);
    }

    /////// accepter une demande/////////
    @PatchMapping("/demande/{idDemande}/accepter")
    public ResponseEntity<String> accepterDemande(@PathVariable Integer idDemande) {
        demandeService.accepterDemande(idDemande);
        return ResponseEntity.ok("le demande est acceptée!");
    }
    ///////////annuler une demande////////////
    @PatchMapping("/demande/{idDemande}/annuler")
    public ResponseEntity<String> annulerDemande(@PathVariable Integer idDemande) {
        demandeService.accepterDemande(idDemande);
        return ResponseEntity.ok("la demande est annulée");
    }


                   ///////////////////////////////GESTION DES SERVICES ///////////////////////

    /////////////////////voir mes services triés selon les categories////////////
    @GetMapping("/mesServices")
    public List<ServiceDTO> getMesServices() {
        Integer idPrest=utilisateurService.getAuthenticatedUserId();
        return serviceService.getServices(idPrest);
 }
    /////////ajouter une service//////////
    @PostMapping("/mesServices/add")
    public ResponseEntity<String>  addService(@RequestBody Service service) {
        Integer idPrest=utilisateurService.getAuthenticatedUserId();
         serviceService.storeService(idPrest,service);
        return ResponseEntity.ok("votre service est bien ajoutée");
    }

    //////////////modifier une service///////
    @PutMapping("/mesServices/update")
    public ResponseEntity<String> updateService(@RequestBody Service service )  {
        serviceService.updateService(service);
        return ResponseEntity.ok("la service est updated");
    }
    //////// le details d'une service/////////
    @GetMapping("/mesServices/{idService}/serviceDetails")
    public ServiceDTO afficherService(@PathVariable Integer idService) {
        return serviceService.getService(idService);
    }
    /////////delete une service////////////
    @DeleteMapping("/mesServices/{idService}/delete")
    public ResponseEntity<String>  deleteService(@PathVariable Integer idService) {
        serviceService.deleteService(idService);
        return ResponseEntity.ok("la service est deleted");
    }

                                     ///////////GESTION DES OFFRES/////////////

    //poustuler pour une offre d'une client
    @PostMapping("/offres/{id}/postulation")
    public ResponseEntity<String>  postulation(@PathVariable Integer id,@RequestBody Postulation postulation) {
        Integer idPrest=utilisateurService.getAuthenticatedUserId();
        postulationService.storePostulation(id,idPrest,postulation);
        return ResponseEntity.ok("postulation stored");
    }
    //voir la liste des offres







    //////////////////////////////////  Gestion des notifications ///////////////////////////

 // voir mes notifications
    @GetMapping("/MesNotifications")
    public List<NotificationDTO> getNotifications() {
        Integer idPrest=utilisateurService.getAuthenticatedUserId();
        //Integer idPrest=2;
        return notificationService.getAllNotificationsofUser(idPrest);
    }

    //marquer la notification comme lue
    @PutMapping("/{idNotification}/read")
    public void markAsRead(@PathVariable Integer idNotification){
        notificationService.markAsRead(idNotification);
    }


}
