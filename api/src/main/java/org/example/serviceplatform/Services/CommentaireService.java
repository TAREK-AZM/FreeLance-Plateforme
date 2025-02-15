package org.example.serviceplatform.Services;

import org.example.serviceplatform.DTO.CommentaireDTO;
import org.example.serviceplatform.Entities.Client;
import org.example.serviceplatform.Entities.Commentaire;
import org.example.serviceplatform.Entities.Service;
import org.example.serviceplatform.Mappers.CommentaireMapper;
import org.example.serviceplatform.Repositories.ClientRepo;
import org.example.serviceplatform.Repositories.CommentaireRepo;
import org.example.serviceplatform.Repositories.ServiceRepo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class CommentaireService {
    @Autowired
    private CommentaireRepo commentaireRepo;
    @Autowired
    private ClientRepo clientRepo;
    @Autowired
    private ServiceRepo serviceRepo;

//STORE
    public CommentaireDTO  StoreCommentaire(Integer idClient, Commentaire commentaireStored,Integer serviceId){

        Client client = clientRepo.findById(idClient)
                .orElseThrow(() -> new RuntimeException("Client not found"));
        // Vérifiez si le service existe
        if (commentaireStored.getService() == null || commentaireStored.getService().getId() == null) {
            throw new RuntimeException("Service is required for a Commentaire");
        }
        Service service = serviceRepo.findById(serviceId)
                .orElseThrow(() -> new RuntimeException("Service not found"));
        // Associez le client et le service au commentaire
        Commentaire commentaire=new Commentaire();
        commentaire.setContent(commentaireStored.getContent());
        commentaire.setDatePosted(commentaireStored.getDatePosted());
        commentaire.setClient(client);
        commentaire.setService(service);
        // Sauvegardez le commentaire
        return CommentaireMapper.tocommentaireDTO(commentaireRepo.save(commentaire)) ;
    }



    //
//    public List<CommentaireDTO> GetAllCommentaire(){
//        List<Commentaire> commentaires = commentaireRepo.findAll();
//        return commenta
//    }
    public Commentaire GetCommentaireById(int id){
        return commentaireRepo.findById(id).get();
    }





    public List<CommentaireDTO> getCommentairesByIdService(int idService){
        List<Commentaire> commentaires= commentaireRepo.findByServiceId(idService);
              return commentaires.stream().map(com-> CommentaireMapper.tocommentaireDTO(com)).collect(Collectors.toList());
    }

}
