package org.example.serviceplatform.Mappers;

import org.example.serviceplatform.DTO.MessageDTO;
import org.example.serviceplatform.Entities.Message;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class MessageMapper {

    public MessageDTO toDTO(Message message) {
        if (message == null) return null;

        return MessageDTO.builder()
                .id(message.getId())
                .content(message.getContent())
                .senderId(message.getSender().getId())
                .senderName(message.getSender().getNom() + " " + message.getSender().getPrenom())
                .sentAt(message.getSentAt())
                .deliveredAt(message.getDeliveredAt())
                .readAt(message.getReadAt())
                .status(message.getStatus())
                .build();
    }

    public List<MessageDTO> toDTOList(List<Message> messages) {
        if (messages == null) return Collections.emptyList();
        return messages.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
}


