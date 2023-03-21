package com.gallery.backend.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;

    public void enableUser(String email) {
        User user = repository.findByEmail(email)
                .orElseThrow();
        user.setEnabled(true);
        repository.save(user);
    }
}
