package com.gallery.backend.album;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/v1/albums")
@RequiredArgsConstructor
public class AlbumController {
    @GetMapping("/")
    public ResponseEntity<String> getAlbums() {
        return ResponseEntity.ok("All albums");
    }
}
