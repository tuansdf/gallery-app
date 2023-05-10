package com.gallery.backend.token;

import com.gallery.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TokenRepository extends JpaRepository<Token, UUID> {
    Optional<Token> findByValue(String value);

    List<Token> findAllByUser(User user);
}
