package org.example.serviceplatform.Controllers;

import org.example.serviceplatform.DTO.ClientDTO;
import org.example.serviceplatform.Repositories.ClientRepo;
import org.example.serviceplatform.Services.ClientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/client")
public class ClientController {
    private final ClientRepo clientRepo;
    private final ClientService clientService;

    public ClientController(ClientRepo clientRepo, ClientService clientService) {
        this.clientRepo = clientRepo;
        this.clientService = clientService;
    }

    ////////////// GESTION DE PROFIL///////////
    @GetMapping("/profil")
    public ClientDTO getProfil(){
        Integer idClient=2;
        return clientService.getClient(idClient);
    }
    @PutMapping("/profil/update")
    public ResponseEntity<String> updateProfil(@RequestBody ClientDTO clientDTO){
        clientService.updateClient(clientDTO);
        return ResponseEntity.ok("Client updated");
    }
    @DeleteMapping("/profil/{idClient}/delete")
    public ResponseEntity<String> deleteProfil(@PathVariable Integer idClient){
        clientService.deleteClient(idClient);
        return ResponseEntity.ok("Client deleted");
    }
}
