package com.nearbyvendor.palit.controller;

import com.nearbyvendor.palit.entity.UserEntity;
import com.nearbyvendor.palit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.text.ParseException;
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

    // Create a POST mapping for /users to create a new user
    @PostMapping("/createUser")
    public UserEntity createUser(@RequestParam("image") MultipartFile image,
                                 @RequestParam("name") String name,
                                 @RequestParam("birthDate") String birthDate,
                                 @RequestParam("email") String email,
                                 @RequestParam("password") String password) throws IOException, ParseException {
        // Call the createUser method from the service class and return the result
        return userService.createUser(image, name, birthDate, email, password);
    }

    // Create a PUT mapping for /users/{id} to update an existing user
    @PutMapping("/updateUserById/{id}")
    public UserEntity updateUser(@PathVariable("id") int id,
                                 @RequestParam("image") MultipartFile image,
                                 @RequestParam("name") String name,
                                 @RequestParam("birthDate") String birthDate,
                                 @RequestParam("email") String email,
                                 @RequestParam("password") String password) throws IOException, ParseException {
        // Call the updateUser method from the service class and return the result
        return userService.updateUserById(id, image, name, birthDate, email, password);
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
