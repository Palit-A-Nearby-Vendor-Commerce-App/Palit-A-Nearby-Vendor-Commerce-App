package com.nearbyvendor.palit.repository;

import com.nearbyvendor.palit.entity.LocationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<LocationEntity, Integer> {

    List<LocationEntity> findByIsDeletedFalse();

    LocationEntity findByLocationIdAndIsDeletedFalse(int locationId);
}
