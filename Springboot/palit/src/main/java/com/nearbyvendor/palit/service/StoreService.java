package com.nearbyvendor.palit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nearbyvendor.palit.entity.StoreEntity;
import com.nearbyvendor.palit.repository.StoreRepository;

@Service
public class StoreService {
    
    @Autowired
    private StoreRepository storeRepository;
    
    public List<StoreEntity> getAllStores() {
        return storeRepository.findAllByIsDeletedFalse();
    }
    
    public StoreEntity getStoreById(int storeId) {
        StoreEntity store = storeRepository.findByStoreIdAndIsDeletedFalse(storeId);
        if (store != null) {
            return store;
        } else {
            // Log an error message for debugging
            System.err.println("StoreEntity not found with id: " + storeId);
            throw new RuntimeException("StoreEntity not found with id: " + storeId);
        }
    }
    
    public StoreEntity createStore(StoreEntity store) {
        return storeRepository.save(store);
    }
    
    public StoreEntity updateStoreById(int storeId, StoreEntity store) {
        StoreEntity existingStore = storeRepository.findByStoreIdAndIsDeletedFalse(storeId);
        if (existingStore != null) {
            store.setId(storeId);
            return storeRepository.save(store);
        } else {
            // Log an error message for debugging
            System.err.println("Invalid store ID for updating: " + storeId);
            throw new IllegalArgumentException("Invalid store ID");
        }
    }

    public boolean deleteStoreById(int storeId) {
        StoreEntity existingStore = storeRepository.findByStoreIdAndIsDeletedFalse(storeId);
        if (existingStore != null) {
            existingStore.setIsDeleted(true);
            storeRepository.save(existingStore);
            return true; // Deletion was successful
        } else {
            // Log an error message for debugging
            System.err.println("Invalid store ID for deletion: " + storeId);
            throw new IllegalArgumentException("Invalid store ID");
        }
    }
}
