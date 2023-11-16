package com.nearbyvendor.palit.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@Table(name = "transactions")
@IdClass(TransactionId.class)
public class Transaction {

    @Id
    private int accountCustomerId;
    @Id
    private int accountVendorId;
    private String status;
    private int rating;

    public Transaction() {
    }

    public Transaction(int accountCustomerId, int accountVendorId, String status, int rating) {
        this.accountCustomerId = accountCustomerId;
        this.accountVendorId = accountVendorId;
        this.status = status;
        this.rating = rating;
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
