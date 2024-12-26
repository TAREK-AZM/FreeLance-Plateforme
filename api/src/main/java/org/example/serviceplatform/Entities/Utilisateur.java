package org.example.serviceplatform.Entities;

import jakarta.persistence.*;

import lombok.Data;

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
@SuperBuilder

public abstract class Utilisateur implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String prenom;
    private String nom;
    private String email;
    private String telephone;
    private String motDePasse;
    private boolean isVerified = false;
    private Integer score;
    //role
    @ManyToOne(cascade = CascadeType.ALL)
    private Role role;

    //reclatmation
    @OneToMany(mappedBy = "utilisateur",cascade = CascadeType.ALL)
    private List<Reclamation> reclamations;

    //notification
    @OneToMany(mappedBy = "receiver",cascade = CascadeType.ALL)
    private List<Notification> notifications;
    //region
    @ManyToOne
    @JoinColumn(name = "region_id")
    private Region region;






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
        return this.isVerified; // Par exemple, un compte inactif est considéré comme expiré
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.isVerified; // Vous pouvez personnaliser cette logique si nécessaire
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.isVerified;
    }

    @Override
    public boolean isEnabled() {
        return this.isVerified;
    }

}
