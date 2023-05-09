package com.gallery.backend.album.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record AlbumResponse(
        UUID id,
        String name,
        String imageUrl,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
