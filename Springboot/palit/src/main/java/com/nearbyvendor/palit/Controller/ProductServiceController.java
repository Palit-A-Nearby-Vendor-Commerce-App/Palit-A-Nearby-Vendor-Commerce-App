package com.nearbyvendor.palit.controller;

import com.nearbyvendor.palit.entity.ProductServiceEntity;
import com.nearbyvendor.palit.service.ProductServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductServiceController {

    @Autowired
    private ProductServiceService productServiceService;

    // Get all product services
    @GetMapping("/getAllProductServices")
    public ResponseEntity<List<ProductServiceEntity>> getAllProductServices() {
        List<ProductServiceEntity> productServices = productServiceService.getAllProductServices();
        return new ResponseEntity<>(productServices, HttpStatus.OK);
    }

    // Get product service by id
    @GetMapping("/getProductServiceById/{id}")
    public ResponseEntity<ProductServiceEntity> getProductServiceById(@PathVariable int id) {
        ProductServiceEntity productService = productServiceService.getProductServiceById(id);
        if (productService != null) {
            return new ResponseEntity<>(productService, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Get product services by store id
    @GetMapping("/getProductServicesByStoreId/store/{storeId}")
    public ResponseEntity<List<ProductServiceEntity>> getProductServicesByStoreId(@PathVariable int storeId) {
        List<ProductServiceEntity> productServices = productServiceService.getProductServicesByStoreId(storeId);
        return new ResponseEntity<>(productServices, HttpStatus.OK);
    }

    // Create product service
    @PostMapping("/createProductService")
    public ResponseEntity<ProductServiceEntity> createProductService(@RequestBody ProductServiceEntity productService) {
        ProductServiceEntity newProductService = productServiceService.createProductService(productService);
        return new ResponseEntity<>(newProductService, HttpStatus.CREATED);
    }

    // Update product service
    @PutMapping("/updateProductServiceById/{id}")
    public ResponseEntity<ProductServiceEntity> updateProductService(@PathVariable int id, @RequestBody ProductServiceEntity productService) {
        ProductServiceEntity updatedProductService = productServiceService.updateProductServiceById(id, productService);
        if (updatedProductService != null) {
            return new ResponseEntity<>(updatedProductService, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete product service
    @DeleteMapping("/deleteProductServiceById/{id}")
    public ResponseEntity<Void> deleteProductServiceById(@PathVariable int id) {
        boolean deleted = productServiceService.deleteProductServiceById(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
