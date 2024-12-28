package org.example.serviceplatform.Services;

import org.example.serviceplatform.Entities.Region;
import org.example.serviceplatform.Repositories.RegionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegionService {
    @Autowired
    RegionRepo regionRepo;


    public Region verifyOrCreateRegion(Region regionDTO) {
        if (regionDTO == null) {
            // Retourner null si aucun objet région n'est fourni
            return null;
        }

        // Vérifier si une région avec les mêmes valeurs existe déjà
        Region existingRegion = regionRepo.findByVilleAndProvinceAndAdresse(
                regionDTO.getVille(),
                regionDTO.getProvince(),
                regionDTO.getAdresse()
        );

        if (existingRegion != null) {
            // Retourner la région existante si elle correspond aux valeurs fournies
            return existingRegion;
        }

        // Si l'ID de la région est non nul, chercher la région par son ID
        if (regionDTO.getId() != null) {
            return regionRepo.findById(regionDTO.getId())
                    .map(existing -> {
                        // Mettre à jour la région existante
                        existing.setVille(regionDTO.getVille());
                        existing.setProvince(regionDTO.getProvince());
                        existing.setAdresse(regionDTO.getAdresse());
                        return existing;
                    })
                    .orElseGet(() -> {
                        // Sinon, créer une nouvelle région si l'ID est non valide
                        Region newRegion = new Region();
                        newRegion.setVille(regionDTO.getVille());
                        newRegion.setProvince(regionDTO.getProvince());
                        newRegion.setAdresse(regionDTO.getAdresse());
                        return regionRepo.save(newRegion); // Sauvegarder la nouvelle région
                    });
        }

        // Si aucune région correspondante et aucun ID, créer une nouvelle région
        Region newRegion = new Region();
        newRegion.setVille(regionDTO.getVille());
        newRegion.setProvince(regionDTO.getProvince());
        newRegion.setAdresse(regionDTO.getAdresse());
        return regionRepo.save(newRegion);
    }






}
