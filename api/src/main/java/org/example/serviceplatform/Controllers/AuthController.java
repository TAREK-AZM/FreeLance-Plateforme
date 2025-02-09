package org.example.serviceplatform.Controllers;


import lombok.RequiredArgsConstructor;
import org.example.serviceplatform.DTO.AuthenticationRequest;
import org.example.serviceplatform.DTO.AuthenticationResponse;
import org.example.serviceplatform.DTO.RegisterRequest;
import org.example.serviceplatform.Services.AuthenticationService;
import org.example.serviceplatform.Services.JwtService;
import org.example.serviceplatform.Services.PasswordService;
import org.example.serviceplatform.Services.TokenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.management.relation.RoleNotFoundException;
import java.util.Map;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationService authService;
    private final PasswordService passwordService;
    private final TokenService tokenService;

    @PostMapping("/client/register")
    public ResponseEntity<AuthenticationResponse> registerClient(@RequestBody RegisterRequest request) throws RoleNotFoundException {
        System.out.println("Received register request for: " + request.getEmail());
        return ResponseEntity.ok(authService.registerClient(request));
    }

    @PostMapping("/prestataire/register")
    public ResponseEntity<AuthenticationResponse> registerPrestataire(@RequestBody @Validated RegisterRequest request) throws RoleNotFoundException {
        return ResponseEntity.ok(authService.registerPrestataire(request));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody @Validated AuthenticationRequest request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @PostMapping("/auth/activate")
    public ResponseEntity<String> activate(@RequestBody Map<String, String> activation) {
        authService.activate(activation);
        return ResponseEntity.ok("Compte activé avec succès");
    }

    @PostMapping("/auth/password-reset-request")
    public ResponseEntity<String> requestPasswordReset(@RequestBody Map<String, String> request) {
        passwordService.initiateReset(request.get("email"));
        return ResponseEntity.ok("Email de réinitialisation envoyé");
    }

    @PostMapping("/auth/password-reset")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> resetInfo) {
        passwordService.resetPassword(resetInfo);
        return ResponseEntity.ok("Mot de passe réinitialisé avec succès");
    }

    @PostMapping("/auth/refresh-token")
    public ResponseEntity<AuthenticationResponse> refreshToken(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");

        if (refreshToken == null || refreshToken.isEmpty()) {
            return ResponseEntity.badRequest().body(null); // Mauvaise requête si le jeton est manquant
        }

        AuthenticationResponse authResponse = tokenService.refreshAuthTokens(refreshToken);

        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/auth/logout")
    public ResponseEntity<String> logout(@RequestBody Map<String, String> request) {
        authService.logout(request.get("refreshToken"));
        return ResponseEntity.ok("Déconnexion réussie");
    }
}
