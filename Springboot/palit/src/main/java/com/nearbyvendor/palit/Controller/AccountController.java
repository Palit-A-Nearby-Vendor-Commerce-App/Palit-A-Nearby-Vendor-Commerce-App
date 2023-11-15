package com.nearbyvendor.palit.Controller;

import com.nearbyvendor.palit.Entity.AccountEntity;
import com.nearbyvendor.palit.Service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping("/accounts")
    public List<AccountEntity> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    @GetMapping("/accounts/{id}")
    public AccountEntity getAccountById(@PathVariable int id) {
        return accountService.getAccountById(id);
    }

    @PostMapping("/accounts")
    public AccountEntity saveAccount(@RequestBody AccountEntity account) {
        return accountService.saveAccount(account);
    }

    @DeleteMapping("/accounts/{id}")
    public void deleteAccountById(@PathVariable int id) {
        accountService.deleteAccountById(id);
    }
}
