package com.nearbyvendor.palit.controller;

import com.nearbyvendor.palit.entity.AccountEntity;
import com.nearbyvendor.palit.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping("/getAllAccounts")
    public ResponseEntity<List<AccountEntity>> getAllAccounts() {
        List<AccountEntity> accounts = accountService.getAllAccounts();
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }

    @GetMapping("/getAccountById/{id}")
    public ResponseEntity<AccountEntity> getAccountById(@PathVariable int id) {
        AccountEntity account = accountService.getAccountById(id);
        if (account != null) {
            return new ResponseEntity<>(account, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/createAccount")
    public ResponseEntity<AccountEntity> createAccount(@RequestBody AccountEntity account) {
        AccountEntity createdAccount = accountService.createAccount(account);
        return new ResponseEntity<>(createdAccount, HttpStatus.CREATED);
    }

    @PutMapping("/editAccountById/{id}")
    public ResponseEntity<AccountEntity> editAccountById(@PathVariable int id, @RequestBody AccountEntity account) {
        AccountEntity updatedAccount = accountService.updateAccountById(id, account);
        if (updatedAccount != null) {
            return new ResponseEntity<>(updatedAccount, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteAccountById/{id}")
    public ResponseEntity<Void> deleteAccountById(@PathVariable int id) {
        boolean deleted = accountService.deleteAccountById(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/isEmailTaken")
    public ResponseEntity<Boolean> checkEmail(@RequestBody AccountEntity account) {
        boolean isEmailTaken = accountService.checkEmail(account);
        return new ResponseEntity<>(isEmailTaken, HttpStatus.OK);
    }
    
    @GetMapping("/getAllAdminAccounts")
    public ResponseEntity<List<AccountEntity>> getAllAdminAccounts() {
        List<AccountEntity> adminAccounts = accountService.getAllAdminAccounts();

        if (!adminAccounts.isEmpty()) {
            return new ResponseEntity<>(adminAccounts, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
