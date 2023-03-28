package com.gallery.backend.confirmationToken;

import com.gallery.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ConfirmationTokenService {
    private final ConfirmationTokenRepository repository;

    public void saveToken(ConfirmationToken confirmationToken) {
        repository.save(confirmationToken);
    }

    public Optional<ConfirmationToken> findByToken(String token) {
        return repository.findByToken(token);
    }

    public ConfirmationToken generateConfirmationToken(User user) {
        final int TOKEN_EXPIRE_DURATION_IN_MIN = 15;
        String token = generateToken();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(TOKEN_EXPIRE_DURATION_IN_MIN),
                user
        );
        saveToken(confirmationToken);
        return confirmationToken;
    }

    private String generateToken() {
        final int TOKEN_LENGTH = 64;
        byte[] bytes = new byte[TOKEN_LENGTH];
        SecureRandom random = new SecureRandom();
        random.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    public void confirmToken(ConfirmationToken token) {
        token.setConfirmedAt(LocalDateTime.now());
        repository.save(token);
    }
}
