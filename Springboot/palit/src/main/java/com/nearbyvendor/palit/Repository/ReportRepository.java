package com.nearbyvendor.palit.repository;

import com.nearbyvendor.palit.entity.ReportEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<ReportEntity, Integer> {

    List<ReportEntity> findAllByIsDeletedFalse();

    ReportEntity findByReportIdAndIsDeletedFalse(int reportId);
}
