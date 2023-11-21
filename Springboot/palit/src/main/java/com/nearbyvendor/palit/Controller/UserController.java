package com.nearbyvendor.palit.controller;

import com.nearbyvendor.palit.entity.UserEntity;
import com.nearbyvendor.palit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/getAllUsers")
    public List<UserEntity> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/getUserById/{id}")
    public UserEntity getUserById(@PathVariable int id) {
        return userService.getUserById(id);
    }

    @PostMapping("/createUser")
    public UserEntity createUser(@RequestBody UserEntity user) {
        return userService.createUser(user);
    }

    @PutMapping("/updateUserById/{id}")
    public UserEntity updateUserById(@PathVariable int id, @RequestBody UserEntity user) {
        return userService.updateUserById(id, user);
    }

    @DeleteMapping("/deleteUserById/{id}")
    public void deleteUserById(@PathVariable int id) {
        userService.deleteUserById(id);
    }
}
