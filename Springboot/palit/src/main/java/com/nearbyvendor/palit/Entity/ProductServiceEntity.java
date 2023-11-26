package com.nearbyvendor.palit.entity;

import javax.persistence.*;

@Entity
@Table(name = "product_service")
public class ProductServiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;

    private String name;

    private String description;

    private double price;

    private int storeId;

    private String imagePath;
    
    private boolean isDeleted;

    public ProductServiceEntity() {
    }

    public ProductServiceEntity(String name, String description, double price, int storeId, String imagePath) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.storeId = storeId;
        this.imagePath = imagePath;
    }

    public int getId() {
        return productId;
    }

    public void setId(int productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public int getStoreId() {
        return storeId;
    }

    public void setStoreId(int storeId) {
        this.storeId = storeId;
    }

    public boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }
}
