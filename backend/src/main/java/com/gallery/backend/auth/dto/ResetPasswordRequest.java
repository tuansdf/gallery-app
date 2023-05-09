package com.gallery.backend.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ResetPasswordRequest(
        @NotBlank
        @Size(min = 8, max = 64)
        String password,
        @NotBlank
        String token
) {
}
