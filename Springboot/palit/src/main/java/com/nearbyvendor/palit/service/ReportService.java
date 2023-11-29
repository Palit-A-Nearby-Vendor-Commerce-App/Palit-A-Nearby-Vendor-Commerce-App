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
        return reportRepository.findAllByIsDeletedFalse();
    }

    public ReportEntity getReportById(int id) {
        ReportEntity report = reportRepository.findByReportIdAndIsDeletedFalse(id);
        if (report != null) {
            return report;
        } else {

            System.err.println("ReportEntity not found with id: " + id);
            throw new RuntimeException("ReportEntity not found with id: " + id);
        }
    }

    public ReportEntity createReport(ReportEntity report) {
        return reportRepository.save(report);
    }

    public ReportEntity updateReportById(int id, ReportEntity report) {
        ReportEntity existingReport = reportRepository.findByReportIdAndIsDeletedFalse(id);
        if (existingReport != null) {
            report.setReportId(id);
            return reportRepository.save(report);
        } else {

            System.err.println("Invalid report ID for updating: " + id);
            throw new IllegalArgumentException("Invalid report ID");
        }
    }

    public boolean deleteReportById(int id) {
        ReportEntity existingReport = reportRepository.findByReportIdAndIsDeletedFalse(id);
        if (existingReport != null) {
            existingReport.setIsDeleted(true);
            reportRepository.save(existingReport);
            return true;
        } else {

            System.err.println("Invalid report ID for deletion: " + id);
            throw new IllegalArgumentException("Invalid report ID");
        }
    }
}
