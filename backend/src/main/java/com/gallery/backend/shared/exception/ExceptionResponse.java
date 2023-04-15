package com.gallery.backend.shared.exception;

public record ExceptionResponse(
        int status,
        String message
) {
}
