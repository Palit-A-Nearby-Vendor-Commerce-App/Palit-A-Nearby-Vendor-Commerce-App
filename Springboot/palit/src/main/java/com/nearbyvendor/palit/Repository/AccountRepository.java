package com.nearbyvendor.palit.repository;

import com.nearbyvendor.palit.entity.AccountEntity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, Integer> {

  AccountEntity findByAccountIdAndIsDeletedFalse(int accountId);

  List<AccountEntity> findByIsDeletedFalse();
  
}
