package com.gallery.backend.auth;

import com.gallery.backend.auth.dto.*;
import com.gallery.backend.confirmationToken.ConfirmationToken;
import com.gallery.backend.confirmationToken.ConfirmationTokenService;
import com.gallery.backend.email.ForgotPasswordEmailSender;
import com.gallery.backend.email.VerifyEmailSender;
import com.gallery.backend.exception.UnauthorizedException;
import com.gallery.backend.token.TokenService;
import com.gallery.backend.user.User;
import com.gallery.backend.user.UserRepository;
import com.gallery.backend.user.UserService;
import com.gallery.backend.user.mapper.UserResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final ConfirmationTokenService confirmationTokenService;
    private final UserService userService;
    private final VerifyEmailSender verifyEmailSender;
    private final ForgotPasswordEmailSender forgotPasswordEmailSender;
    private final UserResponseMapper userResponseMapper;
    private final TokenService tokenService;

    public RegisterResponse register(RegisterRequest request) {
        Optional<User> userAlreadyExist = userRepository.findByEmail(request.email());
        if (userAlreadyExist.isPresent()) {
            return new RegisterResponse("A link to activate your account has been emailed to the address provided.");
        }

        User user = User.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .enabled(false)
                .build();

        User savedUser = userRepository.save(user);

        sendVerificationEmail(savedUser);

        return new RegisterResponse("A link to activate your account has been emailed to the address provided.");
    }

    public LoginResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        User user = (User) authentication.getPrincipal();

        String refreshTokenValue = tokenService.generateJwtRefreshTokenValue(user.getEmail());
        String accessTokenValue = tokenService.generateJwtRefreshTokenValue(user.getEmail());

        return new LoginResponse(
                userResponseMapper.apply(user),
                refreshTokenValue,
                accessTokenValue
        );
    }

    public ChangePasswordResponse changePassword(ChangePasswordRequest request) {
        User user = userService.getUserFromSecurityContext();

        boolean isPasswordCorrect = passwordEncoder.matches(request.oldPassword(), user.getPassword());
        if (!isPasswordCorrect) {
            throw new UnauthorizedException("");
        }

        user.setPassword(passwordEncoder.encode(request.newPassword()));
        userRepository.save(user);

        return new ChangePasswordResponse("Password changed.");
    }

    private void sendVerificationEmail(User user) {
        ConfirmationToken confirmationToken = confirmationTokenService.generateConfirmationToken(user);

        String emailContent = verifyEmailSender.buildContent(
                user.getFirstName(), confirmationToken.getToken()
        );

        verifyEmailSender.send(user.getEmail(), emailContent);
    }

    public ForgotPasswordResponse findUserAndSendForgotPasswordEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {
            sendForgotPasswordEmail(user.get());
        }

        return new ForgotPasswordResponse(
                "If that email address is in our database, we will send you an email to reset your password."
        );
    }

    private void sendForgotPasswordEmail(User user) {
        ConfirmationToken confirmationToken = confirmationTokenService.generateConfirmationToken(user);

        String emailContent = forgotPasswordEmailSender.buildContent(
                user.getFirstName(), confirmationToken.getToken()
        );

        forgotPasswordEmailSender.send(user.getEmail(), emailContent);
    }

    @Transactional
    public VerifyEmailResponse verifyEmail(VerifyEmailRequest request) {
        ConfirmationToken confirmationToken = confirmationTokenService.findByToken(request.token())
                .orElseThrow(() -> new UnauthorizedException("Invalid credentials"));

        boolean isTokenConfirmed = confirmationToken.getConfirmedAt() != null;
        if (isTokenConfirmed) {
            throw new UnauthorizedException("Invalid credentials");
        }

        boolean isTokenExpired = confirmationToken.getExpiresAt().isBefore(LocalDateTime.now());
        if (isTokenExpired) {
            throw new UnauthorizedException("Invalid credentials");
        }

        confirmationTokenService.confirmToken(confirmationToken);
        userService.enableUser(confirmationToken.getUser().getEmail());

        return new VerifyEmailResponse("Email verified.");
    }

    public ResetPasswordResponse resetPassword(ResetPasswordRequest request) {
        ConfirmationToken confirmationToken = confirmationTokenService.findByToken(request.token())
                .orElseThrow(() -> new UnauthorizedException("Invalid credentials"));

        boolean isTokenConfirmed = confirmationToken.getConfirmedAt() != null;
        boolean isTokenExpired = confirmationToken.getExpiresAt().isBefore(LocalDateTime.now());
        if (isTokenConfirmed || isTokenExpired) {
            throw new UnauthorizedException("Invalid credentials");
        }

        User user = userRepository.findByEmail(confirmationToken.getUser().getEmail())
                .orElseThrow(() -> new UnauthorizedException("Invalid credentials"));
        user.setPassword(passwordEncoder.encode(request.password()));
        userRepository.save(user);

        confirmationTokenService.confirmToken(confirmationToken);

        return new ResetPasswordResponse("Password reset.");
    }
}