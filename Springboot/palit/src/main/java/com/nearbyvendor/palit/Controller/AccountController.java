package com.nearbyvendor.palit.controller;

import com.nearbyvendor.palit.entity.AccountEntity;
import com.nearbyvendor.palit.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping("/getAllAccounts")
    public List<AccountEntity> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    @GetMapping("/getAccountById/{id}")
    public AccountEntity getAccountById(@PathVariable int id) {
        return accountService.getAccountById(id);
    }

    @PostMapping("/createAccount")
    public AccountEntity createAccount(@RequestBody AccountEntity account) {
        return accountService.createAccount(account);
    }

    @PutMapping("/editAccountById/{id}")
    public AccountEntity editAccountById(@PathVariable int id, @RequestBody AccountEntity account) {
        return accountService.editAccountById(id, account);
    }

    @DeleteMapping("/deleteAccountById/{id}")
    public void deleteAccountById(@PathVariable int id) {
        accountService.deleteAccountById(id);
    }

    
}
