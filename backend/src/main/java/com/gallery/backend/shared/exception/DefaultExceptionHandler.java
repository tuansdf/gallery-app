package com.gallery.backend.shared.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class DefaultExceptionHandler {

    @ExceptionHandler(BaseException.class)
    public ResponseEntity<ExceptionResponse> handleException(BaseException exception) {
        ExceptionResponse response = new ExceptionResponse(
                exception.getStatus().value(),
                exception.getMessage()
        );
        return new ResponseEntity<>(response, exception.getStatus());
    }
}
