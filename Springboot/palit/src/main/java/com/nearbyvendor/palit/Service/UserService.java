package com.nearbyvendor.palit.service;

import com.nearbyvendor.palit.entity.UserEntity;
import com.nearbyvendor.palit.repository.UserRepository;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<UserEntity> getAllUsers() {
        return userRepository.findByIsDeletedFalse();
    }

    public UserEntity getUserById(int id) {
        return userRepository.findByUserIdAndIsDeletedFalse(id);
    }

    public UserEntity createUserWOutImage(UserEntity user) throws IOException {
        return userRepository.save(user);
    }

    // Method to update a user given an int id
    public UserEntity updateUserByIdWOutImage(@PathVariable int id, UserEntity user) throws IOException {
        UserEntity existingUser = userRepository.findById(id).orElseThrow();
        // Update the user fields with the new values except the image
        existingUser.setName(user.getName());
        existingUser.setBirthDate(user.getBirthDate());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(user.getPassword());
        // Save the updated user in the repository
        return userRepository.save(existingUser);
    }

    // Method to update a user's image given an int id and a multipart image
    public UserEntity updateUserImage(@PathVariable int id, MultipartFile image) throws IOException {
        // Find the user by id from the repository
        UserEntity existingUser = userRepository.findById(id).orElseThrow();
        // Update the user's image field with the new value
        existingUser.setImage(image.getBytes());
        // Save the updated user in the repository
        return userRepository.save(existingUser);
    }

    public void deleteUserById(int id) {
        UserEntity user = userRepository.findByUserIdAndIsDeletedFalse(id);
        if (user != null) {
            user.setIsDeleted(true);
            userRepository.save(user);
        } else {
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
