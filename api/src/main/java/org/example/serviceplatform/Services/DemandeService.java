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
    @Autowired
    private NotificationService notificationService;

    public List<DemandeDTO> getDemandes(Integer idPrestataire) {
        Prestataire prest=prestataireRepo.findById(idPrestataire).get();
        List<DemandeDTO> demandes=demandeRepo.findDemandesByPrestataireId(idPrestataire).stream().map(d-> DemandeMapper.toDemandeDTO(d)).collect(Collectors.toList());
           return demandes;
    }
    public void envoyerDemande(Integer idClient, Integer idService, DemandeClient demandeClient) {
        // Vérifier que le service existe
        Service service = serviceRepo.findById(idService)
                .orElseThrow(() -> new RuntimeException("Service non trouvé"));
        // Vérifier que le client existe
        Client client = clientRepo.findById(idClient).orElseThrow(()->new RuntimeException("le client n'existe pas"));
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
        DemandeClient demande=new DemandeClient();
        demande.setService(service);
        demande.setClient(client);
        demande.setStatus(StatusDemande.EN_ATTENTE);
        demande.setDateDemande(demandeClient.getDateDemande());
        demandeRepo.save(demande);
    }
    public void accepterDemande(Integer idDemande) {
        DemandeClient demande=demandeRepo.findById(idDemande).get();
        demande.setStatus(StatusDemande.EN_COURS);
        demandeRepo.save(demande);
        // 🔔 Notification pour le client
        String sujet = "Demande Acceptée";
        String message = " Votre demande pour la service '" + demande.getService().getTitre() + "' a été acceptée.";
        notificationService.createNotification(demande.getClient(), sujet, message);

    }
    public void annulerDemande(Integer idDemande) {
        DemandeClient demande=demandeRepo.findById(idDemande).get();
        demande.setStatus(StatusDemande.ANNULEE);
        demandeRepo.save(demande);
        // 🔔 Notification pour le client
        String sujet = "Demande Refusée";
        String message = " Votre demande pour la service '" + demande.getService().getTitre() + "' a été refusée.";
        notificationService.createNotification(demande.getClient(), sujet, message);
    }
}
