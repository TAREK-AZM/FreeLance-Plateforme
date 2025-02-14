package org.example.serviceplatform.Controllers;

import org.example.serviceplatform.Services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.core.io.Resource;

@RestController
@RequestMapping("api/images/")
public class ImageController {
@Autowired
private ImageService imageService;

    // Route pour récupérer l'image
    @GetMapping("/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) {
        // Appeler le service pour récupérer l'image
        return imageService.getImage(imageName);
    }




}
