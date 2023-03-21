package com.gallery.backend.auth;

import com.gallery.backend.auth.dto.AuthResponse;
import com.gallery.backend.auth.dto.LoginRequest;
import com.gallery.backend.auth.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService service;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody LoginRequest request
    ) {
        return ResponseEntity.ok(service.login(request));
    }

    @GetMapping("/confirm")
    public ResponseEntity<AuthResponse> confirm(
            @RequestParam String token
    ) {
        return ResponseEntity.ok(service.verifyConfirmationToken(token));
    }
}
