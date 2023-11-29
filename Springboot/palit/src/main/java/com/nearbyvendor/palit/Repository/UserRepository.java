package com.nearbyvendor.palit.repository;

import com.nearbyvendor.palit.entity.UserEntity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

  List<UserEntity> findByIsDeletedFalse();

  UserEntity findByUserIdAndIsDeletedFalse(int userId);

}
