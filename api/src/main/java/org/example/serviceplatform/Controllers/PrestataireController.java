package org.example.serviceplatform.Controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.serviceplatform.DTO.*;
import org.example.serviceplatform.Entities.*;
import org.example.serviceplatform.Repositories.CertificationRepo;
import org.example.serviceplatform.Repositories.DemandeRepo;
import org.example.serviceplatform.Repositories.PrestataireRepo;
import org.example.serviceplatform.Repositories.ServiceRepo;
import org.example.serviceplatform.Services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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


    private static final String UPLOAD_DIR = "src/main/resources/static/images/";
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private CommentaireService commentaireService;
    @Autowired
    private OffreService offreService;
    //////////////////////////////GESTION DE PROFIL /////////////////////





    ///////get  les infos personnels de prestataire
    @GetMapping("/profil")
    public PrestataireProfilDTO profil() {
        Integer idPrest=utilisateurService.getAuthenticatedUserId(); //le id de user authentifié
       return prestataireService.getPrestataire(idPrest);
    }

    /////// UPDATE  les infos personnels de prestataire
    @PutMapping(value = "/profil/update", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> updateProfil(
            @RequestPart("prestataire") String prestataireJson,  // JSON en String
            @RequestPart(value = "file", required = false) MultipartFile file) {

         //Convertir le JSON String en Objet Prestataire
        ObjectMapper objectMapper = new ObjectMapper();
        Prestataire prestataire;
        try {
            prestataire = objectMapper.readValue(prestataireJson, Prestataire.class);
        } catch (JsonProcessingException e) {
            return ResponseEntity.badRequest().body("Erreur lors de la conversion JSON : " + e.getMessage());
        }

        Integer idPrest = utilisateurService.getAuthenticatedUserId();

        // 📌 Mettre à jour les infos du prestataire
        prestataireService.updatePrestataire(idPrest, prestataire, file);

        return ResponseEntity.ok("✅ Profil mis à jour avec succès.");
    }


   //////////GET ALL prestataires for clients ////////
   @GetMapping("/all")
   public List<PrestataireProfilDTO> getAllPrestataires()
   {
        return prestataireService.getAllPrestataires();
   }


    ////////////////////////////// Gestion de certification//////////////////////////////

    @PostMapping("/certification/add")
    public ResponseEntity<String>  ajouterCertification(
            @RequestPart("certification") String certificationJson,
            @RequestPart(value = "file", required = false) MultipartFile file) {


        //Convertir le JSON String en Objet Prestataire
        ObjectMapper objectMapper = new ObjectMapper();
        Certification certification;
        try {
            certification= objectMapper.readValue(certificationJson, Certification.class);
        } catch (JsonProcessingException e) {
            return ResponseEntity.badRequest().body("Erreur lors de la conversion JSON : " + e.getMessage());
        }
            Integer idPrest=utilisateurService.getAuthenticatedUserId();
        certificationService.StoreCertification(idPrest,certification,file);
         return ResponseEntity.ok("Certification stored");

    }
    @DeleteMapping("/certification/{idCert}/delete")
    public ResponseEntity<String>  deleteCertification(@PathVariable Integer idCert) {
        certificationService.DeleteCertification(idCert);
        return ResponseEntity.ok("Certification deleted");
    }
    @PutMapping("/certification/update")
    public ResponseEntity<String>  updateCertification(
            @RequestPart String certificationJson,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        //Convertir le JSON String en Objet Prestataire
        ObjectMapper objectMapper = new ObjectMapper();
        Certification certification;
        try {
            certification= objectMapper.readValue(certificationJson, Certification.class);
        } catch (JsonProcessingException e) {
            return ResponseEntity.badRequest().body("Erreur lors de la conversion JSON : " + e.getMessage());
        }
         certificationService.UpdateCertification(certification,file);
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
    @PostMapping("/service/add")
    public ResponseEntity<String>  addService(
            @RequestPart("service") String servicejson,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        Integer idPrest=utilisateurService.getAuthenticatedUserId();
        //Convertir le JSON String en Objet Service
        ObjectMapper objectMapper = new ObjectMapper();
        Service service;
        try {
            service = objectMapper.readValue(servicejson, Service.class);
        } catch (JsonProcessingException e) {
            return ResponseEntity.badRequest().body("Erreur lors de la conversion JSON : " + e.getMessage());
        }
         serviceService.storeService(idPrest,service,file);
        return ResponseEntity.ok("votre service est bien ajoutée");
    }

    //////////////modifier une service///////
    @PutMapping("/service/update")
    public ResponseEntity<String> updateService(
            @RequestPart("service") String servicejson,
            @RequestPart(value = "file", required = false) MultipartFile file)   {
        //Convertir le JSON String en Objet Service
        ObjectMapper objectMapper = new ObjectMapper();
        Service service;
        try {
            service = objectMapper.readValue(servicejson, Service.class);
        } catch (JsonProcessingException e) {
            return ResponseEntity.badRequest().body("Erreur lors de la conversion JSON : " + e.getMessage());
        }

        serviceService.updateService(service,file);
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

    //voir les categories avec les services
    @GetMapping("/categories")
    public List<Category> getAllCategories(){
        return categoryService.getAllCategories();
    }
    //aficher les commentaires d'une service
    @GetMapping("/services/{idService}/commentaires")
    public List<CommentaireDTO> getAllCommentairesofService(@PathVariable Integer idService){
        return commentaireService.getCommentairesByIdService(idService);
    }

    ///////////GESTION DES OFFRES/////////////

    //poustuler pour une offre d'une client
    @PostMapping("/offres/{id}/postulation")
    public ResponseEntity<String>  postulation(@PathVariable Integer id,@RequestBody Postulation postulation) {
        Integer idPrest=utilisateurService.getAuthenticatedUserId();
        postulationService.storePostulation(id,idPrest,postulation);
        return ResponseEntity.ok("postulation stored");
    }


    ///////////// get the all the postulatores for one offre //////////////






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

    //mark all as read
    @PutMapping("/readAll")
    public void markAllAssRead(){
        notificationService.markAllAsRead();
}






}
