package org.example.serviceplatform.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Builder;

import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "Type_utilisateur", discriminatorType = DiscriminatorType.STRING)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder


public  class Utilisateur implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String prenom;
    private String nom;
    private String email;
    private String telephone;
    private String motDePasse;
    private boolean actif = true;
    private Integer score;
    private String ville;
    private String adresse;
    private String imageUrl;    // URL de l'image de profil de user
    //role
    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    private Role role;

    //reclatmation
    @OneToMany(mappedBy = "utilisateur",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Reclamation> reclamations;

    //notification
    @OneToMany(mappedBy = "receiver",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Notification> notifications;



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority( this.role.getRoleName().toString()));
    }
    @Override
    public String getPassword() {
        return this.motDePasse;
    }
    @Override
    public String getUsername() {
        return this.email;
    }
    @Override
    public boolean isAccountNonExpired() {
        return this.actif; // Par exemple, un compte inactif est considéré comme expiré
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.actif; // Vous pouvez personnaliser cette logique si nécessaire
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.actif;
    }

    @Override
    public boolean isEnabled() {
        return this.actif;
    }

}
