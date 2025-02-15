package org.example.serviceplatform.Repositories;

import org.example.serviceplatform.Entities.Conversation;
import org.example.serviceplatform.Entities.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ConversationRepo extends JpaRepository<Conversation, Integer> {
    List<Conversation> findByClientOrPrestataire(Utilisateur client, Utilisateur prestataire);

    @Query("SELECT c FROM Conversation c WHERE (c.client = :user1 AND c.prestataire = :user2) OR (c.client = :user2 AND c.prestataire = :user1)")
    Conversation findConversationBetweenUsers(Utilisateur user1, Utilisateur user2);
}

