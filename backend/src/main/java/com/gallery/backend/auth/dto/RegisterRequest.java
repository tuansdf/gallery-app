package com.gallery.backend.auth.dto;

import org.springframework.lang.NonNull;

public record RegisterRequest(
        @NonNull
        String firstName,
        @NonNull
        String lastName,
        @NonNull
        String email,
        @NonNull
        String password
) {
}
