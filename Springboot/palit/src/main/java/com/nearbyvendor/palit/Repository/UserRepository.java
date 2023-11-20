package com.nearbyvendor.palit.repository;

import com.nearbyvendor.palit.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
  UserEntity findTopByOrderByIdDesc();
}
