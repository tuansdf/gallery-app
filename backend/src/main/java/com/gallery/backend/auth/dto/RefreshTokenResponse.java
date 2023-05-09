package com.gallery.backend.auth.dto;

public record RefreshTokenResponse(
        String refreshToken,
        String accessToken
) {
}
