package com.gallery.backend.auth.dto;

import com.gallery.backend.user.dto.UserResponse;

public record LoginResponse(
        UserResponse user,
        String refreshToken,
        String accessToken
) {
}