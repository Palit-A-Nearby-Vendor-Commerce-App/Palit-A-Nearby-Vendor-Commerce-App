package com.nearbyvendor.palit.entity;

import java.util.Set;

import javax.persistence.*;

@Entity
@Table(name = "transaction")
public class TransactionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int transactionId;

//    private int accountCustomerId;
//
//    private int accountVendorId; //delete sa daw hehe

    private String status;

    private int rating;
    
    private boolean isDeleted;
    
    @ManyToMany(cascade= { CascadeType.ALL })
    @JoinTable(
    		name = "Transactions",
    		joinColumns = { @JoinColumn(name = "transactionId")},
    		inverseJoinColumns = { @JoinColumn(name = "accountId") }
    )
    
    private Set<AccountEntity> accounts;

    public TransactionEntity() {
    }

<<<<<<< HEAD
    public TransactionEntity(int accountCustomerId, int accountVendorId, String status, int rating) {
        this.accountCustomerId = accountCustomerId;
        this.accountVendorId = accountVendorId;
=======
    public TransactionEntity(AccountEntity customer, AccountEntity vendor, String status) {
        this.customer = customer;
        this.vendor = vendor;
>>>>>>> 7365c53e4aac9eba308c008506d3760d1d39ac72
        this.status = status;
        this.rating = rating;
    }

    public int getId() {
        return transactionId;
    }

    public void setId(int transactionId) {
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
