package org.example.serviceplatform.DTO;

import lombok.Builder;
import lombok.Data;
import org.example.serviceplatform.Entities.Enums.RoleType;

@Data
@Builder
public class AuthenticationResponse {
    private String accessToken;
    private String refreshToken;
    private RoleType roleType;
    private String message;
    private RoleType role;
}