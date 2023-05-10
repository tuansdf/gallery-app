package com.gallery.backend.album;

import com.gallery.backend.album.dto.AlbumResponse;
import com.gallery.backend.album.dto.CreateAlbumRequest;
import com.gallery.backend.album.mapper.AlbumResponseMapper;
import com.gallery.backend.exception.NotFoundException;
import com.gallery.backend.image.ImageRepository;
import com.gallery.backend.user.User;
import com.gallery.backend.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AlbumService {
    private final AlbumRepository albumRepository;
    private final ImageRepository imageRepository;
    private final UserService userService;
    private final AlbumResponseMapper albumResponseMapper;

    public AlbumResponse getAlbum(UUID albumId) {
        User user = userService.getUserFromSecurityContext();
        Album album = albumRepository.findOneByIdAndUser(albumId, user)
                .orElseThrow(() -> new NotFoundException("Album not found"));
        return albumResponseMapper.apply(album, user);
    }

    public List<AlbumResponse> getAllAlbums() {
        User user = userService.getUserFromSecurityContext();
        List<Album> albums = albumRepository.findByUserOrderByCreatedAtDesc(user);

        return albums.stream().map(album -> albumResponseMapper.apply(album, user)).collect(Collectors.toList());
    }

    public Album createAlbum(CreateAlbumRequest request) {
        User user = userService.getUserFromSecurityContext();
        Album album = new Album(request.name(), user);
        return albumRepository.save(album);
    }
}
