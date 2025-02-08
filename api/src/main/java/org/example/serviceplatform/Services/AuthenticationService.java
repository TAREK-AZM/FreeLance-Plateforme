package org.example.serviceplatform.Services;

import lombok.RequiredArgsConstructor;
import org.example.serviceplatform.DTO.AuthenticationRequest;
import org.example.serviceplatform.DTO.AuthenticationResponse;
import org.example.serviceplatform.DTO.RegisterRequest;
import org.example.serviceplatform.Entities.Enums.RoleType;
import org.example.serviceplatform.Entities.Role;
import org.example.serviceplatform.Entities.Token;
import org.example.serviceplatform.Entities.Utilisateur;
import org.example.serviceplatform.Entities.Validation;
import org.example.serviceplatform.Exceptions.AuthenticationException;
import org.example.serviceplatform.Exceptions.ValidationException;
import org.example.serviceplatform.Repositories.RoleRepo;
import org.example.serviceplatform.Repositories.UtilisateurRepo;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.management.relation.RoleNotFoundException;
import java.time.Instant;
import java.util.Map;
import java.util.Optional;

@Service
//@RequiredArgsConstructor
public class AuthenticationService {
    private final UtilisateurRepo utilisateurRepo;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;
    private final ValidationService validationService;
    private final RoleRepo roleRepo;

    public AuthenticationService(
            UtilisateurRepo utilisateurRepo,
            TokenService tokenService,
            PasswordEncoder passwordEncoder,
            ValidationService validationService,
            RoleRepo roleRepo) {
        this.utilisateurRepo = utilisateurRepo;
        this.tokenService = tokenService;
        this.passwordEncoder = passwordEncoder;
        this.validationService = validationService;
        this.roleRepo = roleRepo;
    }

    public AuthenticationResponse registerClient(RegisterRequest request) throws RoleNotFoundException {
        validateRegistration(request.getEmail());
        Utilisateur user = buildUser(request, RoleType.CLIENT);
        System.out.println("Il arrive ici (Service)");
        return completeRegistration(user);
    }

    public AuthenticationResponse registerPrestataire(RegisterRequest request) throws RoleNotFoundException {
        validateRegistration(request.getEmail());
        Utilisateur user = buildUser(request, RoleType.PRESTATAIRE);
        return completeRegistration(user);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var user = validateCredentials(request);
        return tokenService.generateAuthTokens(user);
    }

    public void activate(Map<String, String> activation) {
        Validation validation = validationService.findByCode(activation.get("code"));
        if (Instant.now().isAfter(validation.getExpiration())) {
            throw new RuntimeException("Code expiré");
        }
        Utilisateur user = utilisateurRepo.findById(validation.getUser().getId())
                .orElseThrow(() -> new RuntimeException("Utilisateur inconnu"));
        user.setActif(true);
        utilisateurRepo.save(user);
    }

    public void logout(String refreshToken) {
        tokenService.revokeToken(refreshToken);
    }

    private void validateRegistration(String email) {
        if (!email.matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new ValidationException("Email invalide");
        }
        if (utilisateurRepo.existsByEmail(email)) {
            throw new ValidationException("Email déjà utilisé");
        }
    }

    private Utilisateur buildUser(RegisterRequest request, RoleType roleType) throws RoleNotFoundException {
        Role role = roleRepo.findByRoleName(roleType)
                .orElseThrow(() -> new RoleNotFoundException("Role non trouvé"));
        System.out.println(request);
        return Utilisateur.builder()
                .prenom(request.getPrenom())
                .nom(request.getNom())
                .email(request.getEmail())
                .motDePasse(passwordEncoder.encode(request.getMotDePasse()))
                .telephone(request.getTelephone())
                .role(role)
                .actif(false)
                .build();
    }

    private AuthenticationResponse completeRegistration(Utilisateur user) {
        user = utilisateurRepo.save(user);
        validationService.enregistrer(user);

        return AuthenticationResponse.builder()
                .message("Vérifiez votre email pour activer votre compte")
                .build();
    }

    private Utilisateur validateCredentials(AuthenticationRequest request) {
        var user = utilisateurRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new AuthenticationException("Identifiants invalides"));

        if (!passwordEncoder.matches(request.getPassword(), user.getMotDePasse())) {
            throw new AuthenticationException("Identifiants invalides");
        }

        if (!user.isActif()) {
            throw new AuthenticationException("Compte non activé");
        }

        return user;
    }
}