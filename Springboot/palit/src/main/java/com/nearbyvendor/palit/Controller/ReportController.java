package com.nearbyvendor.palit.controller;

import com.nearbyvendor.palit.entity.Report;
import com.nearbyvendor.palit.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping
    public ResponseEntity<List<Report>> getAllReports() {
        return new ResponseEntity<>(reportService.getAllReports(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Report> getReportById(@PathVariable int id) {
        return new ResponseEntity<>(reportService.getReportById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Report> createReport(@RequestBody Report report) {
        return new ResponseEntity<>(reportService.createReport(report), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Report> updateReport(@PathVariable int id, @RequestBody Report report) {
        return new ResponseEntity<>(reportService.updateReport(id, report), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReport(@PathVariable int id) {
        reportService.deleteReport(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
