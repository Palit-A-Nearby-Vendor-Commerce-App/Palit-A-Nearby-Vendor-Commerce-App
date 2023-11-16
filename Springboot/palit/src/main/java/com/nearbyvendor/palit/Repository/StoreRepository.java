package com.nearbyvendor.palit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nearbyvendor.palit.entity.Store;

@Repository
public interface StoreRepository extends JpaRepository<Store, Integer> {

}
