package org.example.serviceplatform.Services;

import lombok.RequiredArgsConstructor;
import org.example.serviceplatform.DTO.ConversationDTO;
import org.example.serviceplatform.DTO.MessageDTO;
import org.example.serviceplatform.Entities.*;
import org.example.serviceplatform.Entities.Enums.MessageStatus;
import org.example.serviceplatform.Mappers.ConversationMapper;
import org.example.serviceplatform.Mappers.MessageMapper;
import org.example.serviceplatform.Repositories.ConversationRepo;
import org.example.serviceplatform.Repositories.MessageRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ConversationService {
    private final ConversationRepo conversationRepository;
    private final MessageRepo messageRepository;
    private final ConversationMapper conversationMapper;
    private final MessageMapper messageMapper;

    public ConversationDTO getOrCreateConversation(Utilisateur client, Utilisateur prestataire) {
        Conversation conversation = conversationRepository.findConversationBetweenUsers(client, prestataire);
        if (conversation == null) {
            conversation = Conversation.builder()
                    .client(client)
                    .prestataire(prestataire)
                    .build();
            conversation = conversationRepository.save(conversation);
        }
        return conversationMapper.toDTO(conversation);
    }

    public MessageDTO sendMessage(Integer conversationId, Utilisateur sender, String content) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation non trouvée"));

        Message message = Message.builder()
                .conversation(conversation)
                .sender(sender)
                .content(content)
                .status(MessageStatus.SENT)
                .build();

        Message savedMessage = messageRepository.save(message);
        return messageMapper.toDTO(savedMessage);
    }

    public List<ConversationDTO> getUserConversations(Utilisateur user) {
        List<Conversation> conversations = conversationRepository.findByClientOrPrestataire(user, user);

        // Récupérer le nombre de messages non lus pour chaque conversation
        Map<Integer, Long> unreadCounts = messageRepository.getUnreadMessageCountsByConversation(user, Arrays.asList(MessageStatus.SENT, MessageStatus.DELIVERED))
                .stream()
                .collect(Collectors.toMap(
                        arr -> (Integer) arr[0],
                        arr -> (Long) arr[1]
                ));

        List<ConversationDTO> conversationDTOs = conversationMapper.toDTOList(conversations);

        // Ajouter le nombre de messages non lus à chaque DTO
        conversationDTOs.forEach(dto ->
                dto.setUnreadCount(unreadCounts.getOrDefault(dto.getId(), 0L))
        );

        return conversationDTOs;
    }

    public Page<MessageDTO> getConversationMessages(Integer conversationId, Pageable pageable) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation non trouvée"));

        return messageRepository.findByConversationOrderBySentAtDesc(conversation, pageable)
                .map(messageMapper::toDTO);
    }

    public void markMessagesAsDelivered(Integer conversationId, Utilisateur recipient) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation non trouvée"));

        List<Message> undeliveredMessages = messageRepository
                .findByConversationAndStatusAndSenderNot(conversation, MessageStatus.SENT, recipient);

        undeliveredMessages.forEach(message -> {
            message.setStatus(MessageStatus.DELIVERED);
            message.setDeliveredAt(LocalDateTime.now());
        });
        messageRepository.saveAll(undeliveredMessages);
    }

    public void markMessagesAsRead(Integer conversationId, Utilisateur reader) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation non trouvée"));

        List<Message> unreadMessages = messageRepository
                .findByConversationAndStatusAndSenderNot(conversation, MessageStatus.SENT, reader);
        System.out.println(unreadMessages);
        unreadMessages.forEach(message -> {
            message.setStatus(MessageStatus.READ);
            message.setReadAt(LocalDateTime.now());
        });
        messageRepository.saveAll(unreadMessages);
    }

    public List<MessageDTO> getUnreadMessages(Utilisateur user) {
        List<Message> unreadMessages = messageRepository.findBySenderNotAndStatus(user, MessageStatus.SENT);
        return messageMapper.toDTOList(unreadMessages);
    }

    @Transactional(readOnly = true)
    public Long getUnreadMessageCount(Integer conversationId, Utilisateur user) {
        return messageRepository.countUnreadMessages(conversationId, user,
                Arrays.asList(MessageStatus.SENT, MessageStatus.DELIVERED));
    }


    public void deleteConversation(Integer conversationId, Utilisateur user) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation non trouvée"));

        // Vérifier que l'utilisateur est participant à la conversation
        if (!conversation.getClient().equals(user) && !conversation.getPrestataire().equals(user)) {
            throw new RuntimeException("Accès non autorisé à cette conversation");
        }

        conversationRepository.delete(conversation);
    }
}