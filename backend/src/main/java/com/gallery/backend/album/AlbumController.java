package com.gallery.backend.album;

import com.gallery.backend.album.dto.CreateAlbumRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/albums")
@RequiredArgsConstructor
public class AlbumController {
    private final AlbumService service;

    @GetMapping("/")
    public ResponseEntity<List<Album>> getAlbums() {
        return new ResponseEntity<>(service.getAllAlbums(), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Album> createAlbum(
            @RequestBody CreateAlbumRequest request
    ) {
        return new ResponseEntity<>(service.createAlbum(request), HttpStatus.CREATED);
    }
}
