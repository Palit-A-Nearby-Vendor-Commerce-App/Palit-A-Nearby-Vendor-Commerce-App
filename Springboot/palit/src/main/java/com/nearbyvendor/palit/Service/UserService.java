package com.nearbyvendor.palit.service;

import com.nearbyvendor.palit.entity.AccountEntity;
import com.nearbyvendor.palit.entity.UserEntity;
import com.nearbyvendor.palit.repository.UserRepository;
import com.nearbyvendor.palit.entity.LocationEntity;
import com.nearbyvendor.palit.entity.StoreEntity;

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

    public UserEntity createUser(MultipartFile image, String firstName, String lastName, String birthDate, String email, String password)
            throws IOException, ParseException {
        UserEntity newUserEntity = new UserEntity();
        newUserEntity.setImage(image.getBytes());
        newUserEntity.setFirstName(firstName);
        newUserEntity.setLastName(lastName);
        // Convert the birthDate string to java.sql.Date
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date parsedDate = dateFormat.parse(birthDate);
        java.sql.Date sqlDate = new java.sql.Date(parsedDate.getTime());
        newUserEntity.setBirthDate(sqlDate);
        newUserEntity.setEmail(email);
        newUserEntity.setPassword(password);
        // Save the updated user in the repository
        return userRepository.save(newUserEntity);
    }

    public UserEntity updateUserById(int id, MultipartFile image, String firstName, String lastName, String birthDate, String email,
            String password)
            throws IOException, ParseException {
        Optional<UserEntity> user = userRepository.findById(id);
        if (user.isPresent()) {
            UserEntity existingUser = user.get();
            existingUser.setImage(image.getBytes());
            existingUser.setFirstName(firstName);
            existingUser.setLastName(lastName);
            // Convert the birthDate string to java.sql.Date
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            java.util.Date parsedDate = dateFormat.parse(birthDate);
            java.sql.Date sqlDate = new java.sql.Date(parsedDate.getTime());
            existingUser.setBirthDate(sqlDate);
            existingUser.setEmail(email);
            existingUser.setPassword(password);
            // Save the updated user in the repository
            return userRepository.save(existingUser);
        } else {
            // Log an error message for debugging
            System.err.println("Invalid user ID for updating: " + id);
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

    // define the get account entity by account id method
    public AccountEntity getAccountByAccountId(int accountId) {
        // use the account repository to find the account entity by user id
        AccountEntity accountEntity = userRepository.findByAccountAccountIdAndIsDeletedFalse(accountId);
        // return the account entity or null if not found
        return accountEntity;
    }

    // define get location entity by location id method
    public LocationEntity getLocationByLocationId(int locationId) {
        // use the user repository to find the location entity by location id
        LocationEntity locationEntity = userRepository.findByLocationLocationIdAndIsDeletedFalse(locationId);
        // return the location entity or null if not found
        return locationEntity;
    }

    //define get store entity by store id method
    public StoreEntity getStoreByStoreId(int storeId) {
        // use the user repository to find the store entity by store id
        StoreEntity storeEntity = userRepository.findByStoreStoreIdAndIsDeletedFalse(storeId);
        // return the store entity or null if not found
        return storeEntity;
    }
}
