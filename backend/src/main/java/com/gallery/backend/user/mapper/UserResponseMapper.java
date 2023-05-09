package com.gallery.backend.user.mapper;

import com.gallery.backend.user.User;
import com.gallery.backend.user.dto.UserResponse;

import java.util.function.Function;

public class UserResponseMapper implements Function<User, UserResponse> {
    @Override
    public UserResponse apply(User user) {
        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName()
        );
    }
}
