package com.klu.exception;

import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends RuntimeException {
    private HttpStatus status = HttpStatus.NOT_FOUND;

    public ResourceNotFoundException(String message) {
        super(message);
    }
    
    public HttpStatus getStatus() { return status; }
}
