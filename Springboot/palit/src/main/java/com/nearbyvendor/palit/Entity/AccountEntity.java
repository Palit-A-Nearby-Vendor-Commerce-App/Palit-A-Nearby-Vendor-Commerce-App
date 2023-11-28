package com.nearbyvendor.palit.entity;

import javax.persistence.*;

@Entity
@Table(name = "account")
public class AccountEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer accountId;

    private boolean isVendor;

    private boolean isAdmin;

    private boolean isDeleted;

    @OneToOne(mappedBy = "account")
    private UserEntity user;

    // constructors
    public AccountEntity() {
        super();
    }

    public AccountEntity(int accountId, boolean isVendor, boolean isAdmin, boolean isDeleted) {
        super();
        this.accountId = accountId;
        this.email = email;
        this.password = password;
        this.location = location;
        this.store = store;
        this.isVendor = isVendor;
        this.isAdmin = isAdmin;
        this.isDeleted = isDeleted;
    }


    // getters and setters
    public int getId() {
        return accountId;
    }

    public void setId(int accountId) {
        this.accountId = accountId;
    }

    public boolean getIsVendor() {
        return isVendor;
    }

    public void setIsVendor(boolean isVendor) {
        this.isVendor = isVendor;
    }

    public boolean getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }
}
