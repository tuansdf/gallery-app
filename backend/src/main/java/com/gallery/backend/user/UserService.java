package com.gallery.backend.user;

import com.gallery.backend.exception.NotFoundException;
import com.gallery.backend.exception.UnauthorizedException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public void enableUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found"));
        user.setEnabled(true);
        userRepository.save(user);
    }

    public User getUserFromSecurityContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        String email = jwt.getSubject();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UnauthorizedException("Invalid credentials"));
    }
}
