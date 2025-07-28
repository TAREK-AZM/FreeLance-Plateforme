package org.example.serviceplatform.Services;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.serviceplatform.Entities.Utilisateur;
import org.example.serviceplatform.Repositories.TokenRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

@Slf4j
@Transactional
@Service

public class JwtService {
    @Value("${jwt.secret.key}")
    private String secretKey;

    private final TokenRepo tokenRepo;

    public JwtService(TokenRepo tokenRepo) {
        this.tokenRepo = tokenRepo;
    }

    public String generateAccessToken(Utilisateur user) {
        return buildToken(user, 15L, TimeUnit.MINUTES);
    }

    public String generateRefreshToken(Utilisateur user) {
        return buildToken(user, 7L, TimeUnit.DAYS);
    }

    private String buildToken(Utilisateur user, Long duration, TimeUnit timeUnit) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + timeUnit.toMillis(duration)))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public boolean isTokenValid(String token, Utilisateur user) {
        final String username = extractUsername(token);
        return (username.equals(user.getEmail())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    @Scheduled(cron = "0 0 * * * *")
    public void removeUselessJwt(){
        log.info("Suppression des tokens a {}", Instant.now());
        tokenRepo.deleteAllByExpiredAndRevoked(true,true);
    }
}