package com.nearbyvendor.palit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nearbyvendor.palit.entity.StoreEntity;

@Repository
public interface StoreRepository extends JpaRepository<StoreEntity, Integer> {

  StoreEntity findByStoreIdAndIsDeletedFalse(int storeId);

  List<StoreEntity> findAllByIsDeletedFalse();

}
