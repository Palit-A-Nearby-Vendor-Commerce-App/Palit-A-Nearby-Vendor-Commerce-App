package com.nearbyvendor.palit.service;

import com.nearbyvendor.palit.entity.TransactionEntity;
import com.nearbyvendor.palit.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public List<TransactionEntity> getAllTransactions() {
        return transactionRepository.findAllByIsDeletedFalse();
    }

    public TransactionEntity getTransactionById(int id) {
        TransactionEntity transaction = transactionRepository.findByTransactionIdAndIsDeletedFalse(id);
        if (transaction != null) {
            return transaction;
        } else {
            // Log an error message for debugging
            System.err.println("TransactionEntity not found with id: " + id);
            throw new RuntimeException("TransactionEntity not found with id: " + id);
        }
    }

    public TransactionEntity createTransaction(TransactionEntity transaction) {
        transaction.setIsDeleted(false);
        return transactionRepository.save(transaction);
    }

    public TransactionEntity updateTransactionById(int id, TransactionEntity transaction) {
        TransactionEntity existingTransaction = transactionRepository.findByTransactionIdAndIsDeletedFalse(id);
        if (existingTransaction != null) {
            transaction.setTransactionId(existingTransaction.getTransactionId());
            transaction.setIsDeleted(false);
            return transactionRepository.save(transaction);
        } else {
            // Log an error message for debugging
            System.err.println("Invalid transaction ID for updating: " + id);
            throw new IllegalArgumentException("Invalid transaction ID");
        }
    }

    public boolean deleteTransactionById(int id) {
        TransactionEntity existingTransaction = transactionRepository.findByTransactionIdAndIsDeletedFalse(id);
        if (existingTransaction != null) {
            existingTransaction.setIsDeleted(true);
            transactionRepository.save(existingTransaction);
            return true; // Deletion was successful
        } else {
            // Log an error message for debugging
            System.err.println("Invalid transaction ID for deletion: " + id);
            throw new IllegalArgumentException("Invalid transaction ID");
        }
    }
}
