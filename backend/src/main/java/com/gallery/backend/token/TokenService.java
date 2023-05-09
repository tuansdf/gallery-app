package com.gallery.backend.token;

import com.gallery.backend.exception.UnauthorizedException;
import com.gallery.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final JwtEncoder jwtEncoder;
    private final TokenRepository tokenRepository;

    @Value("${application.security.jwt.access-lifetime}")
    private int ACCESS_TOKEN_LIFETIME_MINUTES;
    @Value("${application.security.jwt.refresh-lifetime}")
    private int REFRESH_TOKEN_LIFETIME_MINUTES;
    @Value("${application.security.email.verification-lifetime}")
    private int EMAIL_VERIFICATION_TOKEN_LIFETIME_MINUTES;

    public String generateJwtTokenValue(String subject, int minutesToExpires) {
        Instant now = Instant.now();
        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plus(minutesToExpires, ChronoUnit.MINUTES))
                .subject(subject)
                .build();
        JwtEncoderParameters encoderParam = JwtEncoderParameters.from(JwsHeader.with(MacAlgorithm.HS256).build(), claimsSet);
        return jwtEncoder.encode(encoderParam).getTokenValue();
    }

    public String generateJwtAccessTokenValue(String subject) {
        return generateJwtTokenValue(subject, ACCESS_TOKEN_LIFETIME_MINUTES);
    }

    public String generateJwtRefreshTokenValue(String subject) {
        return generateJwtTokenValue(subject, REFRESH_TOKEN_LIFETIME_MINUTES);
    }

    public Token createEmailVerificationToken(User user) {
        String tokenValue = generateRandomToken();
        LocalDateTime now = LocalDateTime.now();
        Token token = Token.builder()
                .value(tokenValue)
                .createdAt(now)
                .expiresAt(now.plusMinutes(EMAIL_VERIFICATION_TOKEN_LIFETIME_MINUTES))
                .revoked(false)
                .user(user)
                .build();
        return tokenRepository.save(token);
    }

    public Token createRefreshToken(String tokenValue, User user) {
        LocalDateTime now = LocalDateTime.now();
        Token token = Token.builder()
                .value(tokenValue)
                .createdAt(now)
                .expiresAt(now.plusMinutes(REFRESH_TOKEN_LIFETIME_MINUTES))
                .revoked(false)
                .user(user)
                .build();
        return tokenRepository.save(token);
    }

    private String generateRandomToken() {
        final int TOKEN_LENGTH = 64;
        byte[] bytes = new byte[TOKEN_LENGTH];
        SecureRandom random = new SecureRandom();
        random.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    public Token findValidTokenByValue(String tokenValue) {
        Token token = tokenRepository.findByValue(tokenValue)
                .orElseThrow(() -> new UnauthorizedException("Invalid credentials"));

        boolean isTokenRevoked = token.isRevoked();
        boolean isTokenExpired = token.getExpiresAt().isBefore(LocalDateTime.now());
        if (isTokenRevoked || isTokenExpired) {
            throw new UnauthorizedException("Invalid credentials");
        }

        return token;
    }

    public Token revokeToken(Token token) {
        token.setRevoked(true);
        return tokenRepository.save(token);
    }
}
