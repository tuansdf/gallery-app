package com.gallery.backend.album;

import com.gallery.backend.user.User;
import jakarta.persistence.*;
import lombok.*;

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
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    @ManyToOne
    @JoinColumn(nullable = false)
    private User user;

    public Album(String name, User user) {
        this.name = name;
        this.user = user;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
}
