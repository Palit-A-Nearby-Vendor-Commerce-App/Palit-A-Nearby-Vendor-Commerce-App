package com.nearbyvendor.palit.controller;

import com.nearbyvendor.palit.entity.UserEntity;
import com.nearbyvendor.palit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/getAllUsers")
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        List<UserEntity> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/getUserById/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable int id) {
        UserEntity user = userService.getUserById(id);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(value = "/createUser")
    public ResponseEntity<UserEntity> createUser(@RequestBody UserEntity newUserEntity) {
        UserEntity user = userService.createUser(newUserEntity);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PutMapping(value = "/updateUserById/{id}")
    public ResponseEntity<UserEntity> updateUser(@PathVariable("id") int id,
            @RequestBody UserEntity updatedUserEntity) {
        UserEntity user = userService.updateUserById(id, updatedUserEntity);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @DeleteMapping("/deleteUserById/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable int id) {
        userService.deleteUserById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
