package com.gallery.backend.user.mapper;

import com.gallery.backend.user.User;
import com.gallery.backend.user.dto.UserResponse;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
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
