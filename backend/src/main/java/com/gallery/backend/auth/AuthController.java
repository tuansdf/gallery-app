package com.gallery.backend.auth;

import com.gallery.backend.auth.dto.AuthResponse;
import com.gallery.backend.auth.dto.LoginRequest;
import com.gallery.backend.auth.dto.RegisterRequest;
import com.gallery.backend.shared.ResponseObject;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService service;

    @PostMapping("/register")
    public ResponseEntity<ResponseObject<AuthResponse>> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseObject<>(
                                HttpStatus.CREATED.value(),
                                "Account registered. Please check your email to activate your account",
                                service.register(request)
                        )
                );
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseObject<AuthResponse>> login(
            @RequestBody LoginRequest request
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseObject<>(
                                HttpStatus.OK,
                                service.login(request)
                        )
                );
    }

    @GetMapping("/confirm")
    public ResponseEntity<ResponseObject<Object>> confirm(
            @RequestParam String token
    ) {
        service.verifyConfirmationToken(token);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .body(new ResponseObject<>(
                                HttpStatus.NO_CONTENT,
                                null
                        )
                );
    }
}
