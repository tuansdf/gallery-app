package com.gallery.backend.auth.dto;

import org.springframework.lang.NonNull;

public record ResetPasswordRequest(
        @NonNull
        String password,
        @NonNull
        String token
) {
}
