package com.gallery.backend.image.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record ImageResponse(
        UUID id,
        String name,
        String imageUrl,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
