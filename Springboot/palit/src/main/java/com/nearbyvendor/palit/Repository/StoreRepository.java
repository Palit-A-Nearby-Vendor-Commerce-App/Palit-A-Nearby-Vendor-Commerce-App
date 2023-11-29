package com.nearbyvendor.palit.repository;

import com.nearbyvendor.palit.entity.StoreEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreRepository extends JpaRepository<StoreEntity, Integer> {

    StoreEntity findByStoreIdAndIsDeletedFalse(int storeId);

    List<StoreEntity> findAllByIsDeletedFalse();

}
