package com.example.lct.exception.global;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorDetails {

    private Integer statusCode;

    private Integer businessErrorCode;

    private LocalDate timestamp;

    private String message;

    private String details;

}

