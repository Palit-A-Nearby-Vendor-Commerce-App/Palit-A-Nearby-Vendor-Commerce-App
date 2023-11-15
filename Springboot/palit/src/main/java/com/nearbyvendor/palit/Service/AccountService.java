package com.nearbyvendor.palit.Service;

import com.nearbyvendor.palit.Entity.AccountEntity;
import com.nearbyvendor.palit.Repository.AccountRepository;
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

    public AccountEntity saveAccount(AccountEntity account) {
        return accountRepository.save(account);
    }

    public void deleteAccountById(int id) {
        accountRepository.deleteById(id);
    }
}
