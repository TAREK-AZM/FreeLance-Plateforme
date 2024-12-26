package org.example.serviceplatform.Repositories;

import org.example.serviceplatform.Entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<Role, Integer> {
}
