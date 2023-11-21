package com.nearbyvendor.palit.controller;

import com.nearbyvendor.palit.entity.TransactionEntity;
import com.nearbyvendor.palit.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    // Get all transactions
    @GetMapping("/getAllTransactions")
    public List<TransactionEntity> getTransactions() {
        return transactionService.getAllTransactions();
    }

    // Get a transaction by ID
    @GetMapping("/getTransactionById/{id}")
    public TransactionEntity getTransactionById(@PathVariable int id) {
        return transactionService.getTransactionById(id);
    }

    // Create a new transaction
    @PostMapping("/createTransaction")
    public TransactionEntity createTransaction(@RequestBody TransactionEntity transaction) {
        return transactionService.createTransaction(transaction);
    }

    // Update an existing transaction
    @PutMapping("updateTransactionById/{id}")
    public TransactionEntity updateTransactionById(@PathVariable int id, @RequestBody TransactionEntity transaction) {
        return transactionService.updateTransactionById(id, transaction);
    }

    // Delete an existing transaction
    @DeleteMapping("deleteTransactionById/{id}")
    public void deleteTransactionById(@PathVariable int id) {
        transactionService.deleteTransactionById(id);
    }
}
