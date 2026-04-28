package com.klu.service;

import com.klu.dto.AuthRequestDto;
import com.klu.dto.AuthResponseDto;
import com.klu.dto.BulkUploadResultDto;
import com.klu.dto.CreateUserDto;
import com.klu.dto.UserDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    AuthResponseDto login(AuthRequestDto request);
    UserDto createStudent(CreateUserDto request);
    BulkUploadResultDto bulkCreateStudents(MultipartFile file);
    List<UserDto> getAllStudents();
    UserDto updateStudentEmail(Long id, String email);
}
