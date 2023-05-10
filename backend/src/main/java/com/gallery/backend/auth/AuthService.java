package com.gallery.backend.auth;

import com.gallery.backend.auth.dto.*;
import com.gallery.backend.email.ForgotPasswordEmailSender;
import com.gallery.backend.email.VerifyEmailSender;
import com.gallery.backend.exception.UnauthorizedException;
import com.gallery.backend.token.Token;
import com.gallery.backend.token.TokenRepository;
import com.gallery.backend.token.TokenService;
import com.gallery.backend.user.User;
import com.gallery.backend.user.UserRepository;
import com.gallery.backend.user.UserService;
import com.gallery.backend.user.dto.UserResponse;
import com.gallery.backend.user.mapper.UserResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final VerifyEmailSender verifyEmailSender;
    private final ForgotPasswordEmailSender forgotPasswordEmailSender;
    private final UserResponseMapper userResponseMapper;
    private final TokenService tokenService;
    private final TokenRepository tokenRepository;

    public RegisterResponse register(RegisterRequest request) {
        RegisterResponse registerResponse = new RegisterResponse(
                "A link to activate your account has been emailed to the address provided"
        );

        Optional<User> userAlreadyExist = userRepository.findByEmail(request.email());
        if (userAlreadyExist.isPresent()) {
            return registerResponse;
        }

        User user = User.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .enabled(false)
                .build();
        User savedUser = userRepository.save(user);

        Token token = tokenService.createEmailVerificationToken(savedUser);
        String emailContent = verifyEmailSender.buildContent(
                savedUser.getFirstName(), token.getValue()
        );
        verifyEmailSender.send(savedUser.getEmail(), emailContent);

        return registerResponse;
    }

    public LoginResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        User user = (User) authentication.getPrincipal();

        String refreshTokenValue = tokenService.generateJwtRefreshTokenValue(user.getEmail());
        String accessTokenValue = tokenService.generateJwtAccessTokenValue(user.getEmail());

        tokenService.createRefreshToken(refreshTokenValue, user);

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
            throw new UnauthorizedException("Invalid credentials");
        }

        user.setPassword(passwordEncoder.encode(request.newPassword()));
        userRepository.save(user);

        return new ChangePasswordResponse("Password changed");
    }

    public ForgotPasswordResponse findUserAndSendForgotPasswordEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Token token = tokenService.createEmailVerificationToken(user);
            String emailContent = forgotPasswordEmailSender.buildContent(
                    user.getFirstName(), token.getValue()
            );
            forgotPasswordEmailSender.send(user.getEmail(), emailContent);
        }

        return new ForgotPasswordResponse(
                "If that email address is in our database, we will send you an email to reset your password"
        );
    }

    public VerifyEmailResponse verifyEmail(VerifyEmailRequest request) {
        Token token = tokenService.findValidTokenByValue(request.token());

        tokenService.revokeToken(token);
        userService.enableUser(token.getUser());

        return new VerifyEmailResponse("Email verified");
    }

    public ResetPasswordResponse resetPassword(ResetPasswordRequest request) {
        Token token = tokenService.findValidTokenByValue(request.token());

        User user = token.getUser();
        user.setPassword(passwordEncoder.encode(request.password()));
        userRepository.save(user);

        tokenService.revokeToken(token);

        return new ResetPasswordResponse("Password reset");
    }

    public RefreshTokenResponse refreshToken(RefreshTokenRequest request) {
        Token refreshToken = tokenService.findValidTokenByValue(request.refreshToken());
        User user = refreshToken.getUser();

        String refreshTokenValue = tokenService.generateJwtRefreshTokenValue(user.getEmail());
        String accessTokenValue = tokenService.generateJwtAccessTokenValue(user.getEmail());

        tokenService.createRefreshToken(refreshTokenValue, user);

        return new RefreshTokenResponse(
                refreshTokenValue,
                accessTokenValue
        );
    }

    public UserResponse getCurrentUser() {
        User user = userService.getUserFromSecurityContext();
        return userResponseMapper.apply(user);
    }

    public LogoutResponse logout() {
        User user = userService.getUserFromSecurityContext();
        List<Token> tokens = tokenRepository.findAllByUser(user);
        tokens.forEach(tokenService::revokeToken);
        return new LogoutResponse("Logged out");
    }
}