package com.nearbyvendor.palit.service;

import com.nearbyvendor.palit.entity.AccountEntity;
import com.nearbyvendor.palit.entity.LocationEntity;
import com.nearbyvendor.palit.entity.UserEntity;
import com.nearbyvendor.palit.repository.AccountRepository;
import com.nearbyvendor.palit.repository.LocationRepository;
import com.nearbyvendor.palit.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserAccountLocationService {

    @Autowired
    private LocationRepository locationRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AccountRepository accountRepository;
    // Add methods for combined operations here

    public LocationEntity getLocationById(int locationId) {
        return locationRepository.findById(locationId).orElse(null);
    }

    public UserEntity getUserById(int userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public AccountEntity getAccountById(int accountId) {
        return accountRepository.findById(accountId).orElse(null);
    }

    // You can add more methods as needed to perform combined operations on these entities.
}
