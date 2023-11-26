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
        AccountEntity account = accountRepository.findByAccountIdAndIsDeletedFalse(accountId);
        if (account == null) {
            // Log an error message for debugging
            System.err.println("Account not found with ID: " + accountId);
        }
        return account;
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
            // Log an error message for debugging
            System.err.println("Invalid account ID for editing: " + accountId);
            throw new IllegalArgumentException("Invalid account ID");
        }
    }

    public boolean deleteAccountById(int accountId) {
        AccountEntity existingAccount = accountRepository.findByAccountIdAndIsDeletedFalse(accountId);
        if (existingAccount != null) {
            existingAccount.setIsDeleted(true);
            accountRepository.save(existingAccount);
            return true; // Deletion was successful
        } else {
            // Log an error message for debugging
            System.err.println("Invalid account ID for deletion: " + accountId);
            return false; // Deletion was not successful
        }
    }

    // define the get account entity by user id method
    public AccountEntity getAccountByUserId(int userId) {
        // use the account repository to find the account entity by user id
        AccountEntity accountEntity = accountRepository.findByUserUserIdAndIsDeletedFalse(userId);
        // return the account entity or null if not found
        return accountEntity;
    }
}
