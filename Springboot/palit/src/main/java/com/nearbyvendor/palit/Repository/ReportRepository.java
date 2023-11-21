package com.nearbyvendor.palit.repository;

import com.nearbyvendor.palit.entity.ReportEntity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<ReportEntity, Integer> {

  List<ReportEntity> findAllByIsDeletedFalse();
    // You can add custom methods here if needed

  ReportEntity findByReportIdAndIsDeletedFalse(int id);
}
