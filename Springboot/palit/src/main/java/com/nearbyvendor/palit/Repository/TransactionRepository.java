package com.nearbyvendor.palit.repository;

import com.nearbyvendor.palit.entity.TransactionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<TransactionEntity, Integer> {

    List<TransactionEntity> findAllByIsDeletedFalse();

    TransactionEntity findByTransactionIdAndIsDeletedFalse(int transactionId);
}
