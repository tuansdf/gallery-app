package com.gallery.backend.album;

import com.gallery.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AlbumRepository extends JpaRepository<Album, UUID> {
    List<Album> findByUser(User user);
}
