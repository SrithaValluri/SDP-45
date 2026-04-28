package com.klu.service;

import com.klu.dto.ParticipationDto;

import java.util.List;

public interface ParticipationService {
    ParticipationDto createParticipation(ParticipationDto participationDto);
    List<ParticipationDto> getAllParticipations();
    List<ParticipationDto> getParticipationsByStudentId(String studentId);
    ParticipationDto updateParticipationStatus(Long id, String status);
}
