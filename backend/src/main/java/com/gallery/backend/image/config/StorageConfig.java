package com.gallery.backend.image.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class StorageConfig {
    @Bean
    public S3Client s3Client() {
        Region region1 = Region.AP_SOUTHEAST_2;
        return S3Client
                .builder()
                .region(region1)
                .build();
    }
}
