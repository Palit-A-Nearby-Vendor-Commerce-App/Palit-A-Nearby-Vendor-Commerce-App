package com.nearbyvendor.palit.controller;

import com.nearbyvendor.palit.entity.ProductService;
import com.nearbyvendor.palit.service.ProductServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product-service")
public class ProductServiceController {

    @Autowired
    private ProductServiceService productServiceService;

    // Get all product services
    @GetMapping
    public ResponseEntity<List<ProductService>> getAllProductServices() {
        List<ProductService> productServices = productServiceService.getAllProductServices();
        return new ResponseEntity<>(productServices, HttpStatus.OK);
    }

    // Get product service by id
    @GetMapping("/{id}")
    public ResponseEntity<ProductService> getProductServiceById(@PathVariable int id) {
        ProductService productService = productServiceService.getProductServiceById(id);
        return new ResponseEntity<>(productService, HttpStatus.OK);
    }

    // Get product services by store id
    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<ProductService>> getProductServicesByStoreId(@PathVariable int storeId) {
        List<ProductService> productServices = productServiceService.getProductServicesByStoreId(storeId);
        return new ResponseEntity<>(productServices, HttpStatus.OK);
    }

    // Create product service
    @PostMapping
    public ResponseEntity<ProductService> createProductService(@RequestBody ProductService productService) {
        ProductService newProductService = productServiceService.createProductService(productService);
        return new ResponseEntity<>(newProductService, HttpStatus.CREATED);
    }

    // Update product service
    @PutMapping("/{id}")
    public ResponseEntity<ProductService> updateProductService(@PathVariable int id, @RequestBody ProductService productService) {
        ProductService updatedProductService = productServiceService.updateProductService(id, productService);
        return new ResponseEntity<>(updatedProductService, HttpStatus.OK);
    }

    // Delete product service
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductService(@PathVariable int id) {
        productServiceService.deleteProductService(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
