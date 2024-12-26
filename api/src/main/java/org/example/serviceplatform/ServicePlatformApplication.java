package org.example.serviceplatform;

import org.example.serviceplatform.Entities.*;
import org.example.serviceplatform.Entities.Enums.CompetenceType;
import org.example.serviceplatform.Entities.Enums.Province;
import org.example.serviceplatform.Entities.Enums.RoleType;
import org.example.serviceplatform.Entities.Enums.Ville;
import org.example.serviceplatform.Repositories.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.server.ConfigurableWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.Arrays;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "org.example.serviceplatform.Repositories")
public class ServicePlatformApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServicePlatformApplication.class, args);
	}
	@Bean
	public WebServerFactoryCustomizer<ConfigurableWebServerFactory> webServerFactoryCustomizer() {
		return factory -> factory.setPort(8090); // Remplacez par le port désiré
	}
//	@Bean
//	CommandLineRunner initData(UtilisateurRepo utilisateurRepository,
//							   RegionRepo regionRepository,
//							   RoleRepo roleRepository,
//							   CompetenceRepo competenceRepo,
//							   CertificationRepo certificationRepo) {
//		return args -> {
//			// **1. Créer ou récupérer les relations nécessaires**
//
//			// Récupérer ou créer une région
//
//				Region region= new Region();
//				region.setVille(Ville.CASABLANCA);
//				region.setProvince(Province.CASABLANCA_SETATT);
//				region.setAdresse("123 Rue Principale");
//				regionRepository.save(region);
//			// Sauvegarde dans la base
//
//
//			// Récupérer ou créer un rôle
//
//				Role role = new Role();
//				role.setRoleName(RoleType.PRESTATAIRE);
//			// Sauvegarde dans la base
//
//
//
//				Competence competence1 = new Competence();
//				competence1.setName(CompetenceType.MENUISERIE);
//				//competence1 = competenceRepo.save(competence1);
//
//
//
//				Competence competence2 = new Competence();
//				competence2.setName(CompetenceType.CLIMATISATION);
//				//competence2 = competenceRepo.save(competence2);
//
//
//			// Créer des certifications
//			Certification certification1 = new Certification();
//			certification1.setName("Certification Plomberie");
//			certification1.setDescription("Formation avancée en plomberie");
//			certification1.setImageUrl("http://example.com/certifications/plomberie.jpg");
//
//			Certification certification2 = new Certification();
//			certification2.setName("Certification Climatisation");
//			certification2.setDescription("Expertise en maintenance de climatisation");
//			certification2.setImageUrl("http://example.com/certifications/climatisation.jpg");
//
//			// **2. Créer l’objet Prestataire**
//			Prestataire prestataire = new Prestataire();
//			prestataire.setPrenom("Ahmed");
//			prestataire.setNom("El Mansouri");
//			prestataire.setEmail("ahmed@example.com");
//			prestataire.setTelephone("0612345678");
//			prestataire.setMotDePasse("password123");
//			prestataire.setScore(95);
//			prestataire.setDescription("Spécialiste en plomberie et climatisation");
//			prestataire.setImageUrl("http://example.com/images/ahmed.jpg");
//			prestataire.setRegion(region);  // Association avec la région
//			prestataire.setRole(role);      // Association avec le rôle
//
//			// **3. Ajouter les relations au Prestataire**
//			prestataire.setCompetences(Arrays.asList(competence1, competence2));
//			certification1.setPrestataire(prestataire); // Associe la certification au prestataire
//			certification2.setPrestataire(prestataire);
//			prestataire.setCertifications(Arrays.asList(certification1, certification2));
//
//			// **4. Enregistrer l’objet dans la base**
//			utilisateurRepository.save(prestataire);
//
//			System.out.println("Prestataire créé avec succès !");
//		};
//	}
}
