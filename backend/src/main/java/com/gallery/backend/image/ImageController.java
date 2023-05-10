package com.gallery.backend.image;

import com.gallery.backend.image.dto.ImageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Controller
@RequestMapping(value = "/api/v1/images")
@RequiredArgsConstructor
public class ImageController {
    private final ImageService service;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ImageResponse> createImage(
            @RequestParam("image") MultipartFile image,
            @RequestParam("albumId") UUID albumId
    ) {
        return new ResponseEntity<>(service.createImage(image, albumId), HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<Page<Image>> getImages(
            @RequestParam UUID albumId,
            @RequestParam(defaultValue = "0") Integer pageNumber,
            @RequestParam(defaultValue = "100") Integer pageSize
    ) {
        return new ResponseEntity<>(service.getImagesByAlbum(albumId, pageNumber, pageSize), HttpStatus.OK);
    }

    @GetMapping("/{imageId}")
    public ResponseEntity<ImageResponse> getImage(
            @PathVariable UUID imageId
    ) {
        return new ResponseEntity<>(service.getImage(imageId), HttpStatus.OK);
    }
}
