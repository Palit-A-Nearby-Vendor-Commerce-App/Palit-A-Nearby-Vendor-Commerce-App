package com.nearbyvendor.palit.entity;

import javax.persistence.*;

@Entity
public class TransactionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int transactionId;

    @Column(nullable = false)
    private int accountCustomerId;

    @Column(nullable = false)
    private int accountVendorId;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private int rating;

    public TransactionEntity() {
    }

    public TransactionEntity(int accountCustomerId, int accountVendorId, String status, int rating) {
        this.accountCustomerId = accountCustomerId;
        this.accountVendorId = accountVendorId;
        this.status = status;
        this.rating = rating;
    }

    public int getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(int transactionId) {
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
}
