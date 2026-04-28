package com.klu.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AchievementDto {
    private Long id;
    private String studentId;
    private String studentName;
    private String title;
    private String eventName;
    private String category;
    private String level;
    private LocalDate date;
    private String status;
    private String description;
    private String certificateUrl;
}
