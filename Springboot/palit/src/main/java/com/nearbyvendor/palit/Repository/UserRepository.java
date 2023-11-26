package com.nearbyvendor.palit.repository;

import com.nearbyvendor.palit.entity.AccountEntity;
import com.nearbyvendor.palit.entity.LocationEntity;
import com.nearbyvendor.palit.entity.StoreEntity;
import com.nearbyvendor.palit.entity.UserEntity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

  List<UserEntity> findByIsDeletedFalse();

  UserEntity findByUserIdAndIsDeletedFalse(int userId);
    
  AccountEntity findByAccountAccountIdAndIsDeletedFalse(int accountId);

  LocationEntity  findByLocationLocationIdAndIsDeletedFalse(int locationId);

  StoreEntity findByStoreStoreIdAndIsDeletedFalse(int storeId);
}
