package com.gallery.backend.album;

import com.gallery.backend.album.dto.AlbumResponse;
import com.gallery.backend.album.dto.CreateAlbumRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/v1/albums")
@RequiredArgsConstructor
public class AlbumController {
    private final AlbumService service;

    @GetMapping()
    public ResponseEntity<List<AlbumResponse>> getAlbums() {
        return new ResponseEntity<>(service.getAllAlbums(), HttpStatus.OK);
    }

    @GetMapping("/{albumId}")
    public ResponseEntity<AlbumResponse> getAlbum(
            @PathVariable("albumId") UUID albumId
    ) {
        return new ResponseEntity<>(service.getAlbum(albumId), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Album> createAlbum(
            @RequestBody @Valid CreateAlbumRequest request
    ) {
        return new ResponseEntity<>(service.createAlbum(request), HttpStatus.CREATED);
    }
}
