package com.nearbyvendor.palit.entity;

import javax.persistence.*;

@Entity
@Table(name = "product_service")
public class ProductServiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;

    private String name;


    private double price;


    private String imagePath;
    
    private boolean isDeleted;
    
    @OneToOne
    @JoinColumn(name = "storeId", referencedColumnName = "storeId")
    private StoreEntity store;

    public ProductServiceEntity() {
    }

    public ProductServiceEntity(String name, double price, String imagePath, StoreEntity store) {
        this.name = name;
        this.price = price;
        this.store = store;
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
