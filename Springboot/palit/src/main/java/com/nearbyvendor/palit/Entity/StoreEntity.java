package com.nearbyvendor.palit.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "tblStore")
public class StoreEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int storeId;

    private String storeName;

    private String description;

    private String category;

    private boolean isDeleted;

    @JsonIgnore
    @OneToOne(mappedBy = "store")
    private AccountEntity account;

    @JsonIgnore
    @OneToMany(mappedBy = "store")
    private List<ProductServiceEntity> productServices;

    public StoreEntity() {

    }

    public StoreEntity(String storeName, String description, String category, AccountEntity account) {
        this.storeName = storeName;
        this.description = description;
        this.category = category;
        this.account = account;
        this.isDeleted = false;
    }

    public int getStoreId() {
        return storeId;
    }

    public void setStoreId(int storeId) {
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

    public AccountEntity getAccount() {
        return account;
    }

    public void setAccount(AccountEntity account) {
        this.account = account;
    }

    public List<ProductServiceEntity> getProductServices() {
        return productServices;
    }

    public void setProductServices(List<ProductServiceEntity> productServices) {
        this.productServices = productServices;
    }
}
