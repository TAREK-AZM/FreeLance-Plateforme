package org.example.serviceplatform.Services;


import org.example.serviceplatform.DTO.FavorisDTO;
import org.example.serviceplatform.Entities.Client;
import org.example.serviceplatform.Entities.Favoris;
import org.example.serviceplatform.Entities.Service;
import org.example.serviceplatform.Mappers.FavorisMapper;
import org.example.serviceplatform.Repositories.ClientRepo;
import org.example.serviceplatform.Repositories.FavorisRepo;
import org.example.serviceplatform.Repositories.ServiceRepo;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@org.springframework.stereotype.Service
public class FavorisService {
    @Autowired
    private FavorisRepo favorisRepo;
    @Autowired
    private ClientRepo clientRepo;
    @Autowired
    private ServiceRepo serviceRepo;

    //store une favoris
    public void createFavoris(Integer clientId, Map<String,Integer> favoris) {
        Service service = serviceRepo.findById(favoris.get("serviceID")).orElseThrow(()->new RuntimeException("Service not found"));
        Client client= clientRepo.findById(clientId).get();

        Favoris fav=new Favoris();
        fav.setClient(client);
        fav.setService(service);
        fav.setDateAjout(LocalDateTime.now());
        favorisRepo.save(fav);

    }
    //get All Favoris of a client
    public List<FavorisDTO> getAllFavoris(Integer idCLient) {
        Client client=clientRepo.findById(idCLient).orElseThrow(()->new RuntimeException("Client not found"));
        return  client.getFavoris().stream().map(FavorisMapper::toFavorisDTO).collect(Collectors.toList());
    }

    //supprimer de la liste des favoris
    public void deleteFavoris(Integer idFavoris) {
        Favoris fav=favorisRepo.findById(idFavoris).orElseThrow(()->new RuntimeException("Favoris not found"));
        favorisRepo.delete(fav);
    }
}
