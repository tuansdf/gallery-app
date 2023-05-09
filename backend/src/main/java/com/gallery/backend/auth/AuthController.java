package com.gallery.backend.auth;

import com.gallery.backend.auth.dto.*;
import jakarta.validation.Valid;
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
    public ResponseEntity<RegisterResponse> register(
            @RequestBody @Valid RegisterRequest request
    ) {
        return new ResponseEntity<>(service.register(request), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody @Valid LoginRequest request
    ) {
        return new ResponseEntity<>(service.login(request), HttpStatus.OK);
    }

    @PatchMapping("/password")
    public ResponseEntity<ChangePasswordResponse> changePassword(
            @RequestBody @Valid ChangePasswordRequest request
    ) {
        return new ResponseEntity<>(service.changePassword(request), HttpStatus.OK);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ForgotPasswordResponse> forgotPassword(
            @RequestBody @Valid ForgotPasswordRequest request
    ) {
        return new ResponseEntity<>(service.findUserAndSendForgotPasswordEmail(request.email()), HttpStatus.OK);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ResetPasswordResponse> resetPassword(
            @RequestBody @Valid ResetPasswordRequest request
    ) {
        return new ResponseEntity<>(service.resetPassword(request), HttpStatus.OK);
    }

    @GetMapping("/verify-email")
    public ResponseEntity<VerifyEmailResponse> verifyEmail(
            @RequestParam String token
    ) {
        return new ResponseEntity<>(service.verifyEmail(token), HttpStatus.NO_CONTENT);
    }
}
