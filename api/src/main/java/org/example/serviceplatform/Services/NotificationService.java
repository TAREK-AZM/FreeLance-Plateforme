package org.example.serviceplatform.Services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.serviceplatform.DTO.NotificationDTO;
import org.example.serviceplatform.Entities.Notification;
import org.example.serviceplatform.Entities.Utilisateur;
import org.example.serviceplatform.Entities.Validation;
import org.example.serviceplatform.Mappers.NotificationMapper;
import org.example.serviceplatform.Repositories.NotificationRepo;
import org.example.serviceplatform.Repositories.UtilisateurRepo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor



public class NotificationService {
    private final JavaMailSender javaMailSender;
    private final NotificationRepo notificationRepo;
    private final UtilisateurRepo utilisateurRepo;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void envoyer(Validation validation){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(validation.getUser().getEmail());
        message.setSubject("Votre code d'activation");

        String texte = String.format(
                "Bonjour %s, Votre code d'activation est %s. A bientot",
                validation.getUser().getNom(),
                validation.getCode()
        );
        message.setText(texte);

        javaMailSender.send(message);
    }

    public void createNotification(Utilisateur receiver, String subject, String message){
        Notification notification = new Notification();
        notification.setReceiver(receiver);
        notification.setSubject(subject);
        notification.setMessage(message);
        notification.setDate(LocalDateTime.now());
        notification.setRead(false); // Par défaut, la notification n'est pas encore lue

        notificationRepo.save(notification);
    }

    public List<NotificationDTO> getAllNotificationsofUser(Integer idUser){
      //  return utilisateurRepo.findById(idUser).get().getNotifications().stream().map(NotificationMapper::toNotificationDTO).collect(Collectors.toList());
       return notificationRepo.findByReceiverIdOrderByDateDesc(idUser).stream().map(NotificationMapper::toNotificationDTO).collect(Collectors.toList());
    }

    //marquer la notification comme lue
    public void markAsRead(Integer notificationID){
        Notification notification = notificationRepo.findById(notificationID).get();
        notification.setRead(true);
        notificationRepo.save(notification);
    }


}