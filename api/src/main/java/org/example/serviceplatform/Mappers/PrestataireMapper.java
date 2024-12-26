package org.example.serviceplatform.Mappers;

import org.example.serviceplatform.DPO.PrestataireProfilDTO;
import org.example.serviceplatform.Entities.Certification;
import org.example.serviceplatform.Entities.Prestataire;

import java.util.stream.Collectors;

public class PrestataireMapper {
   public static PrestataireProfilDTO toPrestProfilDTO(Prestataire prestataire){

       return PrestataireProfilDTO.builder()
               .id(prestataire.getId())
               .prenom(prestataire.getPrenom())
               .nom(prestataire.getNom())
               .email(prestataire.getEmail())
               .telephone(prestataire.getTelephone())
               .description(prestataire.getDescription())
               .imageUrl(prestataire.getImageUrl())
               .region(prestataire.getRegion()) // Associer l'objet Region
               .competences(prestataire.getCompetences()) // Ajouter les compétences
               .certifications(prestataire.getCertifications().stream().map(cert->CertificationMapper.toCertificatinDTO(cert)).collect(Collectors.toList()))// Ajouter les certifications
               .build();
   }
}
