package com.nearbyvendor.palit.service;

import com.nearbyvendor.palit.entity.Transaction;
import com.nearbyvendor.palit.entity.TransactionId;
import com.nearbyvendor.palit.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    // Get all transactions
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    // Get a transaction by customer and vendor ids
    public Transaction getTransactionById(int customerId, int vendorId) {
        Optional<Transaction> transaction = transactionRepository.findById(new TransactionId(customerId, vendorId));
        return transaction.orElse(null);
    }

    // Create a new transaction
    public Transaction createTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    // Update an existing transaction
    public Transaction updateTransaction(int customerId, int vendorId, Transaction transaction) {
        Optional<Transaction> existingTransaction = transactionRepository.findById(new TransactionId(customerId, vendorId));
        if (existingTransaction.isPresent()) {
            Transaction updatedTransaction = existingTransaction.get();
            updatedTransaction.setStatus(transaction.getStatus());
            updatedTransaction.setRating(transaction.getRating());
            return transactionRepository.save(updatedTransaction);
        } else {
            return null;
        }
    }

    // Delete an existing transaction
    public void deleteTransaction(int customerId, int vendorId) {
        transactionRepository.deleteById(new TransactionId(customerId, vendorId));
    }
}
