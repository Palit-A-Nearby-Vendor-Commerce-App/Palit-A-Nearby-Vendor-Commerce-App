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
        return userRepository.findByIsDeletedFalse();
    }

    public UserEntity getUserById(int id) {
        return userRepository.findByUserIdAndIsDeletedFalse(id);
    }

    public UserEntity createUser(UserEntity user) {
        return userRepository.save(user);
    }

    public UserEntity updateUserById(int id, UserEntity user) {
        UserEntity existingUser = userRepository.findByUserIdAndIsDeletedFalse(id);
        if (existingUser != null) {
            user.setId(existingUser.getId());
            return userRepository.save(user);
        } else {
            throw new IllegalArgumentException("Invalid user ID");
        }
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
}
