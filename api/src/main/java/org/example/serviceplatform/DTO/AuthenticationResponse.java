package org.example.serviceplatform.DTO;

import lombok.Builder;
import lombok.Data;
import org.example.serviceplatform.Entities.Enums.RoleType;
import org.example.serviceplatform.Entities.Role;

@Data
@Builder
public class AuthenticationResponse {
    private String accessToken;
    private String refreshToken;
    private String message;
    private String role;
}