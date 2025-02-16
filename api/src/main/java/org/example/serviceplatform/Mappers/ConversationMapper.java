package org.example.serviceplatform.Mappers;

import org.example.serviceplatform.DTO.ConversationDTO;
import org.example.serviceplatform.Entities.Conversation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ConversationMapper {

    private final MessageMapper messageMapper;

    public ConversationMapper(MessageMapper messageMapper) {
        this.messageMapper = messageMapper;
    }


    public ConversationDTO toDTO(Conversation conversation) {
        if (conversation == null) return null;

        return ConversationDTO.builder()
                .id(conversation.getId())
                .clientId(conversation.getClient().getId())
                .clientName(conversation.getClient().getNom() + " " + conversation.getClient().getPrenom())
                .prestataireId(conversation.getPrestataire().getId())
                .prestataireName(conversation.getPrestataire().getNom() + " " + conversation.getPrestataire().getPrenom())
                .createdAt(conversation.getCreatedAt())
                .messages(conversation.getMessages().stream()
                        .map(messageMapper::toDTO) // Use MessageMapper to map each Message to MessageDTO
                        .collect(Collectors.toList()))
                .build();
    }

    public List<ConversationDTO> toDTOList(List<Conversation> conversations) {
        if (conversations == null) return Collections.emptyList();
        return conversations.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
}
