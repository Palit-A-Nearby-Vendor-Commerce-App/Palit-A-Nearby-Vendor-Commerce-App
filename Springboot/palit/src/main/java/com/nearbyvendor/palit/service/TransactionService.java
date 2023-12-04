package com.nearbyvendor.palit.service;

import com.nearbyvendor.palit.entity.AccountEntity;
import com.nearbyvendor.palit.entity.TransactionEntity;
import com.nearbyvendor.palit.repository.AccountRepository;
import com.nearbyvendor.palit.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accountRepository;

    public List<TransactionEntity> getAllTransactions() {
        return transactionRepository.findAllByIsDeletedFalse();
    }

    public TransactionEntity getTransactionById(int id) {
        TransactionEntity transaction = transactionRepository.findByTransactionIdAndIsDeletedFalse(id);
        if (transaction != null) {
            return transaction;
        } else {
            System.err.println("TransactionEntity not found with id: " + id);
            throw new RuntimeException("TransactionEntity not found with id: " + id);
        }
    }

    public TransactionEntity createTransaction(TransactionEntity transaction) {
        // get a fresh copy of the vendor and customer and assign it to transaction
        // AccountEntity vendor = accountRepository.findByAccountIdAndIsDeletedFalse(transaction.getVendor().getAccountId());
        // AccountEntity customer = accountRepository.findByAccountIdAndIsDeletedFalse(transaction.getCustomer().getAccountId());
        // transaction.setCustomer(customer);
        // transaction.setVendor(vendor);

        return transactionRepository.save(transaction);
    }

    public TransactionEntity updateTransactionById(int id, TransactionEntity transaction) {
        TransactionEntity existingTransaction = transactionRepository.findByTransactionIdAndIsDeletedFalse(id);
        if (existingTransaction != null) {
            existingTransaction.setCustomer(transaction.getCustomer());
            existingTransaction.setVendor(transaction.getVendor());
            existingTransaction.setStatus(transaction.getStatus());
            existingTransaction.setDetails(transaction.getDetails());
            return transactionRepository.save(existingTransaction);
        } else {
            System.err.println("Invalid transaction ID for updating: " + id);
            throw new IllegalArgumentException("Invalid transaction ID");
        }
    }

    public boolean deleteTransactionById(int id) {
        TransactionEntity existingTransaction = transactionRepository.findByTransactionIdAndIsDeletedFalse(id);
        if (existingTransaction != null) {
            existingTransaction.setIsDeleted(true);
            transactionRepository.save(existingTransaction);
            return true;
        } else {
            System.err.println("Invalid transaction ID for deletion: " + id);
            throw new IllegalArgumentException("Invalid transaction ID");
        }
    }
}
