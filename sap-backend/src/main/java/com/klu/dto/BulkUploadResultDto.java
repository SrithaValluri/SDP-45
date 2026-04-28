package com.klu.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BulkUploadResultDto {

    private int totalRequested;
    private int successCount;
    private int failureCount;
    private List<RowResult> results;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RowResult {
        private int rowNumber;
        private String username;   // regNo used as username
        private String name;
        private String status;     // "SUCCESS" or "FAILED"
        private String reason;     // null on success, error message on failure
    }
}
