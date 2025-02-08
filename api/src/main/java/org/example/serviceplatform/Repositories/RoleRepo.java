package org.example.serviceplatform.Repositories;

import org.example.serviceplatform.Entities.Enums.RoleType;
import org.example.serviceplatform.Entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepo extends JpaRepository<Role, Integer> {
    Optional<Role> findByRoleName(RoleType roleName);
}
