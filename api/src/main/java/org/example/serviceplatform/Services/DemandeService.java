package org.example.serviceplatform.Services;

import org.example.serviceplatform.DTO.DemandeDTO;
import org.example.serviceplatform.Entities.Client;
import org.example.serviceplatform.Entities.DemandeClient;
import org.example.serviceplatform.Entities.Enums.StatusDemande;
import org.example.serviceplatform.Entities.Prestataire;
import org.example.serviceplatform.Entities.Service;
import org.example.serviceplatform.Mappers.DemandeMapper;
import org.example.serviceplatform.Repositories.ClientRepo;
import org.example.serviceplatform.Repositories.DemandeRepo;
import org.example.serviceplatform.Repositories.PrestataireRepo;
import org.example.serviceplatform.Repositories.ServiceRepo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class DemandeService {
    @Autowired
    ServiceRepo serviceRepo;
    @Autowired
    private PrestataireRepo prestataireRepo;
    @Autowired
    private DemandeRepo demandeRepo;
    @Autowired
    private ClientRepo clientRepo;

    public List<DemandeDTO> getDemandes(Integer idPrestataire) {
        Prestataire prest=prestataireRepo.findById(idPrestataire).get();
        List<DemandeDTO> demandes=demandeRepo.findDemandesByPrestataireId(idPrestataire).stream().map(d-> DemandeMapper.toDemandeDTO(d)).collect(Collectors.toList());
           return demandes;
    }
    public void envoyerDemande(DemandeClient demandeClient) {
        // Vérifier que le service existe
        Service service = serviceRepo.findById(demandeClient.getService().getId())
                .orElseThrow(() -> new RuntimeException("Service non trouvé"));
        // Vérifier que le client existe
        Client client = clientRepo.findById(demandeClient.getClient().getId()).orElseThrow(()->new RuntimeException("le client n'existe pas"));
        // Vérifier si une demande active existe déjà
        boolean existeDemande = demandeRepo.existsByServiceAndClientAndStatusIn(
                service,
                client,
                Arrays.asList(StatusDemande.EN_ATTENTE, StatusDemande.EN_COURS)
        );

        if (existeDemande) {
            throw new RuntimeException("Une demande active existe déjà pour ce service.");
        }
        //  enregistrer la nouvelle demande
        demandeRepo.save(demandeClient);
    }
    public void accepterDemande(Integer idDemande) {
        DemandeClient demande=demandeRepo.findById(idDemande).get();
        demande.setStatus(StatusDemande.EN_COURS);
        demandeRepo.save(demande);
    }
    public void annulerDemande(Integer idDemande) {
        DemandeClient demande=demandeRepo.findById(idDemande).get();
        demande.setStatus(StatusDemande.ANNULEE);
        demandeRepo.save(demande);
    }
}
