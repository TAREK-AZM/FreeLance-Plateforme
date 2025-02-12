package org.example.serviceplatform.DTO;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class NotificationDTO {
    private int id;
    private String subject;
    private String message;
    private LocalDateTime date;
    private boolean isRead ;
}
