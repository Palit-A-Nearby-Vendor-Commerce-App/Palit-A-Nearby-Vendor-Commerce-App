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
        return accountRepository.findByIsDeletedFalse();
    }

    public AccountEntity getAccountById(int accountId) {
        return accountRepository.findByAccountIdAndIsDeletedFalse(accountId);
    }

    public AccountEntity createAccount(AccountEntity account) {
        return accountRepository.save(account);
    }

    public AccountEntity editAccountById(int accountId, AccountEntity account) {
        AccountEntity existingAccount = accountRepository.findByAccountIdAndIsDeletedFalse(accountId);
        if (existingAccount != null) {
            account.setId(accountId);
            return accountRepository.save(account);
        } else {
            // Handle the case when the account ID is null or does not exist
            // You can throw an exception or handle it in a different way based on your
            // requirements
            throw new IllegalArgumentException("Invalid account ID");
        }
    }

    public void deleteAccountById(int accountId) {
        AccountEntity existingAccount = accountRepository.findByAccountIdAndIsDeletedFalse(accountId);
        if (existingAccount != null) {
            existingAccount.setIsDeleted(true);
            accountRepository.save(existingAccount);
        } else {
            // Handle the case when the account ID is null or does not exist
            // You can throw an exception or handle it in a different way based on your
            // requirements
            throw new IllegalArgumentException("Invalid account ID");
        }
    }
}
