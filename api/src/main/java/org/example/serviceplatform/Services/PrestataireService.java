package org.example.serviceplatform.Services;

import org.example.serviceplatform.DTO.PrestataireProfilDTO;
import org.example.serviceplatform.Entities.Prestataire;
import org.example.serviceplatform.Entities.Region;
import org.example.serviceplatform.Mappers.PrestataireMapper;
import org.example.serviceplatform.Repositories.PrestataireRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PrestataireService {
    @Autowired
    private PrestataireRepo prestataireRepo;
    @Autowired
    private RegionService regionService;

    ///////////////////////////         Profil         /////////////////////////////////
    public PrestataireProfilDTO getPrestataire(Integer id) {
        if (id == null) {
            throw new IllegalArgumentException("L'ID du prestataire ne peut pas être null.");
        }
        return PrestataireMapper.toPrestProfilDTO(prestataireRepo.findById(id).orElseThrow(()->new RuntimeException("not found ")));
    }
    public void updatePrestataire(Integer idPrest,PrestataireProfilDTO prestataireDTO) {
        Prestataire prestataire=prestataireRepo.findById(idPrest).orElse(null);
        prestataire.setNom(prestataireDTO.getNom());
        prestataire.setPrenom(prestataireDTO.getPrenom());
        prestataire.setDescription(prestataireDTO.getDescription());
        prestataire.setImageUrl(prestataireDTO.getImageUrl());
        prestataire.setEmail(prestataireDTO.getEmail());
        prestataire.setTelephone(prestataireDTO.getTelephone());
        prestataire.setCompetences(prestataireDTO.getCompetences());
        //verification de la ceation de region
        Region region=regionService.verifyOrCreateRegion(prestataireDTO.getRegion());
        prestataire.setRegion(region);
        prestataireRepo.save(prestataire);
    }
}
