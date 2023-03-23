package com.gallery.backend.auth;

import com.gallery.backend.auth.dto.AuthResponse;
import com.gallery.backend.auth.dto.LoginRequest;
import com.gallery.backend.auth.dto.RegisterRequest;
import com.gallery.backend.confirmationToken.ConfirmationToken;
import com.gallery.backend.confirmationToken.ConfirmationTokenService;
import com.gallery.backend.email.EmailService;
import com.gallery.backend.shared.exception.NotFoundException;
import com.gallery.backend.shared.exception.UnauthorizedException;
import com.gallery.backend.user.User;
import com.gallery.backend.user.UserRepository;
import com.gallery.backend.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

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

    @Value(value = "${email.base-url.confirmation}")
    private String CONFIRMATION_BASE_URL;

    public AuthResponse register(RegisterRequest request) {
        User user = new User(
                request.getFirstName(),
                request.getLastName(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword())
        );
        repository.save(user);

        ConfirmationToken confirmationToken = confirmationTokenService.generateConfirmationToken(user);

        emailService.send(user.getEmail(), "Confirm your email",
                String.format("""
                                Hi %s,

                                Please follow this link to activate your account:
                                %s%s

                                Best regards.""",
                        user.getFirstName(), CONFIRMATION_BASE_URL, confirmationToken.getToken()
                ));

        return new AuthResponse(confirmationToken.getToken());
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
        return new AuthResponse(jwtToken);
    }

    @Transactional
    public void verifyConfirmationToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService.findByToken(token)
                .orElseThrow(() -> new UnauthorizedException());

        boolean isTokenConfirmed = confirmationToken.getConfirmedAt() != null;
        if (isTokenConfirmed) {
            throw new UnauthorizedException();
        }

        boolean isTokenExpired = confirmationToken.getExpiresAt().isBefore(LocalDateTime.now());
        if (isTokenExpired) {
            throw new UnauthorizedException();
        }

        confirmationTokenService.confirmToken(confirmationToken);
        userService.enableUser(confirmationToken.getUser().getEmail());

        new AuthResponse("confirmed");
    }
}
