package com.gallery.backend.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginRequest(
        @NotBlank
        @Email
        @Size(max = 64)
        String email,
        @NotBlank
        @Size(min = 8, max = 64)
        String password
) {
}
