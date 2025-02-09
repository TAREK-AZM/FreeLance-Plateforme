package org.example.serviceplatform.Services;

import org.example.serviceplatform.Entities.Certification;
import org.example.serviceplatform.Entities.Prestataire;
import org.example.serviceplatform.Repositories.CertificationRepo;
import org.example.serviceplatform.Repositories.PrestataireRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CertificationService {
    @Autowired
    CertificationRepo certificationRepo;
    @Autowired
    private PrestataireRepo prestataireRepo;

    public void StoreCertification(Integer id,Certification certification) {
        Prestataire prestataire = prestataireRepo.findById(id).get();
        Certification c = new Certification();
        if(certificationRepo.existsByImageUrl(certification.getImageUrl())){
            throw new RuntimeException("Certification already exists");
        }
        c.setImageUrl(certification.getImageUrl());
        c.setName(certification.getName());
        c.setDescription(certification.getDescription());
        c.setPrestataire(prestataire);
        certificationRepo.save(c);

    }
    public void UpdateCertification(Certification certification) {
        Certification c = certificationRepo.findById(certification.getId()).get();
        c.setImageUrl(certification.getImageUrl());
        c.setName(certification.getName());
        c.setDescription(certification.getDescription());
        certificationRepo.save(c);
    }

    public void DeleteCertification(Integer id) {
        Certification c = certificationRepo.findById(id).get();
        certificationRepo.delete(c);
    }
}
