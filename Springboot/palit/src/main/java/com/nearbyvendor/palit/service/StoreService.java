package com.nearbyvendor.palit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nearbyvendor.palit.entity.Store;
import com.nearbyvendor.palit.repository.StoreRepository;

@Service
public class StoreService {
    
    @Autowired
    private StoreRepository storeRepository;
    
    public List<Store> getAllStores() {
        return storeRepository.findAll();
    }
    
    public Store getStoreById(int id) {
        return storeRepository.findById(id).orElse(null);
    }
    
    public Store createStore(Store store) {
        return storeRepository.save(store);
    }
    
    public Store saveStore(int id, Store store) {
        if (storeRepository.findById(id) != null) {
            return storeRepository.save(store);
        } else {
            // Handle the case when the store ID is null or does not exist
            // You can throw an exception or handle it in a different way based on your requirements
            throw new IllegalArgumentException("Invalid store ID");
        }
    }
    
}
