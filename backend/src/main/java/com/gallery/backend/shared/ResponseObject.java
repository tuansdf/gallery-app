package com.gallery.backend.shared;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseObject<T> {
    private int status;
    private String message;
    private T data;

    public ResponseObject(HttpStatus httpStatus, T data) {
        this.status = httpStatus.value();
        this.message = httpStatus.getReasonPhrase();
        this.data = data;
    }
}
