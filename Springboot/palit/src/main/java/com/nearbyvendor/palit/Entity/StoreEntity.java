package com.nearbyvendor.palit.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "store")
public class StoreEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int storeId;
    
    private String storeName;
    
    private String description;
    
    private String category;
    
    private boolean isDeleted;
    
    @JsonManagedReference
    @OneToOne(mappedBy = "store")
    private AccountEntity account;
    
    @JsonManagedReference
    @OneToOne(mappedBy = "store")
    private ProductServiceEntity productService;
    
    public StoreEntity() {
        // default constructor
    }
    
    public StoreEntity(String storeName, String description, String category, AccountEntity account, ProductServiceEntity productService) {
        this.storeName = storeName;
        this.description = description;
        this.category = category;
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
    
    public boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }
    
    @Override
    public String toString() {
        return "StoreEntity [storeId=" + storeId + ", storeName=" + storeName + ", description=" + description
                + ", category=" + category + "]";
    }

}
