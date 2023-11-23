package com.nearbyvendor.palit.controller;

import com.nearbyvendor.palit.entity.UserEntity;
import com.nearbyvendor.palit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @PostMapping("/createUserWOutImage")
    public UserEntity createUserWOutImage(@RequestBody UserEntity user) throws IOException {
        return userService.createUserWOutImage(user);
    }

    @PutMapping("/updateUserByIdWOutImage/{id}")
    public UserEntity updateUserByIdWOutImage(@PathVariable int id, @RequestBody UserEntity user) throws IOException {
        return updateUserByIdWOutImage(id, user);
    }

    @PutMapping("/updateUserImage/{id}")
    public UserEntity updateUserImage(@PathVariable int id, @RequestParam("image") MultipartFile image) throws IOException {
        return userService.updateUserImage(id, image);
    }

    @DeleteMapping("/deleteUserById/{id}")
    public void deleteUserById(@PathVariable int id) {
        userService.deleteUserById(id);
    }

    @PostMapping("/isEmailTaken")
    public boolean checkEmail(@RequestBody UserEntity userData) {
        return userService.checkEmail(userData);
    }
}
