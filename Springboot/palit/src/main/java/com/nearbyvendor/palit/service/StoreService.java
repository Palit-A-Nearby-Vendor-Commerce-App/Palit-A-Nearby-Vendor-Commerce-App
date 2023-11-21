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
        return storeRepository.findByStoreIdAndIsDeletedFalse(storeId);
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
            // Handle the case when the store ID is null or does not exist
            // You can throw an exception or handle it in a different way based on your requirements
            throw new IllegalArgumentException("Invalid store ID");
        }
    }

    public void deleteStoreById(int storeId) {
        StoreEntity existingStore = storeRepository.findByStoreIdAndIsDeletedFalse(storeId);
        if (existingStore != null) {
            existingStore.setIsDeleted(true);
            storeRepository.save(existingStore);
        } else {
            // Handle the case when the store ID is null or does not exist
            // You can throw an exception or handle it in a different way based on your requirements
            throw new IllegalArgumentException("Invalid store ID");
        }
    }
}
