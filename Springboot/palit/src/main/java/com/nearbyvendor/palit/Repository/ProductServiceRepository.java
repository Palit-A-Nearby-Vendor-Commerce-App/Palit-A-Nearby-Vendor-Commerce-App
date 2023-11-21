package com.nearbyvendor.palit.repository;

import com.nearbyvendor.palit.entity.ProductServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductServiceRepository extends JpaRepository<ProductServiceEntity, Integer> {

    // Find product services by store id
    List<ProductServiceEntity> findByStoreId(int storeId);
}
