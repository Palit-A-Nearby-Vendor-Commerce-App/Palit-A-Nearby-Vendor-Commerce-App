package com.nearbyvendor.palit.controller;

import com.nearbyvendor.palit.entity.ProductServiceEntity;
import com.nearbyvendor.palit.service.ProductServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ProductServiceController {

    @Autowired
    private ProductServiceService productServiceService;

    // Get all product services
    @GetMapping("/getAllProductServices")
    public List<ProductServiceEntity> getAllProductServices() {
        return productServiceService.getAllProductServices();
    }

    // Get product service by id
    @GetMapping("/getProductServiceById/{id}")
    public ProductServiceEntity getProductServiceById(@PathVariable int id) {
        return productServiceService.getProductServiceById(id);
    }

    // Get product services by store id
    @GetMapping("/getProductServicesByStoreId/store/{storeId}")
    public List<ProductServiceEntity> getProductServicesByStoreId(@PathVariable int storeId) {
        return productServiceService.getProductServicesByStoreId(storeId);
    }

    // Create product service
    @PostMapping("/createProductService")
    public ProductServiceEntity createProductService(@RequestBody ProductServiceEntity productService) {
        return productServiceService.createProductService(productService);
    }

    // Update product service
    @PutMapping("/updateProductServiceById/{id}")
    public ProductServiceEntity updateProductService(@PathVariable int id, @RequestBody ProductServiceEntity productService) {
        return productServiceService.updateProductServiceById(id, productService);
    }

    // Delete product service
    @DeleteMapping("/deleteProductServiceById/{id}")
    public void deleteProductServiceById(@PathVariable int id) {
        productServiceService.deleteProductServiceById(id);
    }
}
