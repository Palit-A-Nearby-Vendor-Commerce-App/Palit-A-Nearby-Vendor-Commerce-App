package com.nearbyvendor.palit.controller;

import com.nearbyvendor.palit.entity.StoreEntity;
import com.nearbyvendor.palit.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class StoreController {

    @Autowired
    private StoreService storeService;

    @GetMapping("/getAllStores")
    public ResponseEntity<List<StoreEntity>> getAllStores() {
        List<StoreEntity> stores = storeService.getAllStores();
        return new ResponseEntity<>(stores, HttpStatus.OK);
    }

    @GetMapping("/getStoreById/{id}")
    public ResponseEntity<StoreEntity> getStoreById(@PathVariable("id") int id) {
        StoreEntity store = storeService.getStoreById(id);
        if (store != null) {
            return new ResponseEntity<>(store, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/createStore")
    public ResponseEntity<StoreEntity> createStore(@RequestBody StoreEntity store) {
        StoreEntity newStore = storeService.createStore(store);
        return new ResponseEntity<>(newStore, HttpStatus.CREATED);
    }

    @PutMapping("/updateStoreById/{id}")
    public ResponseEntity<StoreEntity> updateStore(@PathVariable("id") int id, @RequestBody StoreEntity store) {
        StoreEntity updatedStore = storeService.updateStoreById(id, store);
        if (updatedStore != null) {
            return new ResponseEntity<>(updatedStore, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
