package com.nearbyvendor.palit.repository;

import com.nearbyvendor.palit.entity.ProductServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductServiceRepository extends JpaRepository<ProductServiceEntity, Integer> {

    List<ProductServiceEntity> findByStoreStoreId(int storeId);

    Optional<ProductServiceEntity> findByProductIdAndIsDeletedFalse(int productId);

    List<ProductServiceEntity> findByStore_StoreIdAndIsDeletedFalse(int storeId);

    List<ProductServiceEntity> findByIsDeletedFalse();
}
