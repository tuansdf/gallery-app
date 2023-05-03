package com.gallery.backend.image;

import com.gallery.backend.album.Album;
import com.gallery.backend.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ImageRepository extends JpaRepository<Image, UUID> {
    Page<Image> findByUserAndAlbumOrderByCreatedAtDesc(Pageable pageable, User user, Album album);

    Optional<Image> findOneByIdAndUser(UUID id, User user);

    Optional<Image> findFirstByAlbumIdAndUserOrderByCreatedAtDesc(UUID albumId, User user);
}
