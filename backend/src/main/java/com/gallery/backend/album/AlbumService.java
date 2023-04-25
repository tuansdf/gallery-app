package com.gallery.backend.album;

import com.gallery.backend.album.dto.CreateAlbumRequest;
import com.gallery.backend.shared.exception.NotFoundException;
import com.gallery.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AlbumService {
    private final AlbumRepository repository;
    
    public Album getAlbum(UUID albumId) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return repository.findOneByIdAndUser(albumId, user)
                .orElseThrow(() -> new NotFoundException("Album " + albumId + " not found"));
    }

    public List<Album> getAllAlbums() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return repository.findByUserOrderByCreatedAtDesc(user);
    }

    public Album createAlbum(CreateAlbumRequest request) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Album album = new Album(request.name(), user);
        return repository.save(album);
    }
}
