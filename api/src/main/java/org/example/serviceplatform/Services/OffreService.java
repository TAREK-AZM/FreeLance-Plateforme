package org.example.serviceplatform.Services;

import org.example.serviceplatform.DTO.OffreDTO;
import org.example.serviceplatform.Entities.Client;
import org.example.serviceplatform.Entities.Offre;
import org.example.serviceplatform.Mappers.OffreMapper;
import org.example.serviceplatform.Repositories.ClientRepo;
import org.example.serviceplatform.Repositories.OffreRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OffreService {
    @Autowired
    private OffreRepo offreRepo;
    @Autowired
    private ClientRepo clientRepo;


    public void createOffre(Integer clientId, Offre offreStored) {
        // Récupérer le client
        Client client = clientRepo.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        // Créer une nouvelle offre
        Offre offre = new Offre();
        offre.setTitle(offreStored.getTitle());
        offre.setDescription(offreStored.getDescription());
        offre.setDateCreation(offreStored.getDateCreation());
        offre.setClient(client);

        // Sauvegarder l'offre
         offreRepo.save(offre);
    }
    public List<OffreDTO> getOffresOfClient(Integer idClient) {
        Client client=clientRepo.findById(idClient).orElseThrow(() -> new RuntimeException("Client not found"));
        return client.getOffres().stream().map(OffreMapper::toOffreDTO).collect(Collectors.toList());
    }


}
