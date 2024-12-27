package org.example.serviceplatform.Services;

import org.example.serviceplatform.DTO.DemandeDTO;
import org.example.serviceplatform.Entities.DemandeClient;
import org.example.serviceplatform.Entities.Enums.StatusDemande;
import org.example.serviceplatform.Entities.Prestataire;
import org.example.serviceplatform.Mappers.DemandeMapper;
import org.example.serviceplatform.Repositories.DemandeRepo;
import org.example.serviceplatform.Repositories.PrestataireRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DemandeService {
    @Autowired
    private PrestataireRepo prestataireRepo;
    @Autowired
    private DemandeRepo demandeRepo;

    public List<DemandeDTO> getDemandes(Integer idPrestataire) {
        Prestataire prest=prestataireRepo.findById(idPrestataire).get();
        List<DemandeDTO> demandes=demandeRepo.findDemandesByPrestataireId(idPrestataire).stream().map(d-> DemandeMapper.toDemandeDTO(d)).collect(Collectors.toList());
           return demandes;
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
