package com.gallery.backend.shared.exception;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class BaseException extends RuntimeException {
    private final HttpStatus status;
    private final String message;
}
