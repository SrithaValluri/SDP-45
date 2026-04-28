package com.klu.service.impl;

import com.klu.dto.AchievementDto;
import com.klu.entity.Achievement;
import com.klu.entity.User;
import com.klu.repository.AchievementRepository;
import com.klu.repository.UserRepository;
import com.klu.service.AchievementService;
import com.klu.service.EmailService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AchievementServiceImpl implements AchievementService {

    @Autowired
    private AchievementRepository achievementRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public AchievementDto createAchievement(AchievementDto achievementDto) {
        Achievement achievement = modelMapper.map(achievementDto, Achievement.class);
        Achievement saved = achievementRepository.save(achievement);

        Optional<User> userOpt = userRepository.findByUsername(saved.getStudentId());
        userOpt.ifPresent(user -> {
            if (user.getEmail() != null && !user.getEmail().isBlank()) {
                String subject = "Achievement Submitted - " + saved.getTitle();
                String body = "Dear " + user.getName() + ",\n\n"
                        + "Your achievement has been successfully submitted for review.\n"
                        + "Title: " + saved.getTitle() + "\n"
                        + "Category: " + saved.getCategory() + "\n"
                        + "Level: " + saved.getLevel() + "\n"
                        + "Status: Pending Review\n\n"
                        + "You will be notified once the admin reviews it.\n\n"
                        + "Regards,\nStudent Achievement Portal";
                emailService.sendEmail(user.getEmail(), subject, body);
            }
        });

        return modelMapper.map(saved, AchievementDto.class);
    }

    @Override
    public List<AchievementDto> getAllAchievements() {
        return achievementRepository.findAll().stream()
                .map(achievement -> modelMapper.map(achievement, AchievementDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<AchievementDto> getAchievementsByStudentId(String studentId) {
        return achievementRepository.findByStudentId(studentId).stream()
                .map(achievement -> modelMapper.map(achievement, AchievementDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public AchievementDto updateAchievementStatus(Long id, String status) {
        Achievement achievement = achievementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Achievement not found"));
        achievement.setStatus(status);
        Achievement saved = achievementRepository.save(achievement);

        Optional<User> userOpt = userRepository.findByUsername(saved.getStudentId());
        userOpt.ifPresent(user -> {
            if (user.getEmail() != null && !user.getEmail().isBlank()) {
                String subject = "Achievement Status Updated - " + saved.getTitle();
                String body = "Dear " + user.getName() + ",\n\n"
                        + "Your achievement record has been updated.\n"
                        + "Title: " + saved.getTitle() + "\n"
                        + "Status: " + status + "\n\n"
                        + "Regards,\nStudent Achievement Portal";
                emailService.sendEmail(user.getEmail(), subject, body);
            }
        });

        return modelMapper.map(saved, AchievementDto.class);
    }

    @Override
    public void deleteAchievement(Long id) {
        if (!achievementRepository.existsById(id)) {
            throw new RuntimeException("Achievement not found");
        }
        achievementRepository.deleteById(id);
    }
}
