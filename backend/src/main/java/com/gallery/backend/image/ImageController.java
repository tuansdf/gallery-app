package com.gallery.backend.image;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping(value = "/api/v1/images")
@RequiredArgsConstructor
public class ImageController {
    private final ImageService service;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Image> createImage(
            @RequestParam("image") MultipartFile image,
            @RequestParam("albumId") UUID albumId
    ) {
        return new ResponseEntity<>(service.createImage(image, albumId), HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<List<Image>> getImages(
            @RequestParam("albumId") UUID albumId
    ) {
        return new ResponseEntity<>(service.getImagesByAlbum(albumId), HttpStatus.OK);
    }

    @GetMapping("/{imageId}")
    public ResponseEntity<Image> getImage(
            @PathVariable UUID imageId
    ) {
        return new ResponseEntity<>(service.getImage(imageId), HttpStatus.OK);
    }
}
