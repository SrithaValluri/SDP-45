package com.klu.controller;

import com.klu.dto.AchievementDto;
import com.klu.service.AchievementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/achievements")
public class AchievementController {

    @Autowired
    private AchievementService achievementService;

    @PostMapping
    public ResponseEntity<AchievementDto> createAchievement(@RequestBody AchievementDto achievementDto) {
        return new ResponseEntity<>(achievementService.createAchievement(achievementDto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<AchievementDto>> getAllAchievements() {
        return ResponseEntity.ok(achievementService.getAllAchievements());
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<AchievementDto>> getAchievementsByStudentId(@PathVariable String studentId) {
        return ResponseEntity.ok(achievementService.getAchievementsByStudentId(studentId));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<AchievementDto> updateAchievementStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(achievementService.updateAchievementStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAchievement(@PathVariable Long id) {
        achievementService.deleteAchievement(id);
        return ResponseEntity.noContent().build();
    }
}
