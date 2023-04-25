package com.gallery.backend.image;

import com.gallery.backend.album.Album;
import com.gallery.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ImageRepository extends JpaRepository<Image, UUID> {
    List<Image> findByUserAndAlbumOrderByCreatedAtDesc(User user, Album album);
    Optional<Image> findOneByIdAndUser(UUID id, User user);

    Optional<Image> findFirstByAlbumIdAndUserOrderByCreatedAtDesc(UUID albumId, User user);
}
