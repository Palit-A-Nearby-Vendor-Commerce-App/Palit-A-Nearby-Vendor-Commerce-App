package com.nearbyvendor.palit.repository;

import com.nearbyvendor.palit.entity.ProductService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductServiceRepository extends JpaRepository<ProductService, Integer> {

    // Find product services by store id
    List<ProductService> findByStoreId(int storeId);
}
