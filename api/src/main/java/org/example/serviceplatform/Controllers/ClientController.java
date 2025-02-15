package org.example.serviceplatform.Controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.serviceplatform.DTO.*;
import org.example.serviceplatform.Entities.*;
import org.example.serviceplatform.Repositories.ClientRepo;
import org.example.serviceplatform.Repositories.CommentaireRepo;
import org.example.serviceplatform.Services.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/client")
public class ClientController {
    private final ClientRepo clientRepo;
    private final ClientService clientService;
    private final CategoryService categoryService;
    private final DemandeService demandeService;
    private final CommentaireService commentaireService;
    private final CommentaireRepo commentaireRepo;
    private final EvaluationService evaluationService;
    private final OffreService offreService;
    private final PostulationService postulationService;
    private final UtilisateurService utilisateurService;
    private final FavorisService favorisService;
    private final ServiceService serviceService;
    private final ObjectMapper objectMapper;

    public ClientController(ClientRepo clientRepo, ClientService clientService, CategoryService categoryService, DemandeService demandeService, CommentaireService commentaireService, CommentaireRepo commentaireRepo, EvaluationService evaluationService, OffreService offreService, PostulationService postulationService, UtilisateurService utilisateurService, FavorisService favorisService, ServiceService serviceService,ObjectMapper objectMapper) {
        this.clientRepo = clientRepo;
        this.clientService = clientService;
        this.categoryService = categoryService;
        this.demandeService = demandeService;
        this.commentaireService = commentaireService;
        this.commentaireRepo = commentaireRepo;
        this.evaluationService = evaluationService;
        this.offreService = offreService;
        this.postulationService = postulationService;
        this.utilisateurService = utilisateurService;
        this.favorisService = favorisService;
        this.serviceService = serviceService;
        this.objectMapper = objectMapper;
    }

                        ////////////// GESTION DE PROFIL///////////



    @GetMapping("/profil")
    public ClientDTO getProfil(){
          Integer idClient=utilisateurService.getAuthenticatedUserId();
          return clientService.getClient(idClient);


    }
    @PutMapping("/profil/update")
    public ResponseEntity<String> updateProfil(
            @RequestPart String clientDTOjson ,
            @RequestPart(value = "file", required = false) MultipartFile file){

        //Convertir le JSON String en Objet ClientDTO
        ObjectMapper objectMapper = new ObjectMapper();
        ClientDTO clientDTO;
        try {
            clientDTO = objectMapper.readValue(clientDTOjson , ClientDTO.class);
        } catch (JsonProcessingException e) {
            return ResponseEntity.badRequest().body("Erreur lors de la conversion JSON : " + e.getMessage());
        }
        Integer idClient=utilisateurService.getAuthenticatedUserId();
        clientService.updateClient(idClient,clientDTO,file);
        return ResponseEntity.ok("Client updated");
    }
    @DeleteMapping("/profil/delete")
    public ResponseEntity<String> deleteProfil(){
        Integer idClient=utilisateurService.getAuthenticatedUserId();
        clientService.deleteClient(idClient);
        return ResponseEntity.ok("Client deleted");
    }

                         ///////////////////GESTION DES SERVICES PRESENTEES////////////////



    //voir les categories avec les services
    @GetMapping("/categories")
    public List<Category> getAllCategories(){
        return categoryService.getAllCategories();
    }
    //voir les services pour une categorie
    @GetMapping("/categories/{idCateg}/services")
    public List<ServiceClientDTO> getAllServicesOfCategory(@PathVariable Integer idCateg){
        return categoryService.getAllServicesByCategory(idCateg);
    }





                          ///////////////////////////GERER MES DEMANDES et SERVICES //////////////////////////
   //get all services
    @GetMapping("services/all")
    public List<ServiceClientDTO> getAllServices(){
        return serviceService.getAllServices();
    }

    //Details d'une service
    //////// le details d'une service/////////
    @GetMapping("/service/{idService}/serviceDetails")
    public ServiceClient2DTO afficherService(@PathVariable Integer idService) {
        return serviceService.getDetailstoClient(idService);
    }



    //demander une service
    @PostMapping("services/{id}/demandes")
    public ResponseEntity<String> demanderService(@PathVariable Integer id){
        Integer idClient= utilisateurService.getAuthenticatedUserId();
        demandeService.envoyerDemande(idClient,id );
        return ResponseEntity.ok("votre demande est envoyée");
    }
    //voir mes demandes








                          ////////////////     GERER MES COMMENTAIRES  ////////////

    //ecrire un commentaire à propos d'une service
    @PostMapping("/{serviceId}/commentaire")
    public ResponseEntity<CommentaireDTO> envoyerCommentaire(@RequestBody Commentaire commentaire,@PathVariable Integer serviceId) {
        Integer idClient=utilisateurService.getAuthenticatedUserId();
       CommentaireDTO com= commentaireService.StoreCommentaire(idClient,commentaire,serviceId);
        return ResponseEntity.status(HttpStatus.CREATED).body(com);
    }
    //aficher les commentaires d'une service
    @GetMapping("/services/{idService}/commentaires")
   public List<CommentaireDTO> getAllCommentairesofService(@PathVariable Integer idService){
        return commentaireService.getCommentairesByIdService(idService);
    }



                      //////////////// MES EVALUATIONS à PROPOS DES SERIVICES ///////////////
    //evaluer une service
    @PostMapping("/services/{idService}/evaluation")
    public ResponseEntity<EvaluationDTO> evaluer(@RequestBody Evaluation evaluation,@PathVariable Integer idService){
        Integer idClient=utilisateurService.getAuthenticatedUserId();

        return ResponseEntity.status(HttpStatus.CREATED).body(evaluationService.storeEvaluation(idClient,evaluation,idService));

    }
    //changer mon evaluation pour une service
    @PutMapping("/services/evaluations")
    public ResponseEntity<String> updateEvaluation(@RequestBody Evaluation evaluation){
         evaluationService.updateEvaluation(evaluation);
         return ResponseEntity.ok("evaluation updated");
    }
    //voir les evaluations d'une service
    @GetMapping("/services/{idService}/evaluations")
    public ResponseEntity<List<EvaluationDTO>>getAllEvaluationsofService(@PathVariable Integer idService){
        List<EvaluationDTO> evaluations=evaluationService.getEvaluationsByServiceId(idService);
        return ResponseEntity.ok(evaluations);
    }


                      /////////////////////MES OFFRES///////////////
    //voir mes offres que j'ai créé
   @GetMapping("/offres")
   public List<OffreDTO> getAllOffreofClient(){
        return offreService.getOffresOfClient(utilisateurService.getAuthenticatedUserId());
   }


    //creer un post (offre) pour chercher une service
    @PostMapping("/offre/create")
    public ResponseEntity<String> storeOffre(
                @RequestPart("offre") String offrejson ,
                @RequestPart(value = "file", required = false) MultipartFile file){
        //Convertir le JSON String en Objet Offre
       // ObjectMapper objectMapper = new ObjectMapper();
        Offre offre;
        try {
            offre = objectMapper.readValue(offrejson , Offre.class);
        } catch (JsonProcessingException e) {
            return ResponseEntity.badRequest().body("Erreur lors de la conversion JSON : " + e.getMessage());
        }
        Integer idClient=utilisateurService.getAuthenticatedUserId();    //authentifié
         offreService.createOffre(idClient,offre,file);
         return ResponseEntity.ok("offre stored");
      }
      //update offre
      @PutMapping("/offre/update")
      public ResponseEntity<String> updateOffre(
              @RequestPart String offrejson ,
              @RequestPart(value = "file", required = false) MultipartFile file){
          //Convertir le JSON String en Objet Offre
          ObjectMapper objectMapper = new ObjectMapper();
          Offre offre;
          try {
              offre = objectMapper.readValue(offrejson , Offre.class);
          } catch (JsonProcessingException e) {
              return ResponseEntity.badRequest().body("Erreur lors de la conversion JSON : " + e.getMessage());
          }

          offreService.updateOffre(offre,file);
          return ResponseEntity.ok("offre updated");
      }
      //voir les postulas des prestataires  pour une offre
    @GetMapping("/offre/{id}/postulas")
    public List<PostulationDTO> getAllPostulasForOffre(@PathVariable Integer id){
        return postulationService.getPostulationsForOffre(id);
    }
    // accepter une postulation
    @PutMapping("/postulation/{id}/accepter")
    public ResponseEntity<String> accepterPostulation(@PathVariable Integer id){
        postulationService.accepterPostulation(id);
        return  ResponseEntity.ok("La postulation est bien acceptée  !");
    }
    //refuer une postulation
    @PutMapping("/postulation/{id}/refuser")
    public ResponseEntity<String> refuserPostulation(@PathVariable Integer id){
        postulationService.refuserPostulation(id);
        return  ResponseEntity.ok("la postulation est bien refusée !");
    }

    ///////////////////////////gestion des favoris ///////////////////////

    //ajouter une service au table  favoris
    @PostMapping("/favoris/create")
    public ResponseEntity<String> createFavoris(@RequestBody Map<String,Integer> favoris){
        Integer idClient=utilisateurService.getAuthenticatedUserId();
        favorisService.createFavoris(idClient,favoris);
        return ResponseEntity.ok("favoris stored");

    }
    //afficher tous les favoris pour le client authentifié
     @GetMapping("/Mesfavoris")
    public List<FavorisDTO> getAllFavorisOfClient(){
        Integer idClient=utilisateurService.getAuthenticatedUserId();
        return favorisService.getAllFavoris(idClient);
     }
    //lorsque le prest acceptre ou refuse une demande pour une service de la part du client

    //supprimer de table favoris
    @DeleteMapping("/{idFavoris}/disfavoris")
     public ResponseEntity<String> deleteFavoris(@PathVariable Integer idFavoris){
        favorisService.deleteFavoris(idFavoris);
        return ResponseEntity.ok("vous avez retiré cette service de la liste des favoris") ;
    }



    //////////////////////////// Notifications /////////////////
    //lorsque le prest postuler pour une offre

    //get la liste des notification pour un client + un prestataire





}
