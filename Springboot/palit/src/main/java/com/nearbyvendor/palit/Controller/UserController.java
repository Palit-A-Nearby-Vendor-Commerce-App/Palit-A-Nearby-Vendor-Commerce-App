package com.nearbyvendor.palit.controller;

import com.nearbyvendor.palit.entity.AccountEntity;
import com.nearbyvendor.palit.entity.LocationEntity;
import com.nearbyvendor.palit.entity.UserEntity;
import com.nearbyvendor.palit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
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

    @PostMapping(value = "/createUser", consumes = {"multipart/form-data"})
    public ResponseEntity<UserEntity> createUser(@RequestParam("image") MultipartFile image,
                                                 @RequestParam("firstName") String firstName,
                                                 @RequestParam("lastName") String lastName,
                                                 @RequestParam("birthDate") String birthDate,
                                                 @RequestParam("email") String email,
                                                 @RequestParam("password") String password)
                                                 @RequestParam("account") AccountEntity account,
                                                 @RequestParam("location") LocationEntity location,
                                                 @RequestParam("store") LocationEntity store) {
        try {
            UserEntity newUser = userService.createUser(image, firstName, lastName, birthDate, email, password, account, location, store);
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        } catch (IOException | ParseException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(value = "/updateUserById/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<UserEntity> updateUser(@PathVariable("id") int id,
                                                 @RequestParam("image") MultipartFile image,
                                                 @RequestParam("firstName") String firstName,
                                                 @RequestParam("lastName") String lastName,
                                                 @RequestParam("birthDate") String birthDate,
                                                 @RequestParam("email") String email,
                                                 @RequestParam("password") String password),
                                                 @RequestParam("account") AccountEntity account,
                                                 @RequestParam("location") LocationEntity location,
                                                 @RequestParam("store") LocationEntity store) {
        try {
            UserEntity updatedUser = userService.updateUserById(id, image, firstName, lastName, birthDate, email, password, account, location, store);
            if (updatedUser != null) {
                return new ResponseEntity<>(updatedUser, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (IOException | ParseException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/deleteUserById/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable int id) {
        userService.deleteUserById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/isEmailTaken")
    public ResponseEntity<Boolean> checkEmail(@RequestBody UserEntity userData) {
        boolean isEmailTaken = userService.checkEmail(userData);
        return new ResponseEntity<>(isEmailTaken, HttpStatus.OK);
    }

    // define the controller API function that returns the service function
    @GetMapping("/getAccountByUserId/{userId}")
    public ResponseEntity<AccountEntity> getAccountByAccountId(@PathVariable int accountId) {
        AccountEntity account = userService.getAccountByAccountId(accountId);
        if (account != null) {
            return ResponseEntity.ok(account);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // define the controller API function that returns the service function for location
    @GetMapping("/getLocationByUserId/{userId}")
    public ResponseEntity<LocationEntity> getLocationByLocationId(@PathVariable int locationId) {
        LocationEntity location = userService.getLocationByLocationId(locationId);
        if (location != null) {
            return ResponseEntity.ok(location);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // define the controller API function that returns the service function for store
    @GetMapping("/getStoreByStoreId/{storeId}")
    public ResponseEntity<LocationEntity> getStoreByStoreId(@PathVariable int storeId) {
        LocationEntity store = userService.getLocationByLocationId(storeId);
        if (store != null) {
            return ResponseEntity.ok(store);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
