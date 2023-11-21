package com.nearbyvendor.palit.repository;

import com.nearbyvendor.palit.entity.TransactionEntity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<TransactionEntity, Integer> {

  List<TransactionEntity> findAllByIsDeletedFalse();
    // You can add custom methods here if needed

  TransactionEntity findByTransactionIdAndIsDeletedFalse(int transactionId);
}
