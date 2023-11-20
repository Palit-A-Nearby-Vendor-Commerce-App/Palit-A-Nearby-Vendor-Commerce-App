package com.nearbyvendor.palit.service;

import com.nearbyvendor.palit.entity.AccountEntity;
import com.nearbyvendor.palit.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    public List<AccountEntity> getAllAccounts() {
        return accountRepository.findAll();
    }

    public AccountEntity getAccountById(int id) {
        return accountRepository.findById(id).orElse(null);
    }

    public AccountEntity saveAccount(int id, AccountEntity account) {
        if (accountRepository.findById(id) != null) {
            return accountRepository.save(account);
        } else {
            // Handle the case when the account ID is null or does not exist
            // You can throw an exception or handle it in a different way based on your requirements
            throw new IllegalArgumentException("Invalid account ID");
        }
    }

    public void deleteAccountById(int id) {
        accountRepository.deleteById(id);
    }

    public int getNextAccountId() {
        AccountEntity latestAccount = accountRepository.findTopByOrderByIdDesc();
        if (latestAccount != null) {
            return latestAccount.getId() + 1;
        } else {
            // Handle the case when there are no accounts in the repository
            // You can return 1 as the next ID or handle it in a different way based on your requirements
            return 0;
        }
    }
    
}
