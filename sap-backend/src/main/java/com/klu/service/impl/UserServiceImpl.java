package com.klu.service.impl;

import com.klu.dto.AuthRequestDto;
import com.klu.dto.AuthResponseDto;
import com.klu.dto.BulkUploadResultDto;
import com.klu.dto.CreateUserDto;
import com.klu.dto.UserDto;
import com.klu.entity.User;
import com.klu.exception.BadRequestException;
import com.klu.repository.UserRepository;
import com.klu.security.JwtUtil;
import com.klu.service.EmailService;
import com.klu.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.annotation.PostConstruct;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @PostConstruct
    public void init() {
        User admin = userRepository.findByUsername("admin").orElse(new User());
        admin.setUsername("admin");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setName("Admin User");
        admin.setRole(User.Role.ADMIN);
        userRepository.save(admin);
    }

    @Override
    public AuthResponseDto login(AuthRequestDto request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        } catch (Exception e) {
            throw new BadRequestException("Invalid username or password");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);

        User user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        UserDto userDto = modelMapper.map(user, UserDto.class);

        return new AuthResponseDto(jwt, userDto);
    }

    @Override
    public UserDto createStudent(CreateUserDto request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new BadRequestException("Username already exists");
        }
        User student = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .role(User.Role.STUDENT)
                .department(request.getDepartment())
                .year(request.getYear())
                .email(request.getEmail())
                .build();
        User savedStudent = userRepository.save(student);

        if (savedStudent.getEmail() != null && !savedStudent.getEmail().isBlank()) {
            String subject = "Welcome to the Student Achievement Portal";
            String body = "Dear " + savedStudent.getName() + ",\n\n"
                    + "Your account has been created successfully.\n"
                    + "Username: " + savedStudent.getUsername() + "\n\n"
                    + "You can now log in to view and manage your achievements.\n\n"
                    + "Regards,\nStudent Achievement Portal";
            emailService.sendEmail(savedStudent.getEmail(), subject, body);
        }

        return modelMapper.map(savedStudent, UserDto.class);
    }

    @Override
    public List<UserDto> getAllStudents() {
        return userRepository.findAllByRole(User.Role.STUDENT).stream()
                .map(user -> modelMapper.map(user, UserDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public UserDto updateStudentEmail(Long id, String email) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        user.setEmail(email);
        User saved = userRepository.save(user);
        return modelMapper.map(saved, UserDto.class);
    }

    @Override
    public BulkUploadResultDto bulkCreateStudents(MultipartFile file) {
        List<BulkUploadResultDto.RowResult> results = new ArrayList<>();
        int successCount = 0;
        int failureCount = 0;
        int rowNumber = 1; // 1-based, row 1 = header

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(file.getInputStream(), "UTF-8"))) {

            String line;
            boolean isHeader = true;

            while ((line = reader.readLine()) != null) {
                // Skip blank lines
                if (line.trim().isEmpty()) continue;

                // Skip header row
                if (isHeader) {
                    isHeader = false;
                    continue;
                }

                rowNumber++;
                String username = "";
                String name = "";

                try {
                    String[] cols = line.split(",", -1);
                    if (cols.length < 6) {
                        throw new BadRequestException("Expected 6 columns: name,regNo,password,department,year,email");
                    }

                    name       = cols[0].trim();
                    username   = cols[1].trim();
                    String password   = cols[2].trim();
                    String department = cols[3].trim();
                    String year       = cols[4].trim();
                    String email      = cols[5].trim();

                    // Basic validation
                    if (name.isEmpty())     throw new BadRequestException("Name is required");
                    if (username.isEmpty()) throw new BadRequestException("RegNo is required");
                    if (password.isEmpty()) throw new BadRequestException("Password is required");
                    if (email.isEmpty() || !email.contains("@")) throw new BadRequestException("Valid email is required");

                    CreateUserDto dto = new CreateUserDto(username, password, name, department, year, email);
                    createStudent(dto);

                    results.add(new BulkUploadResultDto.RowResult(rowNumber, username, name, "SUCCESS", null));
                    successCount++;

                } catch (BadRequestException ex) {
                    results.add(new BulkUploadResultDto.RowResult(rowNumber, username, name, "FAILED", ex.getMessage()));
                    failureCount++;
                } catch (Exception ex) {
                    results.add(new BulkUploadResultDto.RowResult(rowNumber, username, name, "FAILED", "Unexpected error: " + ex.getMessage()));
                    failureCount++;
                }
            }

        } catch (Exception e) {
            throw new BadRequestException("Could not parse CSV file: " + e.getMessage());
        }

        return new BulkUploadResultDto(rowNumber - 1, successCount, failureCount, results);
    }
}
