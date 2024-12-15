package org.example.serviceplatform;

import org.example.serviceplatform.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<AppUser, Long> {
    // Custom query methods can be added here
}