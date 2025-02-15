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

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final TokenRepo tokenRepo;
    private final JwtService jwtService;
    private final UtilisateurRepo utilisateurRepo;

    public AuthenticationResponse refreshAuthTokens(String refreshToken) {
        var storedToken = tokenRepo.findByToken(refreshToken)
                .orElseThrow(() -> new TokenException("Jeton d'actualisation invalide"));

        if (!storedToken.isValid() || storedToken.getTokenType() != TokenType.REFRESH) {
            throw new TokenException("Jeton d'actualisation invalide ou expiré");
        }

        String userEmail = jwtService.extractUsername(refreshToken);
        Utilisateur user = utilisateurRepo.findByEmail(userEmail)
                .orElseThrow(() -> new TokenException("Utilisateur non trouvé"));

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
                .role(user.getRole().getRoleName())
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
        Token accessTokenEntity = Token.builder()
                .user(user)
                .token(accessToken)
                .tokenType(TokenType.ACCESS)
                .expired(false)
                .revoked(false)
                .expiryDate(LocalDateTime.now().plusMinutes(15))
                .build();

        Token refreshTokenEntity = Token.builder()
                .user(user)
                .token(refreshToken)
                .tokenType(TokenType.REFRESH)
                .expired(false)
                .revoked(false)
                .expiryDate(LocalDateTime.now().plusDays(7))
                .build();

        tokenRepo.saveAll(List.of(accessTokenEntity, refreshTokenEntity));
    }


}