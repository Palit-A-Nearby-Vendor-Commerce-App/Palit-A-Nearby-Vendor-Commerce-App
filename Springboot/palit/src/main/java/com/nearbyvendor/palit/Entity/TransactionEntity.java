package com.nearbyvendor.palit.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "transactionId")
@Entity
@Table(name = "transaction")
public class TransactionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int transactionId;

    private String status;

    private boolean isDeleted;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "accountCustomerId", referencedColumnName = "accountId")
    private AccountEntity customer;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "accountVendorId", referencedColumnName = "accountId")
    private AccountEntity vendor;

    public TransactionEntity() {
    }

    public TransactionEntity(AccountEntity customer, AccountEntity vendor, String status) {
        this.customer = customer;
        this.vendor = vendor;
        this.status = status;
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
}