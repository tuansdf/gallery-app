package com.gallery.backend.image;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gallery.backend.album.Album;
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
public class Image {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String imageUrl;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private User user;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private Album album;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Image(String name, String imageUrl, User user, Album album) {
        LocalDateTime now = LocalDateTime.now();
        this.name = name;
        this.imageUrl = imageUrl;
        this.user = user;
        this.album = album;
        this.createdAt = now;
        this.updatedAt = now;
    }
}
