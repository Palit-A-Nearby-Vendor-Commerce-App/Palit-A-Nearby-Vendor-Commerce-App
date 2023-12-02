package com.nearbyvendor.palit.service;

import com.nearbyvendor.palit.entity.ProductServiceEntity;
import com.nearbyvendor.palit.entity.StoreEntity;
import com.nearbyvendor.palit.repository.ProductServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import com.nearbyvendor.palit.repository.StoreRepository;

@Service
@Transactional
public class ProductServiceService {

    @Autowired
    private ProductServiceRepository productServiceRepository;
    @Autowired
    private StoreRepository storeRepository;

    public List<ProductServiceEntity> getAllProductServices() {
        return productServiceRepository.findByIsDeletedFalse();
    }

    public ProductServiceEntity getProductServiceById(int id) {
        Optional<ProductServiceEntity> productService = productServiceRepository.findByProductIdAndIsDeletedFalse(id);
        if (productService.isPresent()) {
            return productService.get();
        } else {

            System.err.println("Product service not found with id: " + id);
            throw new RuntimeException("Product service not found with id: " + id);
        }
    }

    public List<ProductServiceEntity> getProductServicesByStoreId(int storeId) {
        return productServiceRepository.findByStore_StoreIdAndIsDeletedFalse(storeId);
    }

    public ProductServiceEntity createProductService(ProductServiceEntity productService) {
        return productServiceRepository.save(productService);
    }

    public ProductServiceEntity updateProductServiceById(int id, ProductServiceEntity productService) {
        Optional<ProductServiceEntity> existingProductService = productServiceRepository
                .findByProductIdAndIsDeletedFalse(id);

        if (existingProductService.isPresent()) {
            existingProductService.get().setName(productService.getName());
            existingProductService.get().setPrice(productService.getPrice());
            existingProductService.get().setImage(productService.getImage());

            StoreEntity store = storeRepository.findById(productService.getStore().getStoreId()).orElse(null);
            if (store == null) {
                throw new RuntimeException("Store not found for ID: " + productService.getStore().getStoreId());
            }
            existingProductService.get().setStore(store);
            return productServiceRepository.save(existingProductService.get());
        } else {

            System.err.println("Product service not found with id: " + id);
            throw new RuntimeException("Product service not found with id: " + id);
        }
    }

    public boolean deleteProductServiceById(int id) {
        Optional<ProductServiceEntity> existingProductService = productServiceRepository
                .findByProductIdAndIsDeletedFalse(id);
        if (existingProductService.isPresent()) {
            existingProductService.get().setIsDeleted(true);
            productServiceRepository.save(existingProductService.get());
            return true;
        } else {

            System.err.println("Product service not found with id: " + id);
            throw new RuntimeException("Product service not found with id: " + id);
        }
    }
}
