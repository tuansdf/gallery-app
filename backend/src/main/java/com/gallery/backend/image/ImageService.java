package com.gallery.backend.image;

import com.gallery.backend.album.Album;
import com.gallery.backend.album.AlbumRepository;
import com.gallery.backend.album.AlbumService;
import com.gallery.backend.exception.NotFoundException;
import com.gallery.backend.image.dto.ImageResponse;
import com.gallery.backend.image.mapper.ImageResponseMapper;
import com.gallery.backend.user.User;
import com.gallery.backend.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageService {
    private final ImageRepository imageRepository;
    private final AlbumRepository albumRepository;
    private final AlbumService albumService;
    private final UserService userService;
    private final S3Client s3Client;
    private final ImageResponseMapper imageResponseMapper;

    @Value("${aws.bucket.name}")
    private String bucketName;
    @Value("${aws.bucket.url-prefix}")
    private String bucketUrlPrefix;

    public ImageResponse createImage(MultipartFile imageFile, UUID albumId) {
        String originalFileName = imageFile.getOriginalFilename();
        String fileExtension = "jpg";
        if (originalFileName != null) {
            int i = originalFileName.lastIndexOf(".");
            if (i > 0) {
                fileExtension = originalFileName.substring(i + 1);
            }
        }
        String fileName = UUID.randomUUID() + "." + fileExtension;
        String imageUrl = bucketUrlPrefix + fileName;

        File file = convertMultiPartToFile(imageFile);
        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .acl(ObjectCannedACL.PUBLIC_READ)
                .build();
        s3Client.putObject(objectRequest, RequestBody.fromFile(file));
        file.delete();

        User user = userService.getUserFromSecurityContext();
        Album album = albumRepository.findById(albumId)
                .orElseThrow(() -> new NotFoundException("Album not found"));
        Image image = new Image(originalFileName, imageUrl, user, album);
        Image savedImage = imageRepository.save(image);

        return imageResponseMapper.apply(savedImage);
    }

    public Page<Image> getImagesByAlbum(UUID albumId, Integer pageNumber, Integer pageSize) {
        User user = userService.getUserFromSecurityContext();
        Album album = albumRepository.findById(albumId)
                .orElseThrow(() -> new NotFoundException("Album not found"));
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        Page<Image> imagesPageResult = imageRepository.findByUserAndAlbumOrderByCreatedAtDesc(pageable, user, album);
        return imagesPageResult;
    }

    public ImageResponse getImage(UUID imageId) {
        User user = userService.getUserFromSecurityContext();
        Image image = imageRepository.findOneByIdAndUser(imageId, user)
                .orElseThrow(() -> new NotFoundException(String.format("Image %s not found", imageId)));
        return imageResponseMapper.apply(image);
    }

    private File convertMultiPartToFile(MultipartFile file) {
        File convertedFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
        return convertedFile;
    }
}
