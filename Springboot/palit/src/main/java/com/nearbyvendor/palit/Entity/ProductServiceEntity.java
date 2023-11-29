package com.nearbyvendor.palit.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "productId")
@Entity
@Table(name = "product_service")
public class ProductServiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;

    private String name;

    private double price;

    @Lob
    private byte[] image;

    private boolean isDeleted;

    @ManyToOne
    @JoinColumn(name = "storeId", referencedColumnName = "storeId")
    private StoreEntity store;

    public ProductServiceEntity() {
    }

    public ProductServiceEntity(String name, double price, byte[] image, StoreEntity store) {
        this.name = name;
        this.price = price;
        this.store = store;
        this.image = image;
        this.isDeleted = false;
    }

    public int getProductServiceId() {
        return productId;
    }

    public void setProductServiceId(int productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public StoreEntity getStore() {
        return store;
    }

    public void setStore(StoreEntity store) {
        this.store = store;
    }

}
