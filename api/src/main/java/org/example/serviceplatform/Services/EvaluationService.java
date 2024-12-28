package org.example.serviceplatform.Services;

import org.example.serviceplatform.DTO.EvaluationDTO;
import org.example.serviceplatform.Entities.Client;
import org.example.serviceplatform.Entities.Evaluation;
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

    public void storeEvaluation(Evaluation evaluation) {
        // Vérifier si le client existe
        Client client = clientRepo.findById(evaluation.getClient().getId())
                .orElseThrow(() -> new RuntimeException("Client introuvable"));

        // Vérifier si le service existe
        org.example.serviceplatform.Entities.Service service = serviceRepo.findById(evaluation.getService().getId())
                .orElseThrow(() -> new RuntimeException("Service introuvable"));

        // Enregistrer l'évaluation
        evaluation.setClient(client);
        evaluation.setService(service);
        evaluationRepo.save(evaluation);
        evaluationRepo.save(evaluation);
    }

    public List<EvaluationDTO> getEvaluationsByServiceId(Integer serviceId) {
        List<Evaluation> evaluations = evaluationRepo.findByServiceId(serviceId);
        return evaluations.stream()
                .map(EvaluationMapper::toevalutationDTO)
                .collect(Collectors.toList());
    }
}
