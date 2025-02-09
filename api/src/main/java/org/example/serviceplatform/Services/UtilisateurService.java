package org.example.serviceplatform.Services;

import jakarta.transaction.Transactional;
import org.example.serviceplatform.Entities.Prestataire;
import org.example.serviceplatform.Entities.Utilisateur;
import org.example.serviceplatform.Repositories.UtilisateurRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
@Transactional
@Service
public class UtilisateurService implements UserDetailsService {
    @Autowired
    private final UtilisateurRepo utilisateurRepo;

    public UtilisateurService(UtilisateurRepo utilisateurRepo) {
        this.utilisateurRepo = utilisateurRepo;
    }

    //recuperer l'id du user authentifié
    public Integer getAuthenticatedUserId() {
         Object object = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email=((Utilisateur) object).getEmail();

        return utilisateurRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"))
                .getId();
    }
    @Override
    public Utilisateur loadUserByUsername(String username) throws UsernameNotFoundException {
        return  utilisateurRepo.findByEmail(username).orElseThrow(()->new UsernameNotFoundException("no user found"));
    }

    public void deleteUser(Integer id){
        if(utilisateurRepo.existsById(id)){
            utilisateurRepo.deleteById(id);
        }
        else throw new UsernameNotFoundException("user not found");
    }
}
