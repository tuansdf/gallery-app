package com.gallery.backend.image.mapper;

import com.gallery.backend.image.Image;
import com.gallery.backend.image.dto.ImageResponse;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class ImageResponseMapper implements Function<Image, ImageResponse> {
    @Override
    public ImageResponse apply(Image image) {
        return new ImageResponse(
                image.getId(),
                image.getName(),
                image.getImageUrl(),
                image.getCreatedAt(),
                image.getUpdatedAt()
        );
    }
}
