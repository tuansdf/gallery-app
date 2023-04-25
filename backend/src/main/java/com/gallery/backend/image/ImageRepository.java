package com.gallery.backend.image;

import com.gallery.backend.album.Album;
import com.gallery.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ImageRepository extends JpaRepository<Image, UUID> {
    List<Image> findByUserAndAlbum(User user, Album album);
    Optional<Image> findOneByIdAndUser(UUID id, User user);
}
