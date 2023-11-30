package com.nearbyvendor.palit.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "account")
public class AccountEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer accountId;

    private String email;

    private String password;

    private boolean isVendor;

    private boolean isAdmin;

    private boolean isDeleted;

    @JsonIgnore
    @OneToOne(mappedBy = "account")//, cascade = CascadeType.ALL)
    private UserEntity user;

    @OneToOne
    @JoinColumn(name = "locationId", referencedColumnName = "locationId")
    private LocationEntity location;

    @OneToOne
    @JoinColumn(name = "storeId", referencedColumnName = "storeId")
    private StoreEntity store;
    
    @JsonIgnore
    @OneToMany(mappedBy = "customer")//, cascade = CascadeType.REMOVE)
    private Set<TransactionEntity> customerTransactions;

    @JsonIgnore
    @OneToMany(mappedBy = "account")//, cascade = CascadeType.REMOVE)
    private Set<ChatEntity> chat;

    @JsonIgnore
    @OneToMany(mappedBy = "customer")//, cascade = CascadeType.REMOVE)
    private Set<ConversationEntity> conversations;

    @JsonIgnore
    @OneToMany(mappedBy = "vendor")//, cascade = CascadeType.REMOVE)
    private Set<TransactionEntity> vendorTransactions;

    @JsonIgnore
    @OneToMany(mappedBy = "account")//, cascade = CascadeType.REMOVE)
    private List<ReportEntity> report;

    public AccountEntity() {
    }

    public AccountEntity(int accountId, String email, String password, LocationEntity location, StoreEntity store,
                         boolean isVendor, boolean isAdmin) {
        this.accountId = accountId;
        this.email = email;
        this.password = password;
        this.location = location;
        this.store = store;
        this.isVendor = isVendor;
        this.isAdmin = isAdmin;
        this.isDeleted = false;
    }

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public LocationEntity getLocation() {
        return location;
    }

    public void setLocation(LocationEntity location) {
        this.location = location;
    }

    public StoreEntity getStore() {
        return store;
    }

    public void setStore(StoreEntity store) {
        this.store = store;
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
