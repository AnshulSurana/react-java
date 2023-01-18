package com.mobilabsolutions.common.exception;

import com.mobilabsolutions.common.dto.ExceptionDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    private Logger logger = LoggerFactory.getLogger(RestExceptionHandler.class);

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionDto> handleUnknownException(Exception exception, WebRequest request) {
        logger.error(exception.getMessage(), exception);
        ExceptionDto exceptionDto = new ExceptionDto(Collections.singletonList("Internal server error."), HttpStatus.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<>(exceptionDto, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ExceptionDto> handleResourceNotFoundException(ResourceNotFoundException exception, WebRequest request) {
        logger.error(exception.getMessage(), exception);
        ExceptionDto exceptionDto = new ExceptionDto(Collections.singletonList(exception.getMessage()), HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(exceptionDto, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(InsufficientFundsException.class)
    public ResponseEntity<ExceptionDto> handleInsufficientFundsException(InsufficientFundsException exception, WebRequest request) {
        logger.error(exception.getMessage(), exception);
        ExceptionDto exceptionDto = new ExceptionDto(Collections.singletonList(exception.getMessage()), HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(exceptionDto, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ServiceUnavailableException.class)
    public ResponseEntity<ExceptionDto> handleServiceUnavailableException(ServiceUnavailableException exception, WebRequest request) {
        logger.error(exception.getMessage(), exception);
        ExceptionDto exceptionDto = new ExceptionDto(Collections.singletonList(exception.getMessage()), HttpStatus.SERVICE_UNAVAILABLE);
        return new ResponseEntity<>(exceptionDto, HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        logger.error(ex.getMessage(), ex);
        BindingResult bindingResult = ex.getBindingResult();
        List<FieldError> fieldErrors = bindingResult.getFieldErrors();
        List<String> messages = new LinkedList<>();

        for (FieldError fieldError : fieldErrors)
            messages.add(fieldError.getDefaultMessage());

        ExceptionDto exceptionDto = new ExceptionDto(messages, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(exceptionDto, HttpStatus.BAD_REQUEST);
    }

}
