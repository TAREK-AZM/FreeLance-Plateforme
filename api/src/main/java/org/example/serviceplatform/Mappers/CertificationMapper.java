package org.example.serviceplatform.Mappers;

import org.example.serviceplatform.DPO.CertificationDTO;
import org.example.serviceplatform.Entities.Certification;

public class CertificationMapper {
    public static CertificationDTO toCertificatinDTO(Certification certification) {
        return CertificationDTO.builder()
                .id(certification.getId())
                .name(certification.getName())
                .description(certification.getDescription())
                .imageUrl(certification.getImageUrl())
                .build();
    }
}
