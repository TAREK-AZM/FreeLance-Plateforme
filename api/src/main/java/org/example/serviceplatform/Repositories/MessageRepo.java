package org.example.serviceplatform.Repositories;

import org.example.serviceplatform.Entities.Conversation;
import org.example.serviceplatform.Entities.Enums.MessageStatus;
import org.example.serviceplatform.Entities.Message;
import org.example.serviceplatform.Entities.Utilisateur;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepo extends JpaRepository<Message, Integer> {
    Page<Message> findByConversationOrderBySentAtDesc(Conversation conversation, Pageable pageable);

    List<Message> findByConversationAndStatusAndSenderNot(
            Conversation conversation,
            MessageStatus status,
            Utilisateur sender
    );

    @Query("SELECT m FROM Message m WHERE m.sender <> :sender AND m.status = :status")
    List<Message> findBySenderNotAndStatus(@Param("sender") Utilisateur sender, @Param("status") MessageStatus status);


    @Query("SELECT COUNT(m) FROM Message m WHERE m.conversation.id = :conversationId " +
            "AND m.status IN (:statuses) AND m.sender <> :user")
    Long countUnreadMessages(Integer conversationId, Utilisateur user,
                             @Param("statuses") List<MessageStatus> statuses);
    @Query("SELECT c.id, COUNT(m) FROM Conversation c LEFT JOIN c.messages m " +
            "WHERE (c.client = :user OR c.prestataire = :user) " +
            "AND m.status IN (:statuses) AND m.sender <> :user " +
            "GROUP BY c.id")
    List<Object[]> getUnreadMessageCountsByConversation(Utilisateur user,
                                                        @Param("statuses") List<MessageStatus> statuses);
}

