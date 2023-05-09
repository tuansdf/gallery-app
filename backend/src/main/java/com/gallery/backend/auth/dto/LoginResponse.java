package com.gallery.backend.auth.dto;

import org.springframework.lang.NonNull;

public record LoginResponse(
        @NonNull
        String firstName,
        @NonNull
        String lastName,
        @NonNull
        String email,
        @NonNull
        String token
) {
}