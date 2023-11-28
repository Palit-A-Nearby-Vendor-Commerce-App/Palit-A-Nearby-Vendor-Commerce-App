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

    public AccountEntity updateAccountById(int accountId, AccountEntity account) {
        AccountEntity existingAccount = accountRepository.findByAccountIdAndIsDeletedFalse(accountId);
        if (existingAccount != null) {
            existingAccount.setEmail(account.getEmail());
            existingAccount.setPassword(account.getPassword());
            existingAccount.setIsVendor(account.getIsVendor());
            existingAccount.setIsAdmin(account.getIsAdmin());
            existingAccount.setIsDeleted(account.getIsDeleted());
            existingAccount.setUser(account.getUser());
            existingAccount.setLocation(account.getLocation());
            existingAccount.setStore(account.getStore());
            return accountRepository.save(existingAccount);
        } else {
            // Log an error message for debugging
            System.err.println("Invalid account ID for update: " + accountId);
            throw new RuntimeException("Invalid account ID for update: " + accountId);
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

    // Create a method to check if an email already exists
    public boolean checkEmail(AccountEntity account) {
        // Get the list of accounts from the previous method
        List<AccountEntity> accounts = getAllAccounts();
        // Loop through the list of accounts
        for (AccountEntity a : accounts) {
            // Check if the email of the current account is equal to the email of the account being created
            if (a.getEmail().equals(account.getEmail())) {
                // Log an error message for debugging
                System.err.println("Email already exists: " + account.getEmail());
                return true; // Email already exists
            }
        }
        return false; // Email does not exist
    }
}
