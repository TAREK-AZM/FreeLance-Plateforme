package org.example.serviceplatform.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;
import org.antlr.v4.runtime.misc.NotNull;

@Data
@Builder
@AllArgsConstructor

public class RegisterRequest {

    @jakarta.validation.constraints.NotBlank(message = "Le prénom est obligatoire")
    private String prenom;

    @jakarta.validation.constraints.NotBlank(message = "Le nom est obligatoire")
    private String nom;

    @jakarta.validation.constraints.NotBlank(message = "L'email est obligatoire")
    @Email(message = "Format d'email invalide")
    private String email;

    @jakarta.validation.constraints.NotBlank(message = "Le mot de passe est obligatoire")
    @Size(min = 8, message = "Le mot de passe doit contenir au moins 8 caractères")
    private String motDePasse;

    private String telephone;
    private String ville;
    private String adresse;
}