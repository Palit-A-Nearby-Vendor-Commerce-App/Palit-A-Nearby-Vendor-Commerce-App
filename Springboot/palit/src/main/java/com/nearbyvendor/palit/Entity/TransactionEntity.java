package com.nearbyvendor.palit.entity;

import javax.persistence.*;

@Entity
@Table(name = "transaction")
public class TransactionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int transactionId;

    private int accountCustomerId;

    private int accountVendorId;

    private String status;

    private int rating;
    
    private boolean isDeleted;

    public TransactionEntity() {
    }

    public TransactionEntity(int accountCustomerId, int accountVendorId, String status, int rating) {
        this.accountCustomerId = accountCustomerId;
        this.accountVendorId = accountVendorId;
        this.status = status;
        this.rating = rating;
    }

    public int getId() {
        return transactionId;
    }

    public void setId(int transactionId) {
        this.transactionId = transactionId;
    }

    public int getAccountCustomerId() {
        return accountCustomerId;
    }

    public void setAccountCustomerId(int accountCustomerId) {
        this.accountCustomerId = accountCustomerId;
    }

    public int getAccountVendorId() {
        return accountVendorId;
    }

    public void setAccountVendorId(int accountVendorId) {
        this.accountVendorId = accountVendorId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }
}
