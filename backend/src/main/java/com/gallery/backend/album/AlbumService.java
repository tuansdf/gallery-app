package com.gallery.backend.album;

import com.gallery.backend.album.dto.CreateAlbumRequest;
import com.gallery.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlbumService {
    private final AlbumRepository repository;

    public List<Album> getAllAlbums() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return repository.findByUser(user);
    }
    
    public Album createAlbum(CreateAlbumRequest request) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Album album = new Album(request.getName(), user);
        Album savedAlbum = repository.save(album);
        return savedAlbum;
    }
}
