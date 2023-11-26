package com.nearbyvendor.palit.entity;

import javax.persistence.*;

@Entity
@Table(name = "store")
public class StoreEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int storeId;
    
    private String storeName;
    
    private String description;
    
    private String category;
    
    private int vendorAccountId;
    
    private int rating;
    
    private boolean isDeleted;
    
    public StoreEntity() {
        // default constructor
    }
    
    public StoreEntity(String storeName, String description, String category, int vendorAccountId) {
        this.storeName = storeName;
        this.description = description;
        this.category = category;
        this.vendorAccountId = vendorAccountId;
    }
    
    public int getId() {
        return storeId;
    }
    
    public void setId(int storeId) {
        this.storeId = storeId;
    }
    
    public String getStoreName() {
        return storeName;
    }
    
    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public int getVendorAccountId() {
        return vendorAccountId;
    }
    
    public void setVendorAccountId(int vendorAccountId) {
        this.vendorAccountId = vendorAccountId;
    }
    
    public int getRating() {
        return rating;
    }
    
    public void setRating(int rating) {
        this.rating = rating;
    }
    
    @Override
    public String toString() {
        return "StoreEntity [storeId=" + storeId + ", storeName=" + storeName + ", description=" + description
                + ", category=" + category + ", vendorAccountId=" + vendorAccountId + ", rating=" + rating + "]";
    }

    public boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }
}
