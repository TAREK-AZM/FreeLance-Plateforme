package org.example.serviceplatform.Services;

import org.example.serviceplatform.DTO.ClientDTO;
import org.example.serviceplatform.Entities.Client;
import org.example.serviceplatform.Mappers.ClientMapper;
import org.example.serviceplatform.Repositories.ClientRepo;
import org.springframework.stereotype.Service;

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
    public void updateClient(ClientDTO clientDTO){
        Client  client=clientRepo.findById(clientDTO.getId()).orElseThrow(()->new RuntimeException("this client not found"));
        client.setNom(clientDTO.getNom());
        client.setPrenom(clientDTO.getPrenom());
        client.setEmail(clientDTO.getEmail());
        client.setTelephone(clientDTO.getTelephone());
        //si la region deja exist =>ok fait la modification de la region s'il exist ;sinon, creer une
        client.setAdresse(clientDTO.getAdresse());
        client.setVille(clientDTO.getVille());
        clientRepo.save(client);
    }
    //delete le client
    public void deleteClient(Integer id){
        Client client=clientRepo.findById(id).orElseThrow(()->new RuntimeException("this client not found"));
        clientRepo.deleteById(id);
    }


}
