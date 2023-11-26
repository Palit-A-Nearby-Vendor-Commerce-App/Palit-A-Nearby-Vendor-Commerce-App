package com.nearbyvendor.palit.entity;

import javax.persistence.*;

import java.util.Date;

@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    private String firstName;
    
    private String lastName;

    @Temporal(TemporalType.DATE)
    private Date birthDate;

    private String email;

    private String password;

    private boolean isDeleted;

    @Lob
    private byte[] image;

    @OneToOne
    @JoinColumn(name = "accountId", referencedColumnName = "accountId")
    private AccountEntity account;

    @OneToOne
    @JoinColumn(name = "locationId", referencedColumnName = "locationId")
    private LocationEntity location;

    @OneToOne
    @JoinColumn(name = "storeId", referencedColumnName = "storeId")
    private StoreEntity store;

    public UserEntity() {
        super();
        this.isDeleted = false;
    }

    public UserEntity(int userId, String firstName, String lastName, Date birthDate, String email, String password,
            byte[] image) {
        super();
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.email = email;
        this.password = password;
        this.isDeleted = false;
        this.image = image;
    }

    // getters and setters
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
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

    public AccountEntity getAccount() {
        return this.account;
    }
    
    public void setAccount(AccountEntity account) {
        this.account = account;
    }
    
    public LocationEntity getLocation() {
        return this.location;
    }
    
    public void setLocation(LocationEntity location) {
        this.location = location;
    }

    public StoreEntity getStore() {
        return this.store;
    }
    
    public void setStore(StoreEntity store) {
        this.store = store;
    }
}
