package com.nearbyvendor.palit.entity;

import javax.persistence.*;

@Entity
@Table(name = "tblTransaction")
public class TransactionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int transactionId;

    private String status;

    private boolean isDeleted;

    private String details; // Added string details

    @ManyToOne
    @JoinColumn(name = "accountCustomerId", referencedColumnName = "accountId")
    private AccountEntity customer;

    @ManyToOne
    @JoinColumn(name = "accountVendorId", referencedColumnName = "accountId")
    private AccountEntity vendor;

    public TransactionEntity() {
    }

    public TransactionEntity(AccountEntity customer, AccountEntity vendor, String status, String details) { // Updated constructor
        this.customer = customer;
        this.vendor = vendor;
        this.status = status;
        this.details = details;
        this.isDeleted = false;
    }

    public int getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(int transactionId) {
        this.transactionId = transactionId;
    }

    public AccountEntity getAccountCustomerId() {
        return customer;
    }

    public void setAccountCustomerId(AccountEntity customer) {
        this.customer = customer;
    }

    public AccountEntity getAccountVendorId() {
        return vendor;
    }

    public void setAccountVendorId(AccountEntity vendor) {
        this.vendor = vendor;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public AccountEntity getCustomer() {
        return customer;
    }

    public void setCustomer(AccountEntity customer) {
        this.customer = customer;
    }

    public AccountEntity getVendor() {
        return vendor;
    }

    public void setVendor(AccountEntity vendor) {
        this.vendor = vendor;
    }
}