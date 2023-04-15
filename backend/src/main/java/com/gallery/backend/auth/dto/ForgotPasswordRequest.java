package com.gallery.backend.auth.dto;

import org.springframework.lang.NonNull;

public record ForgotPasswordRequest(
        @NonNull
        String email
) {
}
