package org.example.serviceplatform.Services;

import org.example.serviceplatform.DTO.EvaluationDTO;
import org.example.serviceplatform.Entities.Client;
import org.example.serviceplatform.Entities.Evaluation;
import org.example.serviceplatform.Mappers.CommentaireMapper;
import org.example.serviceplatform.Mappers.EvaluationMapper;
import org.example.serviceplatform.Repositories.ClientRepo;
import org.example.serviceplatform.Repositories.EvaluationRepo;
import org.example.serviceplatform.Repositories.ServiceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EvaluationService {
    @Autowired
    private EvaluationRepo evaluationRepo;
    @Autowired
    private ClientRepo clientRepo;
    @Autowired
    private ServiceRepo serviceRepo;

    public EvaluationDTO storeEvaluation(Integer idClient, Evaluation evaluationStored,Integer idService) {
        // Vérifier si le client existe
        Client client = clientRepo.findById(idClient)
                .orElseThrow(() -> new RuntimeException("Client introuvable"));

        // Vérifier si le service existe
        org.example.serviceplatform.Entities.Service service = serviceRepo.findById(idService)
                .orElseThrow(() -> new RuntimeException("Service introuvable"));

        // Rechercher l'évaluation existante
        Optional<Evaluation> optionalEvaluation = evaluationRepo.findByClientAndService(client, service);
        Evaluation ev;
        if (optionalEvaluation.isPresent()) {
                // Si l'évaluation existe, la mettre à jour
            ev = optionalEvaluation.get();
                ev.setEtoiles(evaluationStored.getEtoiles());
                evaluationRepo.save(ev);
            }else {
                // Enregistrer l'évaluation
                ev= new Evaluation();
                ev.setClient(client);
                ev.setService(service);
                ev.setEtoiles(evaluationStored.getEtoiles());
                evaluationRepo.save(ev);
            }
        return EvaluationMapper.toevalutationDTO(ev);


    }

    public List<EvaluationDTO> getEvaluationsByServiceId(Integer serviceId) {
        List<Evaluation> evaluations = evaluationRepo.findByServiceId(serviceId);
        return evaluations.stream()
                .map(EvaluationMapper::toevalutationDTO)
                .collect(Collectors.toList());
    }
  //update evaluation
    public void updateEvaluation( Evaluation updatedEvaluation) {
        Evaluation evaluation = evaluationRepo.findById(updatedEvaluation.getId())
                .orElseThrow(() -> new RuntimeException("Evaluation not found with "));
        evaluation.setEtoiles(updatedEvaluation.getEtoiles());
        evaluationRepo.save(evaluation);
    }
}
