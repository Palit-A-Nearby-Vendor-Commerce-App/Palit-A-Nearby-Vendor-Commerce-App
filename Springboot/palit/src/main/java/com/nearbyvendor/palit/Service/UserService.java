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

    public UserEntity saveUser(UserEntity user) {
        return userRepository.save(user);
    }

    public void deleteUserById(int id) {
        userRepository.deleteById(id);
    }

    public int getNextUsertId() {
        UserEntity latestUser = userRepository.findTopByOrderByIdDesc();
        if (latestUser != null) {
            return latestUser.getId() + 1;
        } else {
            // Handle the case when there are no accounts in the repository
            // You can return 1 as the next ID or handle it in a different way based on your requirements
            return 0;
        }
    }
}
