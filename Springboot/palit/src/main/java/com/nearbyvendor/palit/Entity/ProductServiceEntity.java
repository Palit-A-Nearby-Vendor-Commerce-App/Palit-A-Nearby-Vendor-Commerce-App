package com.nearbyvendor.palit.entity;

import javax.persistence.*;

@Entity
@Table(name = "tblProduct_service")
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

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
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
