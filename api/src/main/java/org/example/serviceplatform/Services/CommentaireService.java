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
    public CommentaireDTO  StoreCommentaire(Commentaire commentaire){
        // Vérifiez si le client existe
        if (commentaire.getClient() == null || commentaire.getClient().getId() == null) {
            throw new RuntimeException("Client is required for a Commentaire");
        }
        Client client = clientRepo.findById(commentaire.getClient().getId())
                .orElseThrow(() -> new RuntimeException("Client not found"));
        // Vérifiez si le service existe
        if (commentaire.getService() == null || commentaire.getService().getId() == null) {
            throw new RuntimeException("Service is required for a Commentaire");
        }
        Service service = serviceRepo.findById(commentaire.getService().getId())
                .orElseThrow(() -> new RuntimeException("Service not found"));
        // Associez le client et le service au commentaire
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
