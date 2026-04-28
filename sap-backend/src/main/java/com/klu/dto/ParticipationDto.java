package com.klu.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParticipationDto {
    private Long id;
    private String studentId;
    private String eventName;
    private String role;
    private LocalDate date;
    private String outcome;
    private String status;
}
