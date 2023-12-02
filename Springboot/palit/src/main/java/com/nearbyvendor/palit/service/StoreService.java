package com.nearbyvendor.palit.service;

import com.nearbyvendor.palit.entity.StoreEntity;
import com.nearbyvendor.palit.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
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
            existingStore.setStoreName(store.getStoreName());
            existingStore.setDescription(store.getDescription());
            existingStore.setCategory(store.getCategory());
            existingStore.setAccount(store.getAccount());
            return storeRepository.save(existingStore);
        } else {
            System.err.println("Invalid store ID for updating: " + storeId);
            throw new IllegalArgumentException("Invalid store ID");
        }
    }

    public boolean deleteStoreById(int storeId) {
        StoreEntity existingStore = storeRepository.findByStoreIdAndIsDeletedFalse(storeId);
        if (existingStore != null) {
            existingStore.setIsDeleted(true);
            storeRepository.save(existingStore);
            return true;
        } else {
            System.err.println("Invalid store ID for deletion: " + storeId);
            throw new IllegalArgumentException("Invalid store ID");
        }
    }
}
