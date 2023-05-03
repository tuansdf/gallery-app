package com.gallery.backend.image.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class StorageConfig {
    
    @Value("${aws.region}")
    private String awsRegion;
    
    @Bean
    public Region getRegion() {
        return Region.of(awsRegion);
    }
    
    @Bean
    public S3Client s3Client(Region region) {
        return S3Client
                .builder()
                .region(region)
                .build();
    }
}
