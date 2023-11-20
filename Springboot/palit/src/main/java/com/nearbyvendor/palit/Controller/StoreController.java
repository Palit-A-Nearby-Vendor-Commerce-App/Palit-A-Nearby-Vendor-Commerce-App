package com.nearbyvendor.palit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nearbyvendor.palit.entity.Store;
import com.nearbyvendor.palit.service.StoreService;

@RestController
public class StoreController {
    
    @Autowired
    private StoreService storeService;
    
    @GetMapping("/stores")
    public ResponseEntity<List<Store>> getAllStores() {
        List<Store> stores = storeService.getAllStores();
        return new ResponseEntity<>(stores, HttpStatus.OK);
    }
    
    @GetMapping("/stores/{id}")
    public ResponseEntity<Store> getStoreById(@PathVariable("id") int id) {
        Store store = storeService.getStoreById(id);
        return new ResponseEntity<>(store, HttpStatus.OK);
    }
    
    @PostMapping("/stores")
    public ResponseEntity<Store> createStore(@RequestBody Store store) {
        Store newStore = storeService.createStore(store);
        return new ResponseEntity<>(newStore, HttpStatus.CREATED);
    }
    
    @PutMapping("/stores/{id}")
    public ResponseEntity<Store> updateStore(@PathVariable("id") int id, @RequestBody Store store) {
        Store updatedStore = storeService.saveStore(id, store);
        return new ResponseEntity<>(updatedStore, HttpStatus.OK);
    }
    
}
