package com.gallery.backend.album.dto;

import org.springframework.lang.NonNull;

public record CreateAlbumRequest(
        @NonNull
        String name
) {
}
