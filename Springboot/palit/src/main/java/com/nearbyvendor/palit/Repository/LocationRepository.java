package com.nearbyvendor.palit.repository;

import com.nearbyvendor.palit.entity.LocationEntity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<LocationEntity, Integer> {

  List<LocationEntity> findByIsDeletedFalse();

  LocationEntity findByLocationIdAndIsDeletedFalse(int id);
}
