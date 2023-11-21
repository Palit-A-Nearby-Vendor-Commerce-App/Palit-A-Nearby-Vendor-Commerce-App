package com.nearbyvendor.palit.service;

import com.nearbyvendor.palit.entity.UserEntity;
import com.nearbyvendor.palit.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    public UserEntity getUserById(int id) {
        return userRepository.findById(id).orElse(null);
    }

    public UserEntity createUser(UserEntity user) {
        return userRepository.save(user);
    }

    public UserEntity updateUserById(int id, UserEntity user) {
        if (userRepository.findById(id) != null) {
            return userRepository.save(user);
        } else {
            // Handle the case when the user ID is null or does not exist
            // You can throw an exception or handle it in a different way based on your requirements
            throw new IllegalArgumentException("Invalid user ID");
        }
    }

    public void deleteUserById(int id) {
        userRepository.deleteById(id);
    }
}
