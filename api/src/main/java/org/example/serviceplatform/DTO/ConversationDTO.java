package org.example.serviceplatform.DTO;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConversationDTO {
    private Integer id;
    private Integer clientId;
    private String clientName;
    private Integer prestataireId;
    private String prestataireName;
    private LocalDateTime createdAt;
    private List<MessageDTO> messages;
    private Long unreadCount;
}

