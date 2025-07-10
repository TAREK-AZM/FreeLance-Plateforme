package org.example.serviceplatform.Services;

import org.example.serviceplatform.DTO.ClientDTO;
import org.example.serviceplatform.Entities.Client;
import org.example.serviceplatform.Mappers.ClientMapper;
import org.example.serviceplatform.Repositories.ClientRepo;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class ClientService {

    private final ClientRepo clientRepo;


    public ClientService(ClientRepo clientRepo) {
        this.clientRepo = clientRepo;

    }

    //GET CLIENT
    public ClientDTO getClient(Integer id){
        return ClientMapper.toClientDTO(clientRepo.findById(id).orElseThrow(()->new RuntimeException("this client not found"))) ;
    }
    //update client
    public void updateClient(Integer idClient, ClientDTO clientDTO, MultipartFile imageFile){
        Client  client=clientRepo.findById(idClient).orElseThrow(()->new RuntimeException("this client not found"));
        client.setNom(clientDTO.getNom());
        client.setPrenom(clientDTO.getPrenom());
        client.setEmail(clientDTO.getEmail());
        client.setTelephone(clientDTO.getTelephone());
        //si la region deja exist =>ok fait la modification de la region s'il exist ;sinon, creer une
        client.setAdresse(clientDTO.getAdresse());
        client.setVille(clientDTO.getVille());
        // 📂 Gérer l'upload d'image
        if (imageFile != null && !imageFile.isEmpty()) {
            String UPLOAD_DIR = "src/main/resources/images/clients/";

            try {
                // 📁 Vérifier si le dossier existe, sinon le créer
                Path uploadPath = Paths.get(UPLOAD_DIR);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                // 🏷️ Définir un nom de fichier unique
                String fileName = "client_" + idClient + "_" + System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
                Path filePath = uploadPath.resolve(fileName);

                // 📥 Écrire le fichier sur le disque
                Files.write(filePath, imageFile.getBytes());

                // 🔗 Mettre à jour l'URL de l'image
                client.setImageUrl("/api/clients/images/" + fileName);
            } catch (IOException e) {
                throw new RuntimeException("Erreur lors de l'enregistrement de l'image : " + e.getMessage());
            }
        }

        clientRepo.save(client);
    }
    //delete le client
    public void deleteClient(Integer id){
        Client client=clientRepo.findById(id).orElseThrow(()->new RuntimeException("this client not found"));
        clientRepo.deleteById(id);
    }


}
