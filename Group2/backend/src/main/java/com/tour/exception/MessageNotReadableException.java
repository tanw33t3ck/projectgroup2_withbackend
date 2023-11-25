package com.tour.exception;

public class MessageNotReadableException extends RuntimeException{
    public  MessageNotReadableException(){
        super("Request is malformed");
    }
}
