package org.example.serviceplatform.Services;

import lombok.RequiredArgsConstructor;
import org.example.serviceplatform.DTO.AuthenticationResponse;
import org.example.serviceplatform.Entities.Enums.TokenType;
import org.example.serviceplatform.Entities.Token;
import org.example.serviceplatform.Entities.Utilisateur;
import org.example.serviceplatform.Exceptions.TokenException;
import org.example.serviceplatform.Repositories.TokenRepo;
import org.example.serviceplatform.Repositories.UtilisateurRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final TokenRepo tokenRepo;
    private final JwtService jwtService;
    private final UtilisateurRepo utilisateurRepo;

    public AuthenticationResponse refreshAuthTokens(String refreshToken) {
        // Vérification du jeton dans le dépôt
        var storedToken = tokenRepo.findByToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Jeton d'actualisation invalide"));

        if (storedToken.isExpired() || storedToken.isRevoked()) {
            throw new RuntimeException("Jeton d'actualisation expiré ou révoqué");
        }

        // Extraction de l'utilisateur
        String userEmail = jwtService.extractUsername(refreshToken);
        Utilisateur user = utilisateurRepo.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // Génération de nouveaux jetons
        return generateAuthTokens(user);
    }


    public AuthenticationResponse generateAuthTokens(Utilisateur user) {
        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        revokeAllUserTokens(user);
        saveUserTokens(user, accessToken, refreshToken);

        return AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public void revokeToken(String token) {
        var tokenEntity = tokenRepo.findByToken(token)
                .orElseThrow(() -> new TokenException("Token non trouvé"));

        tokenEntity.setRevoked(true);
        tokenEntity.setExpired(true);
        tokenRepo.save(tokenEntity);
    }

    void revokeAllUserTokens(Utilisateur user) {
        var validUserTokens = tokenRepo.findAllValidTokensByUserId(user.getId());
        if (validUserTokens.isEmpty()) return;

        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepo.saveAll(validUserTokens);
    }

    private void saveUserTokens(Utilisateur user, String accessToken, String refreshToken) {
        Token accessTokenEntity = new Token();
        accessTokenEntity.setUser(user);
        accessTokenEntity.setToken(accessToken);
        accessTokenEntity.setExpired(false);
        accessTokenEntity.setRevoked(false);
        accessTokenEntity.setTokenType(TokenType.ACCESS); // Assurez-vous que `TokenType` existe

        Token refreshTokenEntity = new Token();
        refreshTokenEntity.setUser(user);
        refreshTokenEntity.setToken(refreshToken);
        refreshTokenEntity.setExpired(false);
        refreshTokenEntity.setRevoked(false);
        refreshTokenEntity.setTokenType(TokenType.REFRESH);

        tokenRepo.saveAll(List.of(accessTokenEntity, refreshTokenEntity));
    }


}