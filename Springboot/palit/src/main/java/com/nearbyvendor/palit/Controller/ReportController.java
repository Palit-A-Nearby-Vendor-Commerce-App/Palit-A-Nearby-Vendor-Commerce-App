package com.nearbyvendor.palit.controller;

import com.nearbyvendor.palit.entity.ReportEntity;
import com.nearbyvendor.palit.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ReportController {

    @Autowired
    private ReportService reportService;

    // Get all reports
    @GetMapping("/getAllReports")
    public List<ReportEntity> getAllReports() {
        return reportService.getAllReports();
    }

    // Get a report by ID
    @GetMapping("/getReportById/{id}")
    public ReportEntity getReportById(@PathVariable int id) {
        return reportService.getReportById(id);
    }

    // Create a new report
    @PostMapping("/createReport")
    public ReportEntity createReport(@RequestBody ReportEntity report) {
        return reportService.createReport(report);
    }

    // Update an existing report
    @PutMapping("/updateReportById/{id}")
    public ReportEntity updateReportById(@PathVariable int id, @RequestBody ReportEntity report) {
        return reportService.updateReportById(id, report);
    }

    // Delete an existing report
    @DeleteMapping("/deleteReportById/{id}")
    public void deleteReportById(@PathVariable int id) {
        reportService.deleteReportById(id);
    }
}
