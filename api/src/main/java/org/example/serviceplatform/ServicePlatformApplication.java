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
import org.springframework.scheduling.annotation.EnableScheduling;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Date;

@EnableScheduling
@SpringBootApplication
@EnableJpaRepositories(basePackages = "org.example.serviceplatform.Repositories")
public class ServicePlatformApplication {

	public static void main(String[] args) throws IOException {

		System.out.println("bonjour o----------------------");

		SpringApplication.run(ServicePlatformApplication.class, args);
	}

	@Bean
	public WebServerFactoryCustomizer<ConfigurableWebServerFactory> webServerFactoryCustomizer() {
		return factory -> factory.setPort(8090); // Remplacez par le port désiré
	}

//	@Bean
//	CommandLineRunner testImageUpload() {
//		return args -> {
//			try {
//				String imagePath = "C:\\Users\\Lenovo\\Pictures\\Screenshots\\capOy.png"; // Remplace par le chemin d'une image existante
//				File imageFile = new File(imagePath);
//
//				if (!imageFile.exists()) {
//					System.out.println("Erreur : L'image spécifiée n'existe pas.");
//					return;
//				}
//
//				// 📌 Définir le chemin où stocker l'image
//				String uploadDir = "src/main/resources/static/images/prestataires/";
//				Path uploadPath = Paths.get(uploadDir);
//
//				if (!Files.exists(uploadPath)) {
//					Files.createDirectories(uploadPath);
//				}
//
//				// 📌 Générer un nom de fichier
//				String fileName = "prestataire_test_" + System.currentTimeMillis() + ".jpg";
//				Path filePath = uploadPath.resolve(fileName);
//
//				// 📌 Copier l'image dans le dossier de stockage
//				Files.copy(new FileInputStream(imageFile), filePath);
//
//				System.out.println("✅ Image enregistrée avec succès à : " + filePath.toString());
//			} catch (IOException e) {
//				System.err.println("❌ Erreur lors de l'enregistrement de l'image : " + e.getMessage());
//			}
//		};
//
//	}
}


