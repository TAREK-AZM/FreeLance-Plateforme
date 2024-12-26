package org.example.serviceplatform.DPO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CertificationDTO {
    private Integer id;
    private String name; // Nom de la certification
    private String description; // Description ou détails de la certification
    private String imageUrl;

}
