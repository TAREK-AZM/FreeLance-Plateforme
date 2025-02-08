package org.example.serviceplatform.Services;

import lombok.RequiredArgsConstructor;
import org.example.serviceplatform.Entities.Utilisateur;
import org.example.serviceplatform.Entities.Validation;
import org.example.serviceplatform.Exceptions.TokenException;
import org.example.serviceplatform.Repositories.UtilisateurRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PasswordService {
    private final UtilisateurRepo utilisateurRepo;
    private final ValidationService validationService;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public void initiateReset(String email) {
        var user = utilisateurRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        validationService.enregistrer(user);
    }

    public void resetPassword(Map<String, String> resetInfo) {
        String code = resetInfo.get("code");
        String newPassword = resetInfo.get("newPassword");

        if (code == null || newPassword == null) {
            throw new IllegalArgumentException("Code ou mot de passe manquant");
        }

        Validation validation = validationService.findByCode(code);
        validateResetCode(validation);

        Utilisateur user = utilisateurRepo.findById(validation.getUser().getId())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        updatePassword(user, newPassword);
    }

    private void validateResetCode(Validation validation) {
        if (Instant.now().isAfter(validation.getExpiration())) {
            throw new TokenException("Code expiré");
        }
    }

    private void updatePassword(Utilisateur user, String newPassword) {
        user.setMotDePasse(passwordEncoder.encode(newPassword));
        utilisateurRepo.save(user);
        tokenService.revokeAllUserTokens(user);
    }
}