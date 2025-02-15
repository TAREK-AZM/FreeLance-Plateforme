package org.example.serviceplatform.Controllers;

import org.example.serviceplatform.DTO.ConversationDTO;
import org.example.serviceplatform.DTO.MessageDTO;
import org.example.serviceplatform.Entities.Utilisateur;
import org.example.serviceplatform.Services.ConversationService;
import org.example.serviceplatform.Services.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conversations")
public class ConversationController {

    @Autowired
    private UtilisateurService utilisateurService;

    @Autowired
    private ConversationService conversationService;

    @PostMapping("/with/{otherUserId}")
    public ConversationDTO createConversation(@PathVariable Integer otherUserId) {
        Integer currentUserId = utilisateurService.getAuthenticatedUserId();
        Utilisateur currentUser = utilisateurService.getUtilisateur(currentUserId);
        Utilisateur otherUser = utilisateurService.getUtilisateur(otherUserId);
        return conversationService.getOrCreateConversation(currentUser, otherUser);
    }

    @GetMapping
    public List<ConversationDTO> getConversations() {
        Integer userId = utilisateurService.getAuthenticatedUserId();
        Utilisateur user = utilisateurService.getUtilisateur(userId);
        return conversationService.getUserConversations(user);
    }

    @GetMapping("/{conversationId}/messages")
    public Page<MessageDTO> getConversationMessages(
            @PathVariable Integer conversationId,
            Pageable pageable) {
        return conversationService.getConversationMessages(conversationId, pageable);
    }

    @PostMapping("/{conversationId}/messages")
    public MessageDTO sendMessage(
            @PathVariable Integer conversationId,
            @RequestBody String content) {
        Integer userId = utilisateurService.getAuthenticatedUserId();
        Utilisateur user = utilisateurService.getUtilisateur(userId);
        return conversationService.sendMessage(conversationId, user, content);
    }

    @PutMapping("/{conversationId}/mark-read")
    public ResponseEntity<String> markMessagesAsRead(@PathVariable Integer conversationId) {
        Integer userId = utilisateurService.getAuthenticatedUserId();
        Utilisateur user = utilisateurService.getUtilisateur(userId);
        conversationService.markMessagesAsRead(conversationId, user);
        return ResponseEntity.ok("Messages marked as read");
    }

    @GetMapping("/{conversationId}/unread-count")
    public Long getUnreadMessageCount(@PathVariable Integer conversationId) {
        Integer userId = utilisateurService.getAuthenticatedUserId();
        Utilisateur user = utilisateurService.getUtilisateur(userId);
        return conversationService.getUnreadMessageCount(conversationId, user);
    }

    @DeleteMapping("/{conversationId}")
    public ResponseEntity<String> deleteConversation(@PathVariable Integer conversationId) {
        Integer userId = utilisateurService.getAuthenticatedUserId();
        Utilisateur user = utilisateurService.getUtilisateur(userId);
        conversationService.deleteConversation(conversationId, user);
        return ResponseEntity.ok("Conversation deleted");
    }

    @DeleteMapping("/messages/{messageId}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Integer messageId) {
        Integer userId = utilisateurService.getAuthenticatedUserId();
        Utilisateur user = utilisateurService.getUtilisateur(userId);
        try {
            conversationService.deleteMessage(messageId, user);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
