package com.nearbyvendor.palit.repository;

import com.nearbyvendor.palit.entity.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, Integer> {

    AccountEntity findByAccountIdAndIsDeletedFalse(int accountId);

    List<AccountEntity> findByIsDeletedFalse();
    
    List<AccountEntity> findByIsAdminAndIsDeletedFalse(boolean isAdmin);

}
