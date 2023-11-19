package com.nearbyvendor.palit.service;

import com.nearbyvendor.palit.entity.Report;
import com.nearbyvendor.palit.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    public Report getReportById(int id) {
        return reportRepository.findById(id).orElse(null);
    }

    public Report createReport(Report report) {
        return reportRepository.save(report);
    }

    public Report updateReport(int id, Report report) {
        Report existingReport = reportRepository.findById(id).orElse(null);
        if (existingReport != null) {
            existingReport.setSenderId(report.getSenderId());
            existingReport.setMessageContent(report.getMessageContent());
            existingReport.setTimestamp(report.getTimestamp());
            existingReport.setIsResolved(report.getIsResolved());
            return reportRepository.save(existingReport);
        }
        return null;
    }

    public void deleteReport(int id) {
        reportRepository.deleteById(id);
    }
}
