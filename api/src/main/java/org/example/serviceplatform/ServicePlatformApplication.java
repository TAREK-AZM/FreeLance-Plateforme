package org.example.serviceplatform;

import org.example.serviceplatform.Entities.*;
import org.example.serviceplatform.Entities.Enums.*;
import org.example.serviceplatform.Repositories.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.server.ConfigurableWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Date;

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
////							   RegionRepo regionRepository,
//							   PrestataireRepo prestataireRepo,
//							   ServiceRepo serviceRepo,
//							   RoleRepo roleRepository,
//							   CompetenceRepo competenceRepo,
//							   CertificationRepo certificationRepo,
//							   CategoryRepo categoryRepo,
//							   ClientRepo clientRepo,
//							    DemandeRepo demandeRepo){
//		return args -> {
//			// **1. Créer ou récupérer les relations nécessaires**
////			Region region=regionRepository.findById(1).orElse(null);
//			Role roleC = new Role();
//				roleC.setRoleName(RoleType.PRESTATAIRE);



//           Client client1 = new Client();
//		   client1.setNom("oussama");
//		   client1.setPrenom("batteui");
//		   client1.setEmail("oussama@gmail.com");
//		   client1.setTelephone("09388339");
//		   client1.setScore(20);
//		   client1.setMotDePasse("1234");
//		   client1.setVerified(true);
//		   client1.setRole(roleC);
//		   client1.setRegion(region);
//		   utilisateurRepository.save(client1);
//
//	      Client client2 = new Client();
//			client2.setNom("ahmed");
//			client2.setPrenom("batteui");
//			client2.setEmail("ahmed@gmail.com");
//			client2.setTelephone("09388339");
//			client2.setScore(50);
//			client2.setRole(roleC);
//			client2.setRegion(region);
//			client2.setMotDePasse("1234");
//			clientRepo.save(client2);
//
//			Client client1=clientRepo.findById(2).orElse(null);
//			Client client2=clientRepo.findById(3).orElse(null);
////
//			DemandeClient demande1 = new DemandeClient();
//			demande1.setService(serviceRepo.findById(2).orElse(null));
//			demande1.setClient(client1);
//			demande1.setDateDemande(LocalDateTime.now());
//			demande1.setStatus(StatusDemande.EN_COURS);
//			demandeRepo.save(demande1);
//////
//			DemandeClient demande2 = new DemandeClient();
//			demande2.setService(serviceRepo.findById(1).orElse(null));
//			demande2.setClient(client2);
//			demande2.setDateDemande(LocalDateTime.now());
//			demande2.setStatus(StatusDemande.EN_COURS);
//			demandeRepo.save(demande2);
////
//			DemandeClient demande3 = new DemandeClient();
//			demande3.setService(serviceRepo.findById(2).orElse(null));
//			demande3.setClient(client1);
//			demande3.setDateDemande(LocalDateTime.now());
//			demande3.setStatus(StatusDemande.EN_COURS);
//			demandeRepo.save(demande3);
////
//			DemandeClient demande4 = new DemandeClient();
//			demande4.setDateDemande(LocalDateTime.now());
//			demande4.setClient(client2);
//			demande4.setStatus(StatusDemande.EN_COURS);
//			demande4.setService(serviceRepo.findById(1).orElse(null));
//			demandeRepo.save(demande4);
//////
//			client1.setDemandes(Arrays.asList(demande1, demande2));
//			client2.setDemandes(Arrays.asList(demande3, demande4));
//			clientRepo.save(client1);
//			clientRepo.save(client2);
//
//
//


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
//			prestataire.setEmail("abdelwahid@gmail.com");
//			prestataire.setTelephone("0612345678");
//			prestataire.setMotDePasse("password");
//			prestataire.setScore(95);
//			prestataire.setDescription("Spécialiste en plomberie et climatisation");
//			prestataire.setImageUrl("http://example.com/images/ahmed.jpg");
//			prestataire.setVille("Tanger");  // Association avec la région
//			prestataire.setAdresse("Tanger fvdvdvdvvdvdvdv");  // Association avec la région
//			prestataire.setRole(roleC);      // Association avec le rôle
//
//			// **3. Ajouter les relations au Prestataire**
//			prestataire.setCompetences(Arrays.asList(competence1, competence2));
//			certification1.setPrestataire(prestataire); // Associe la certification au prestataire
//			certification2.setPrestataire(prestataire);
//			prestataire.setCertifications(Arrays.asList(certification1, certification2));
//
			// **4. Enregistrer l’objet dans la base**
//			utilisateurRepository.save(prestataire);
//


//
//			Prestataire prestataire = prestataireRepo.findById(1)
//					.orElseThrow(() -> new RuntimeException("Prestataire avec ID 7 non trouvé"));
//
//			Category category=new Category();
//			category.setDescription("category pour les climatisation .....");
//			category.setName(TypeCategory.CLIMATISATION);
//			categoryRepo.save(category);
//
//
//			// Créer des services
//			Service service1 = new Service();
//			service1.setTitre("Installation Climatisation");
//			service1.setDescription("Installation complète de climatisation");
//			service1.setPrix(1223.12d);
//			service1.setStatus(true);
//			service1.setCategory(category);
//			service1.setPrestataire(prestataire); // Associer le service au prestataire
//
//			Service service2 = new Service();
//			service2.setTitre("Entretien Plomberie");
//			service2.setDescription("Entretien et maintenance de la plomberie");
//			service2.setPrix(500.0d);
//			service2.setStatus(false);
//			service2.setCategory(category);
//			service2.setPrestataire(prestataire);
//
//
//			prestataire.setServices(Arrays.asList(service1, service2));
//			prestataireRepo.save(prestataire);
//		};
//	}
}


