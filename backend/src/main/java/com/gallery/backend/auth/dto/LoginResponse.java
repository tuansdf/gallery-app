package com.gallery.backend.auth.dto;

import com.gallery.backend.user.dto.UserResponse;

public record LoginResponse(
        UserResponse userResponse,
        String refreshToken,
        String accessToken
) {
}