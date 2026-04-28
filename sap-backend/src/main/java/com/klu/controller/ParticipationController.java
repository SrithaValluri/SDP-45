package com.klu.controller;

import com.klu.dto.ParticipationDto;
import com.klu.service.ParticipationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/participations")
public class ParticipationController {

    @Autowired
    private ParticipationService participationService;

    @PostMapping
    public ResponseEntity<ParticipationDto> createParticipation(@RequestBody ParticipationDto participationDto) {
        return new ResponseEntity<>(participationService.createParticipation(participationDto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ParticipationDto>> getAllParticipations() {
        return ResponseEntity.ok(participationService.getAllParticipations());
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<ParticipationDto>> getParticipationsByStudentId(@PathVariable String studentId) {
        return ResponseEntity.ok(participationService.getParticipationsByStudentId(studentId));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ParticipationDto> updateParticipationStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(participationService.updateParticipationStatus(id, status));
    }
}
