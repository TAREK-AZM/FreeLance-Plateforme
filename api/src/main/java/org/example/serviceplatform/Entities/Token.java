package org.example.serviceplatform.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.serviceplatform.Entities.Enums.TokenType;

import java.time.LocalDateTime;

@Entity
@Table(name = "tokens")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String token;

    @Enumerated(EnumType.STRING)
    private TokenType tokenType; // ACCESS, REFRESH

    private boolean expired;
    private boolean revoked;
    private LocalDateTime expiryDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Utilisateur user;

    public boolean isValid() {
        return !expired && !revoked && expiryDate.isAfter(LocalDateTime.now());
    }
}