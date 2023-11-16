package com.nearbyvendor.palit.repository;

import com.nearbyvendor.palit.entity.Transaction;
import com.nearbyvendor.palit.entity.TransactionId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, TransactionId> {
}
