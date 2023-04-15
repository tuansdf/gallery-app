package com.gallery.backend.auth.dto;

import org.springframework.lang.NonNull;

public record LoginRequest(
        @NonNull
        String email,
        @NonNull
        String password
) {
}
