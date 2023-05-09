package com.gallery.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class DefaultExceptionHandler {

    @ExceptionHandler(BaseException.class)
    public ResponseEntity<BaseExceptionResponse> handleBaseException(BaseException exception) {
        BaseExceptionResponse response = new BaseExceptionResponse(
                exception.getStatus().value(),
                exception.getMessage()
        );
        return new ResponseEntity<>(response, exception.getStatus());
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<BaseExceptionResponse> handleOtherException(Exception exception) {
        BaseExceptionResponse response = new BaseExceptionResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Something went wrong!"
        );
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
