package org.example.serviceplatform.Services;

import org.example.serviceplatform.DTO.PostulationDTO;
import org.example.serviceplatform.Entities.Offre;
import org.example.serviceplatform.Entities.Postulation;
import org.example.serviceplatform.Entities.Prestataire;
import org.example.serviceplatform.Mappers.PostulationMapper;
import org.example.serviceplatform.Repositories.OffreRepo;
import org.example.serviceplatform.Repositories.PostulationRepo;
import org.example.serviceplatform.Repositories.PrestataireRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostulationService {
    @Autowired
    private PostulationRepo postulationRepo;
    @Autowired
    private OffreRepo offreRepo;
    @Autowired
    private PrestataireRepo prestataireRepo;

    //get postulatios for an offre
    public List<PostulationDTO> getPostulationsForOffre(Integer offreId) {
        Offre offre = offreRepo.findById(offreId)
                .orElseThrow(() -> new RuntimeException("Offre not found"));
        return offre.getPostulats().stream()
                .map(PostulationMapper::toPostulationDTO)
                .collect(Collectors.toList());
    }

    //store un postulas
    public void storePostulation(Integer offreId, Integer prestataireId, Postulation postulationStored) {
        // Récupérer l'offre
        Offre offre = offreRepo.findById(offreId)
                .orElseThrow(() -> new RuntimeException("Offre not found with ID: " + offreId));

        // Récupérer le prestataire
        Prestataire prestataire = prestataireRepo.findById(prestataireId)
                .orElseThrow(() -> new RuntimeException("Prestataire not found with ID: " + prestataireId));

        Postulation postulation =new Postulation();
         postulation.setOffre(offre);
         postulation.setPrestataire(prestataire);
         postulation.setPrix(postulationStored.getPrix());
         postulation.setDatePostulation(postulationStored.getDatePostulation());
         if(postulationStored.getDescription()==null){
             throw new RuntimeException("la description est obligatoire");
         }
         postulation.setDescription(postulationStored.getDescription());
        // Persister la postulation
        postulationRepo.save(postulation);

    }


}
