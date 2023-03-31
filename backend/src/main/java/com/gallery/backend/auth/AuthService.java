package com.gallery.backend.auth;

import com.gallery.backend.auth.dto.AuthResponse;
import com.gallery.backend.auth.dto.LoginRequest;
import com.gallery.backend.auth.dto.RegisterRequest;
import com.gallery.backend.auth.dto.ResetPasswordRequest;
import com.gallery.backend.confirmationToken.ConfirmationToken;
import com.gallery.backend.confirmationToken.ConfirmationTokenService;
import com.gallery.backend.email.EmailService;
import com.gallery.backend.user.User;
import com.gallery.backend.user.UserRepository;
import com.gallery.backend.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final ConfirmationTokenService confirmationTokenService;
    private final UserService userService;
    private final EmailService emailService;

    @Value(value = "${email.url-prefix.email-verification}")
    private String EMAIL_VERIFICATION_URL_PREFIX;
    @Value(value = "${email.url-prefix.forgot-password}")
    private String FORGOT_PASSWORD_URL_PREFIX;

    public void register(RegisterRequest request) {
        User user = new User(
                request.getFirstName(),
                request.getLastName(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword())
        );
        User savedUser = repository.save(user);

        sendVerificationEmail(savedUser);
    }

    public void sendVerificationEmail(User user) {
        ConfirmationToken confirmationToken = confirmationTokenService.generateConfirmationToken(user);

        String emailContent = String.format("""
                        Hi %s,

                        Please follow this link to activate your account:
                        %s%s

                        Best regards.""",
                user.getFirstName(), EMAIL_VERIFICATION_URL_PREFIX, confirmationToken.getToken());

        emailService.send(user.getEmail(), "Confirm your email", emailContent);
    }

    public void findUserAndSendForgotPasswordEmail(String email) {
        Optional<User> user = repository.findByEmail(email);

        if (user.isPresent()) {
            sendForgotPasswordEmail(user.get());
        }
    }

    public void sendForgotPasswordEmail(User user) {
        ConfirmationToken confirmationToken = confirmationTokenService.generateConfirmationToken(user);

        String emailContent = String.format("""
                        Hi %s,

                        Please follow this link to reset your password:
                        %s%s

                        Best regards.""",
                user.getFirstName(), FORGOT_PASSWORD_URL_PREFIX, confirmationToken.getToken());

        emailService.send(user.getEmail(), "Reset your password", emailContent);
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        String jwtToken = jwtUtils.generateToken(user);
        return new AuthResponse(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                jwtToken
        );
    }

    @Transactional
    public void verifyConfirmationToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService.findByToken(token)
                .orElseThrow(() -> new AccessDeniedException("Access Denied"));

        boolean isTokenConfirmed = confirmationToken.getConfirmedAt() != null;
        if (isTokenConfirmed) {
            throw new AccessDeniedException("Access Denied");
        }

        boolean isTokenExpired = confirmationToken.getExpiresAt().isBefore(LocalDateTime.now());
        if (isTokenExpired) {
            throw new AccessDeniedException("Access Denied");
        }

        confirmationTokenService.confirmToken(confirmationToken);
        userService.enableUser(confirmationToken.getUser().getEmail());
    }

    public void resetPassword(
            ResetPasswordRequest request
    ) {
        ConfirmationToken confirmationToken = confirmationTokenService.findByToken(request.getToken())
                .orElseThrow(() -> new AccessDeniedException("Access Denied"));

        boolean isTokenConfirmed = confirmationToken.getConfirmedAt() != null;
        if (isTokenConfirmed) {
            throw new AccessDeniedException("Access Denied");
        }

        boolean isTokenExpired = confirmationToken.getExpiresAt().isBefore(LocalDateTime.now());
        if (isTokenExpired) {
            throw new AccessDeniedException("Access Denied");
        }

        User user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AccessDeniedException("Access Denied"));
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        repository.save(user);

        confirmationTokenService.confirmToken(confirmationToken);
    }
}