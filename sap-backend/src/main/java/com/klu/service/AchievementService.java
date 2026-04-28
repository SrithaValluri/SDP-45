package com.klu.service;

import com.klu.dto.AchievementDto;

import java.util.List;

public interface AchievementService {
    AchievementDto createAchievement(AchievementDto achievementDto);
    List<AchievementDto> getAllAchievements();
    List<AchievementDto> getAchievementsByStudentId(String studentId);
    AchievementDto updateAchievementStatus(Long id, String status);
    void deleteAchievement(Long id);
}
