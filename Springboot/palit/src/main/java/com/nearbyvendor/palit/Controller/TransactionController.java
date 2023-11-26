package com.nearbyvendor.palit.controller;

import com.nearbyvendor.palit.entity.TransactionEntity;
import com.nearbyvendor.palit.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    // Get all transactions
    @GetMapping("/getAllTransactions")
    public ResponseEntity<List<TransactionEntity>> getTransactions() {
        List<TransactionEntity> transactions = transactionService.getAllTransactions();
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    // Get a transaction by ID
    @GetMapping("/getTransactionById/{id}")
    public ResponseEntity<TransactionEntity> getTransactionById(@PathVariable int id) {
        TransactionEntity transaction = transactionService.getTransactionById(id);
        if (transaction != null) {
            return new ResponseEntity<>(transaction, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Create a new transaction
    @PostMapping("/createTransaction")
    public ResponseEntity<TransactionEntity> createTransaction(@RequestBody TransactionEntity transaction) {
        TransactionEntity newTransaction = transactionService.createTransaction(transaction);
        return new ResponseEntity<>(newTransaction, HttpStatus.CREATED);
    }

    // Update an existing transaction
    @PutMapping("updateTransactionById/{id}")
    public ResponseEntity<TransactionEntity> updateTransactionById(@PathVariable int id, @RequestBody TransactionEntity transaction) {
        TransactionEntity updatedTransaction = transactionService.updateTransactionById(id, transaction);
        if (updatedTransaction != null) {
            return new ResponseEntity<>(updatedTransaction, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete an existing transaction
    @DeleteMapping("deleteTransactionById/{id}")
    public ResponseEntity<Void> deleteTransactionById(@PathVariable int id) {
        transactionService.deleteTransactionById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
