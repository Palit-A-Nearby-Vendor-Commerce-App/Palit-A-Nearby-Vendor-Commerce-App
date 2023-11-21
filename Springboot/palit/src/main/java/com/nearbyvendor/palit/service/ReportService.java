package com.nearbyvendor.palit.service;

import com.nearbyvendor.palit.entity.ReportEntity;
import com.nearbyvendor.palit.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    public List<ReportEntity> getAllReports() {
        return reportRepository.findAll();
    }

    public ReportEntity getReportById(int id) {
        return reportRepository.findById(id).orElse(null);
    }

    public ReportEntity createReport(ReportEntity report) {
        return reportRepository.save(report);
    }

    public ReportEntity updateReportById(int id, ReportEntity report) {
        if (reportRepository.findById(id) != null) {
            return reportRepository.save(report);
        } else {
            // Handle the case when the report ID is null or does not exist
            // You can throw an exception or handle it in a different way based on your requirements
            throw new IllegalArgumentException("Invalid report ID");
        }
    }

    public void deleteReportById(int id) {
        reportRepository.deleteById(id);
    }
}
