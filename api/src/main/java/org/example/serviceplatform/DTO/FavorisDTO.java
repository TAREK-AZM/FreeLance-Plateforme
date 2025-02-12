package org.example.serviceplatform.DTO;



import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
@Data
@Builder
public class FavorisDTO {

    private Integer id;
    private ServiceDTO serviceDTO;
    private LocalDateTime dateAjout;
}
