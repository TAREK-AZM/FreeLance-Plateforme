package org.example.serviceplatform.Services;

import org.example.serviceplatform.DPO.PrestataireProfilDTO;
import org.example.serviceplatform.Entities.Prestataire;
import org.example.serviceplatform.Mappers.PrestataireMapper;
import org.example.serviceplatform.Repositories.PrestataireRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PrestataireService {
    @Autowired
    private PrestataireRepo prestataireRepo;

    ///////////////////////////         Profil         /////////////////////////////////
    public PrestataireProfilDTO getPrestataire(Integer id) {
        if (id == null) {
            throw new IllegalArgumentException("L'ID du prestataire ne peut pas être null.");
        }
        return PrestataireMapper.toPrestProfilDTO(prestataireRepo.findById(id).orElseThrow(()->new RuntimeException("not found ")));
    }
}
