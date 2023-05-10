package com.gallery.backend.album;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gallery.backend.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Album {
    @Id
    @GeneratedValue
    private UUID id;
    @Column(nullable = false)
    private String name;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private User user;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Album(String name, User user) {
        LocalDateTime now = LocalDateTime.now();
        this.name = name;
        this.user = user;
        this.createdAt = now;
        this.updatedAt = now;
    }
}
