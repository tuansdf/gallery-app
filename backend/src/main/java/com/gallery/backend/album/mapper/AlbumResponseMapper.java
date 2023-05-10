package com.gallery.backend.album.mapper;

import com.gallery.backend.album.Album;
import com.gallery.backend.album.dto.AlbumResponse;
import com.gallery.backend.image.Image;
import com.gallery.backend.image.ImageRepository;
import com.gallery.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AlbumResponseMapper {
    private final ImageRepository imageRepository;

    public AlbumResponse apply(Album album, User user) {
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
    }
}
