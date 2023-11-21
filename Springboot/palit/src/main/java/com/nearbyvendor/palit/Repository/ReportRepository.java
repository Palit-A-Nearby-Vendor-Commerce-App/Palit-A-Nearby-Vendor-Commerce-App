package com.nearbyvendor.palit.repository;

import com.nearbyvendor.palit.entity.ReportEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<ReportEntity, Integer> {
    // You can add custom methods here if needed
}
