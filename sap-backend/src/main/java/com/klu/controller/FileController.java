package com.klu.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
public class FileController {

    private static final String UPLOAD_DIR = "uploads";

    @PostMapping
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        try {
            File uploadFolder = new File(UPLOAD_DIR);
            if (!uploadFolder.exists()) {
                uploadFolder.mkdirs();
            }

            String originalFileName = file.getOriginalFilename();
            String extension = "";
            if (originalFileName != null && originalFileName.contains(".")) {
                extension = originalFileName.substring(originalFileName.lastIndexOf("."));
            }
            String fileName = UUID.randomUUID().toString() + extension;
            Path path = Paths.get(UPLOAD_DIR + File.separator + fileName);

            Files.copy(file.getInputStream(), path);

            String fileUrl = "http://localhost:2026/uploads/" + fileName;
            return ResponseEntity.ok(fileUrl);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed to upload file: " + e.getMessage());
        }
    }
}
