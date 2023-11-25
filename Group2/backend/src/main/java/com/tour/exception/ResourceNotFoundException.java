package com.tour.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(Integer id){
        super("Could not find tour with " + id);
    }
}
