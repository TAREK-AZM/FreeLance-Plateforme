package org.example.serviceplatform.Services;

import org.example.serviceplatform.DPO.ServiceDTO;
import org.example.serviceplatform.Entities.Prestataire;
import org.example.serviceplatform.Mappers.ServiceMapper;
import org.example.serviceplatform.Repositories.PrestataireRepo;
import org.example.serviceplatform.Repositories.ServiceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceService {
    @Autowired
    private ServiceRepo serviceRepo;
    @Autowired
    private PrestataireRepo prestataireRepo;

    //////////// GETserice///////////
    public List<ServiceDTO> getServices(Integer id) {
        Prestataire prest=prestataireRepo.findById(id).orElse(null);
        return prest.getServices().stream().map(serv->ServiceMapper.toServiceDTO(serv)).collect(Collectors.toList());

    }
}
