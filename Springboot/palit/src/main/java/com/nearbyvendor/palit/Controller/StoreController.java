package com.nearbyvendor.palit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nearbyvendor.palit.entity.StoreEntity;
import com.nearbyvendor.palit.service.StoreService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class StoreController {
    
    @Autowired
    private StoreService storeService;
    
    @GetMapping("/getAllStores/stores")
    public List<StoreEntity> getAllStores() {
        return storeService.getAllStores();
    }
    
    @GetMapping("/getStoreById/stores/{id}")
    public StoreEntity getStoreById(@PathVariable("id") int id) {
        return storeService.getStoreById(id);
    }
    
    @PostMapping("/createStore/stores")
    public StoreEntity createStore(@RequestBody StoreEntity store) {
        return storeService.createStore(store);
    }
    
    @PutMapping("/updateStoreById/stores/{id}")
    public StoreEntity updateStore(@PathVariable("id") int id, @RequestBody StoreEntity store) {
        return storeService.updateStoreById(id, store);
    }

}
