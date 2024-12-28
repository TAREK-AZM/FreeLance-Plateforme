package org.example.serviceplatform.Controllers;

import org.example.serviceplatform.DTO.ClientDTO;
import org.example.serviceplatform.DTO.CommentaireDTO;
import org.example.serviceplatform.DTO.EvaluationDTO;
import org.example.serviceplatform.Entities.*;
import org.example.serviceplatform.Repositories.ClientRepo;
import org.example.serviceplatform.Repositories.CommentaireRepo;
import org.example.serviceplatform.Services.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    public ClientController(ClientRepo clientRepo, ClientService clientService, CategoryService categoryService, DemandeService demandeService, CommentaireService commentaireService, CommentaireRepo commentaireRepo, EvaluationService evaluationService) {
        this.clientRepo = clientRepo;
        this.clientService = clientService;
        this.categoryService = categoryService;
        this.demandeService = demandeService;
        this.commentaireService = commentaireService;
        this.commentaireRepo = commentaireRepo;
        this.evaluationService = evaluationService;
    }

    ////////////// GESTION DE PROFIL///////////



    @GetMapping("/profil")
    public ClientDTO getProfil(){
        Integer idClient=2;
        return clientService.getClient(idClient);
    }
    @PutMapping("/profil/update")
    public ResponseEntity<String> updateProfil(@RequestBody ClientDTO clientDTO){
        clientService.updateClient(clientDTO);
        return ResponseEntity.ok("Client updated");
    }
    @DeleteMapping("/profil/{idClient}/delete")
    public ResponseEntity<String> deleteProfil(@PathVariable Integer idClient){
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
    public List<Service> getAllServices(@PathVariable Integer idCateg){
        return categoryService.getAllServices(idCateg);
    }
    //demander une service
    @PostMapping("/demandes")
    public ResponseEntity<String> demanderService(@RequestBody DemandeClient demandeClient){
        demandeService.envoyerDemande(demandeClient);
        return ResponseEntity.ok("votre demande est envoyée");
    }
    //voir mes demandes


    //faire commentaire à propos d'une service
    @PostMapping("/commentaire")
    public ResponseEntity<CommentaireDTO> envoyerCommentaire(@RequestBody Commentaire commentaire) {
       CommentaireDTO com= commentaireService.StoreCommentaire(commentaire);
        return ResponseEntity.status(HttpStatus.CREATED).body(com);
    }
    //aficher les commentaires d'une service
    @GetMapping("/services/{idService}/commentaires")
   public List<CommentaireDTO> getAllCommentairesofService(@PathVariable Integer idService){
        return commentaireService.getCommentairesByIdService(idService);
    }
    //evaluer une service
    @PostMapping("/services/evaluations")
    public ResponseEntity<String> evaluer(@RequestBody Evaluation evaluation){
        try {
            evaluationService.storeEvaluation(evaluation);
            return ResponseEntity.status(HttpStatus.CREATED).body("Évaluation enregistrée avec succès.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    //voir les evaluations d'une service
    @GetMapping("/services/{idService}/evaluations")
    public ResponseEntity<List<EvaluationDTO>>getAllEvaluationsofService(@PathVariable Integer idService){
        List<EvaluationDTO> evaluations=evaluationService.getEvaluationsByServiceId(idService);
        return ResponseEntity.ok(evaluations);
    }








}
