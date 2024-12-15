package org.example.serviceplatform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ServicePlatformApplication {

	private final UserRepository userRepository;

	public ServicePlatformApplication(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(ServicePlatformApplication.class, args);
	}
	public AppUser createUser() {
		AppUser user = new AppUser(1,"tarek","tarek@gmail.com");
		return userRepository.save(user);
	}
}
