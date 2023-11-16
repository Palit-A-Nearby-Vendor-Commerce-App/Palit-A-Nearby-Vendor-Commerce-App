package com.nearbyvendor.palit.controller;

import com.nearbyvendor.palit.entity.Transaction;
import com.nearbyvendor.palit.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    // Get all transactions
    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        List<Transaction> transactions = transactionService.getAllTransactions();
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    // Get a transaction by customer and vendor ids
    @GetMapping("/{customer_id}/{vendor_id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable("customer_id") int customerId, @PathVariable("vendor_id") int vendorId) {
        Transaction transaction = transactionService.getTransactionById(customerId, vendorId);
        return new ResponseEntity<>(transaction, HttpStatus.OK);
    }

    // Create a new transaction
    @PostMapping
    public ResponseEntity<Transaction> createTransaction(@RequestBody Transaction transaction) {
        Transaction newTransaction = transactionService.createTransaction(transaction);
        return new ResponseEntity<>(newTransaction, HttpStatus.CREATED);
    }

    // Update an existing transaction
    @PutMapping("/{customer_id}/{vendor_id}")
    public ResponseEntity<Transaction> updateTransaction(@PathVariable("customer_id") int customerId, @PathVariable("vendor_id") int vendorId, @RequestBody Transaction transaction) {
        Transaction updatedTransaction = transactionService.updateTransaction(customerId, vendorId, transaction);
        return new ResponseEntity<>(updatedTransaction, HttpStatus.OK);
    }

    // Delete an existing transaction
    @DeleteMapping("/{customer_id}/{vendor_id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable("customer_id") int customerId, @PathVariable("vendor_id") int vendorId) {
        transactionService.deleteTransaction(customerId, vendorId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
