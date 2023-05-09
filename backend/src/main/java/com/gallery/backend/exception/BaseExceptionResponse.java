package com.gallery.backend.exception;

public record BaseExceptionResponse(
        int status,
        String message
) {
}
