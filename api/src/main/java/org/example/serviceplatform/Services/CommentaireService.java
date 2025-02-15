package org.example.serviceplatform.Services;

import org.example.serviceplatform.DTO.CommentaireDTO;
import org.example.serviceplatform.Entities.Client;
import org.example.serviceplatform.Entities.Commentaire;
import org.example.serviceplatform.Entities.Evaluation;
import org.example.serviceplatform.Entities.Service;
import org.example.serviceplatform.Mappers.CommentaireMapper;
import org.example.serviceplatform.Repositories.ClientRepo;
import org.example.serviceplatform.Repositories.CommentaireRepo;
import org.example.serviceplatform.Repositories.ServiceRepo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class CommentaireService {
    @Autowired
    private CommentaireRepo commentaireRepo;
    @Autowired
    private ClientRepo clientRepo;
    @Autowired
    private ServiceRepo serviceRepo;

// store
public CommentaireDTO StoreCommentaire(Integer idClient, Commentaire commentaireStored, Integer serviceId) {
    // Fetch the client
    Client client = clientRepo.findById(idClient)
            .orElseThrow(() -> new RuntimeException("Client not found"));

    // Fetch the service
    Service service = serviceRepo.findById(serviceId)
            .orElseThrow(() -> new RuntimeException("Service not found"));

    // Rechercher les évaluations existantes
    List<Commentaire> existingCommentaires = commentaireRepo.findByClientAndService(client, service);

    Commentaire commentaire;
    if (!existingCommentaires.isEmpty()) {
        // Update the most recent comment if exists
        commentaire = existingCommentaires.get(0);
        commentaire.setContent(commentaireStored.getContent());
        commentaire.setDatePosted(commentaireStored.getDatePosted());

        // Optionally, you might want to delete other duplicate comments
        if (existingCommentaires.size() > 1) {
            existingCommentaires.subList(1, existingCommentaires.size())
                    .forEach(c -> commentaireRepo.delete(c));
        }
    } else {
        // Create a new Commentaire object
        commentaire = new Commentaire();
        commentaire.setContent(commentaireStored.getContent());
        commentaire.setDatePosted(commentaireStored.getDatePosted());
        commentaire.setClient(client);
        commentaire.setService(service);
    }

    // Save the commentaire
    return CommentaireMapper.tocommentaireDTO(commentaireRepo.save(commentaire));
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
