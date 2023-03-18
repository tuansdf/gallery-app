package com.gallery.backend.user;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
public class UserController {
    @GetMapping("/")
    public User hello() {
        User user = new User(UUID.randomUUID(), "name", "email", "hello");
        return user;
    }
}
