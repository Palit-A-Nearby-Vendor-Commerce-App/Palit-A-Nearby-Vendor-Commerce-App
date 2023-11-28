package com.nearbyvendor.palit.service;

import com.nearbyvendor.palit.entity.ProductServiceEntity;
import com.nearbyvendor.palit.repository.ProductServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceService {

    @Autowired
    private ProductServiceRepository productServiceRepository;

    // Get all product services where isDeleted is false
    public List<ProductServiceEntity> getAllProductServices() {
        return productServiceRepository.findByIsDeletedFalse();
    }

    // Get product service by id where isDeleted is false
    public ProductServiceEntity getProductServiceById(int id) {
        Optional<ProductServiceEntity> productService = productServiceRepository.findByProductIdAndIsDeletedFalse(id);
        if (productService.isPresent()) {
            return productService.get();
        } else {
            // Log an error message for debugging
            System.err.println("Product service not found with id: " + id);
            throw new RuntimeException("Product service not found with id: " + id);
        }
    }

    // Get product services by store id where isDeleted is false
    public List<ProductServiceEntity> getProductServicesByStoreId(int storeId) {
        return productServiceRepository.findByStore_StoreIdAndIsDeletedFalse(storeId);
    }

    // Create product service
    public ProductServiceEntity createProductService(ProductServiceEntity productService) {
        return productServiceRepository.save(productService);
    }

    // Update product service
    public ProductServiceEntity updateProductServiceById(int id, ProductServiceEntity productService) {
        Optional<ProductServiceEntity> existingProductService = productServiceRepository.findByProductIdAndIsDeletedFalse(id);
        if (existingProductService.isPresent()) {
            existingProductService.get().setName(productService.getName());
            existingProductService.get().setPrice(productService.getPrice());
            existingProductService.get().setStore(productService.getStore());
            existingProductService.get().setImage(productService.getImage());
            return productServiceRepository.save(existingProductService.get());
        } else {
            // Log an error message for debugging
            System.err.println("Product service not found with id: " + id);
            throw new RuntimeException("Product service not found with id: " + id);
        }
    }

    // Delete product service by setting isDeleted to true
    public boolean deleteProductServiceById(int id) {
        Optional<ProductServiceEntity> existingProductService = productServiceRepository.findByProductIdAndIsDeletedFalse(id);
        if (existingProductService.isPresent()) {
            existingProductService.get().setIsDeleted(true);
            productServiceRepository.save(existingProductService.get());
            return true; // Deletion was successful
        } else {
            // Log an error message for debugging
            System.err.println("Product service not found with id: " + id);
            throw new RuntimeException("Product service not found with id: " + id);
        }
    }
}
