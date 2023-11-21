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
        return transactionRepository.findByIdAndIsDeletedFalse(id);
    }

    public TransactionEntity createTransaction(TransactionEntity transaction) {
        transaction.setIsDeleted(false);
        return transactionRepository.save(transaction);
    }

    public TransactionEntity updateTransactionById(int id, TransactionEntity transaction) {
        TransactionEntity existingTransaction = transactionRepository.findByIdAndIsDeletedFalse(id);
        if (existingTransaction != null) {
            transaction.setTransactionId(existingTransaction.getTransactionId());
            transaction.setIsDeleted(false);
            return transactionRepository.save(transaction);
        } else {
            // Handle the case when the transaction ID is null or does not exist
            // You can throw an exception or handle it in a different way based on your requirements
            throw new IllegalArgumentException("Invalid transaction ID");
        }
    }

    public void deleteTransactionById(int id) {
        TransactionEntity existingTransaction = transactionRepository.findByIdAndIsDeletedFalse(id);
        if (existingTransaction != null) {
            existingTransaction.setIsDeleted(true);
            transactionRepository.save(existingTransaction);
        } else {
            // Handle the case when the transaction ID is null or does not exist
            // You can throw an exception or handle it in a different way based on your requirements
            throw new IllegalArgumentException("Invalid transaction ID");
        }
    }
}
