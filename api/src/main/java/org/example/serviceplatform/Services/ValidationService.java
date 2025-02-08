package org.example.serviceplatform.Services;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.example.serviceplatform.Entities.Utilisateur;
import org.example.serviceplatform.Entities.Validation;
import org.example.serviceplatform.Repositories.ValidationRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;

@Service
@AllArgsConstructor
@Data

public class ValidationService {
    private ValidationRepo validationRepo;
    private NotificationService notificationService;

    @Transactional
    public void enregistrer (Utilisateur user) {
        // Supprimer d'abord les validations existantes pour cet utilisateur
        try {
            // Rechercher et supprimer les validations existantes
            List<Validation> existingValidations = validationRepo.findByUser(user);
            if (!existingValidations.isEmpty()) {
                validationRepo.deleteAll(existingValidations);
                validationRepo.flush(); // Forcer la suppression immédiate
            }
            Validation validation = new Validation();
            validation.setUser(user);
            Instant creataion = Instant.now();
            validation.setCreation(creataion);
            Instant expiration = Instant.now();
            expiration = expiration.plus(10, ChronoUnit.MINUTES);
            validation.setExpiration(expiration);

            Random random = new Random();
            int randomInteger = random.nextInt(999999);
            String code = String.format("06%d", randomInteger);
            validation.setCode(code);
            // Puis sauvegarder la nouvelle validation
            validationRepo.save(validation);
            notificationService.envoyer(validation);

        } catch (Exception e) {
            // Logger l'erreur
            throw new RuntimeException("Erreur lors de la création de la validation: " + e.getMessage(), e);
        }
    }

    public Validation findByCode(String code){
        return validationRepo.findByCode(code).orElseThrow(()-> new RuntimeException("Code est invalide"));
    }
}