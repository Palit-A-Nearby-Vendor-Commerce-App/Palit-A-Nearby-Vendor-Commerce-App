package com.nearbyvendor.palit.service;

import com.nearbyvendor.palit.entity.AccountEntity;
import com.nearbyvendor.palit.repository.AccountRepository;
import com.nearbyvendor.palit.repository.LocationRepository;
import com.nearbyvendor.palit.entity.LocationEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

import javax.persistence.EntityManager;

@Service
@Transactional
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;
    
    @Autowired
    private LocationRepository locationRepository;
    
    @Autowired
    private EntityManager entityManager;

    public List<AccountEntity> getAllAccounts() {
        return accountRepository.findByIsDeletedFalse();
    }

    public AccountEntity getAccountById(int accountId) {
        AccountEntity account = accountRepository.findByAccountIdAndIsDeletedFalse(accountId);
        if (account == null) {

            System.err.println("Account not found with ID: " + accountId);
        }
        return account;
    }

    public AccountEntity createAccount(AccountEntity account) {
        LocationEntity location = locationRepository.findById(account.getLocation().getLocationId()).orElse(null);
        if (location == null) {
            throw new RuntimeException("Location not found for ID: " + account.getLocation().getLocationId());
        }
        account.setLocation(location);
        return accountRepository.save(account);
    }

    public AccountEntity updateAccountById(int accountId, AccountEntity account) {
        AccountEntity existingAccount = accountRepository.findByAccountIdAndIsDeletedFalse(accountId);
        if (existingAccount != null) {
            existingAccount.setEmail(account.getEmail());
            existingAccount.setPassword(account.getPassword());
            existingAccount.setIsVendor(account.getIsVendor());
            existingAccount.setIsAdmin(account.getIsAdmin());
            existingAccount.setUser(account.getUser());
            existingAccount.setLocation(account.getLocation());
            existingAccount.setStore(account.getStore());
            return accountRepository.save(existingAccount);
        } else {

            System.err.println("Invalid account ID for update: " + accountId);
            throw new RuntimeException("Invalid account ID for update: " + accountId);
        }
    }

    public boolean deleteAccountById(int accountId) {
        AccountEntity existingAccount = accountRepository.findByAccountIdAndIsDeletedFalse(accountId);
        if (existingAccount != null) {
            existingAccount.setIsDeleted(true);
            accountRepository.save(existingAccount);
            return true;
        } else {

            System.err.println("Invalid account ID for deletion: " + accountId);
            return false;
        }
    }

    public boolean checkEmail(AccountEntity account) {

        List<AccountEntity> accounts = getAllAccounts();

        for (AccountEntity a : accounts) {

            if (a.getEmail().equals(account.getEmail())) {

                System.err.println("Email already exists: " + account.getEmail());
                return true;
            }
        }
        return false;
    }
}
