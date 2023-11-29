package com.nearbyvendor.palit.controller;

import com.nearbyvendor.palit.entity.ReportEntity;
import com.nearbyvendor.palit.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/getAllReports")
    public ResponseEntity<List<ReportEntity>> getAllReports() {
        List<ReportEntity> reports = reportService.getAllReports();
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

    @GetMapping("/getReportById/{id}")
    public ResponseEntity<ReportEntity> getReportById(@PathVariable int id) {
        ReportEntity report = reportService.getReportById(id);
        if (report != null) {
            return new ResponseEntity<>(report, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/createReport")
    public ResponseEntity<ReportEntity> createReport(@RequestBody ReportEntity report) {
        ReportEntity newReport = reportService.createReport(report);
        return new ResponseEntity<>(newReport, HttpStatus.CREATED);
    }

    @PutMapping("/updateReportById/{id}")
    public ResponseEntity<ReportEntity> updateReportById(@PathVariable int id, @RequestBody ReportEntity report) {
        ReportEntity updatedReport = reportService.updateReportById(id, report);
        if (updatedReport != null) {
            return new ResponseEntity<>(updatedReport, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteReportById/{id}")
    public ResponseEntity<Void> deleteReportById(@PathVariable int id) {
        boolean deleted = reportService.deleteReportById(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
