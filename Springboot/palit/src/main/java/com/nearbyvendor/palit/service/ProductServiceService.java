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

    // Get all product services
    public List<ProductServiceEntity> getAllProductServices() {
        return productServiceRepository.findAll();
    }

    // Get product service by id
    public ProductServiceEntity getProductServiceById(int id) {
        Optional<ProductServiceEntity> productService = productServiceRepository.findById(id);
        if (productService.isPresent()) {
            return productService.get();
        } else {
            throw new RuntimeException("Product service not found with id: " + id);
        }
    }

    // Get product services by store id
    public List<ProductServiceEntity> getProductServicesByStoreId(int storeId) {
        return productServiceRepository.findByStoreId(storeId);
    }

    // Create product service
    public ProductServiceEntity createProductService(ProductServiceEntity productService) {
        return productServiceRepository.save(productService);
    }

    // Update product service
    public ProductServiceEntity updateProductServiceById(int id, ProductServiceEntity productService) {
        Optional<ProductServiceEntity> existingProductService = productServiceRepository.findById(id);
        if (existingProductService.isPresent()) {
            existingProductService.get().setName(productService.getName());
            existingProductService.get().setDescription(productService.getDescription());
            existingProductService.get().setPrice(productService.getPrice());
            existingProductService.get().setStoreId(productService.getStoreId());
            existingProductService.get().setImagePath(productService.getImagePath());
            return productServiceRepository.save(existingProductService.get());
        } else {
            throw new RuntimeException("Product service not found with id: " + id);
        }
    }

    // Delete product service
    public void deleteProductServiceById(int id) {
        Optional<ProductServiceEntity> existingProductService = productServiceRepository.findById(id);
        if (existingProductService.isPresent()) {
            productServiceRepository.delete(existingProductService.get());
        } else {
            throw new RuntimeException("Product service not found with id: " + id);
        }
    }
}
