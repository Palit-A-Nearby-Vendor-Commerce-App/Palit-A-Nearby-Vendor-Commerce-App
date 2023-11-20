package com.nearbyvendor.palit.service;

import com.nearbyvendor.palit.entity.ProductService;
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
    public List<ProductService> getAllProductServices() {
        return productServiceRepository.findAll();
    }

    // Get product service by id
    public ProductService getProductServiceById(int id) {
        Optional<ProductService> productService = productServiceRepository.findById(id);
        if (productService.isPresent()) {
            return productService.get();
        } else {
            throw new RuntimeException("Product service not found with id: " + id);
        }
    }

    // Get product services by store id
    public List<ProductService> getProductServicesByStoreId(int storeId) {
        return productServiceRepository.findByStoreId(storeId);
    }

    // Create product service
    public ProductService createProductService(ProductService productService) {
        return productServiceRepository.save(productService);
    }

    // Update product service
    public ProductService updateProductService(int id, ProductService productService) {
        Optional<ProductService> existingProductService = productServiceRepository.findById(id);
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
    public void deleteProductService(int id) {
        Optional<ProductService> existingProductService = productServiceRepository.findById(id);
        if (existingProductService.isPresent()) {
            productServiceRepository.delete(existingProductService.get());
        } else {
            throw new RuntimeException("Product service not found with id: " + id);
        }
    }
}
