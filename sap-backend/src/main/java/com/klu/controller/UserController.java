package com.klu.controller;

import com.klu.dto.BulkUploadResultDto;
import com.klu.dto.CreateUserDto;
import com.klu.dto.UserDto;
import com.klu.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/admin/students")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDto> createStudent(@Valid @RequestBody CreateUserDto request) {
        UserDto createdStudent = userService.createStudent(request);
        return new ResponseEntity<>(createdStudent, HttpStatus.CREATED);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDto>> getAllStudents() {
        return ResponseEntity.ok(userService.getAllStudents());
    }

    @PatchMapping("/{id}/email")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDto> updateStudentEmail(
            @PathVariable Long id,
            @RequestParam String email) {
        return ResponseEntity.ok(userService.updateStudentEmail(id, email));
    }

    @PostMapping("/bulk")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BulkUploadResultDto> bulkCreateStudents(
            @RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        BulkUploadResultDto result = userService.bulkCreateStudents(file);
        return ResponseEntity.ok(result);
    }
}
