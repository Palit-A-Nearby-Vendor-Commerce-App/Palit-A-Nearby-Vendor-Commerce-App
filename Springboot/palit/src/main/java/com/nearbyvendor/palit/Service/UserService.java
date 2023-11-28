package com.nearbyvendor.palit.service;

import com.nearbyvendor.palit.entity.AccountEntity;
import com.nearbyvendor.palit.entity.UserEntity;
import com.nearbyvendor.palit.repository.AccountRepository;
import com.nearbyvendor.palit.repository.LocationRepository;
import com.nearbyvendor.palit.repository.StoreRepository;
import com.nearbyvendor.palit.repository.UserRepository;
import com.nearbyvendor.palit.entity.LocationEntity;
import com.nearbyvendor.palit.entity.StoreEntity;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private LocationRepository locationRepository;
    @Autowired
    private StoreRepository storeRepository;

    public List<UserEntity> getAllUsers() {
        return userRepository.findByIsDeletedFalse();
    }

    public UserEntity getUserById(int id) {
        UserEntity user = userRepository.findByUserIdAndIsDeletedFalse(id);
        if (user != null) {
            return user;
        } else {
            // Log an error message for debugging
            System.err.println("UserEntity not found with id: " + id);
            throw new RuntimeException("UserEntity not found with id: " + id);
        }
    }

    public UserEntity createUser(UserEntity newUserEntity) {
        return userRepository.save(newUserEntity);
    }

    public UserEntity updateUserById(int id, UserEntity updatedUserEntity) {
        //find the user by id
        UserEntity user = userRepository.findByUserIdAndIsDeletedFalse(id);
        if (user != null) {
            //set the user's fields to the updated user's fields
            user.setFirstName(updatedUserEntity.getFirstName());
            user.setLastName(updatedUserEntity.getLastName());
            user.setBirthDate(updatedUserEntity.getBirthDate());
            user.setEmail(updatedUserEntity.getEmail());
            user.setPassword(updatedUserEntity.getPassword());
            user.setAccount(updatedUserEntity.getAccount());
            user.setLocation(updatedUserEntity.getLocation());
            user.setStore(updatedUserEntity.getStore());
            //save the updated user
            userRepository.save(user);
            return user;
        } else {
            // Log an error message for debugging
            System.err.println("Invalid user ID for update: " + id);
            throw new IllegalArgumentException("Invalid user ID");
        }
    }

    public boolean deleteUserById(int id) {
        UserEntity user = userRepository.findByUserIdAndIsDeletedFalse(id);
        if (user != null) {
            user.setIsDeleted(true);
            userRepository.save(user);
            return true; // Deletion was successful
        } else {
            // Log an error message for debugging
            System.err.println("Invalid user ID for deletion: " + id);
            throw new IllegalArgumentException("Invalid user ID");
        }
    }

    // Create a method to check if an email already exists
    public boolean checkEmail(UserEntity userData) {
        // Get the list of users from the previous method
        List<UserEntity> users = getAllUsers();
        // Loop through the users and compare the email with the userData
        for (UserEntity user : users) {
            if (user.getEmail().equals(userData.getEmail())) {
                // If the email already exists, return a message
                return true;
            }
        }
        // If the email does not exist, return a success message
        return false;
    }
}
