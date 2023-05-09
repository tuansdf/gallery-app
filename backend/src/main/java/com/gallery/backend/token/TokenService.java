package com.gallery.backend.token;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class TokenService {

    private final JwtEncoder jwtEncoder;

    @Value("${application.security.jwt.access-lifetime}")
    private int ACCESS_TOKEN_LIFETIME_MINUTES;
    @Value("${application.security.jwt.refresh-lifetime}")
    private int REFRESH_TOKEN_LIFETIME_MINUTES;

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
}
