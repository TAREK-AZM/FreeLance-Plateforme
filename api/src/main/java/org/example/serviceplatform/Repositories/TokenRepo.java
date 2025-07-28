package org.example.serviceplatform.Repositories;

import org.example.serviceplatform.Entities.Token;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TokenRepo extends JpaRepository<Token, Integer> {
    Optional<Token> findByToken(String token);
    List<Token> findAllValidTokensByUserId(Integer userId);
    void deleteAllByExpiredAndRevoked(boolean expired, boolean revoked);
}