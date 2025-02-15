package org.example.serviceplatform.DTO;

import lombok.*;
import org.example.serviceplatform.Entities.Enums.MessageStatus;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageDTO {
    private Integer id;
    private String content;
    private Integer senderId;
    private String senderName;
    private LocalDateTime sentAt;
    private LocalDateTime deliveredAt;
    private LocalDateTime readAt;
    private MessageStatus status;
}


