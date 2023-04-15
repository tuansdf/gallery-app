package com.gallery.backend.auth.dto;

import org.springframework.lang.NonNull;

public record ChangePasswordRequest(
        @NonNull
        String email,
        @NonNull
        String oldPassword,
        @NonNull
        String newPassword
) {
}
