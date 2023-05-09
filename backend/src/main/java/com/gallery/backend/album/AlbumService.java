package com.gallery.backend.album;

import com.gallery.backend.album.dto.AlbumResponse;
import com.gallery.backend.album.dto.CreateAlbumRequest;
import com.gallery.backend.exception.NotFoundException;
import com.gallery.backend.image.Image;
import com.gallery.backend.image.ImageRepository;
import com.gallery.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AlbumService {
    private final AlbumRepository repository;
    private final ImageRepository imageRepository;

    public Album getAlbum(UUID albumId) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return repository.findOneByIdAndUser(albumId, user)
                .orElseThrow(() -> new NotFoundException("Album " + albumId + " not found"));
    }

    public List<AlbumResponse> getAllAlbums() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Album> albums = repository.findByUserOrderByCreatedAtDesc(user);
        return albums.stream().map(album -> {
            String imageUrl = "";
            Optional<Image> optionalImages = imageRepository.findFirstByAlbumIdAndUserOrderByCreatedAtDesc(album.getId(), user);
            if (optionalImages.isPresent()) {
                Image image = optionalImages.get();
                imageUrl = image.getImageUrl();
            }

            return new AlbumResponse(
                    album.getId(),
                    album.getName(),
                    imageUrl,
                    album.getCreatedAt(),
                    album.getUpdatedAt()
            );
        }).collect(Collectors.toList());
    }

    public Album createAlbum(CreateAlbumRequest request) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Album album = new Album(request.name(), user);
        return repository.save(album);
    }
}
