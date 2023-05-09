package com.gallery.backend.album.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateAlbumRequest(
        @NotBlank
        @Size(max = 128)
        String name
) {
}
